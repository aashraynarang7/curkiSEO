"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import type { gsap as Gsap, ScrollTrigger as ScrollTriggerType } from "@/lib/gsap";

/**
 * Every GSAP animation on the site, in one place.
 *
 * Rules this file keeps to:
 * - GSAP is imported dynamically, so its ~44KB and its evaluation cost stay off the critical
 *   path. It was measurably the largest single contributor to mobile bootup when static.
 * - Everything lives inside `gsap.matchMedia()` under `(prefers-reduced-motion: no-preference)`,
 *   so a reduced-motion visitor gets the finished layout with no tweens and no hidden states.
 * - Transform and opacity only.
 * - Nothing is animated on an element that carries `backdrop-filter`. Glass surfaces are used as
 *   hover *targets*, but the thing that actually moves is always a plain child.
 * - `mm.revert()` on cleanup kills every trigger and undoes every inline style, so a client-side
 *   route change leaves nothing behind.
 * - `ScrollTrigger.refresh()` runs once images have loaded, because art that decodes late changes
 *   the height of the page and therefore every trigger position.
 *
 * Because loading is deferred, reveal targets are pre-hidden in CSS by the `data-gsap-armed`
 * attribute that the inline script in `app/layout.tsx` sets. That attribute is only ever set when
 * JS runs AND the visitor has not asked for reduced motion, so content is never stuck invisible.
 * `disarm()` clears it as soon as GSAP owns the inline styles — and on any failure path too.
 *
 * Elements opt in by data attribute, so server components stay server components.
 */
export function GsapStage() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const disarm = () => document.documentElement.removeAttribute("data-gsap-armed");
    // If the chunk never arrives, don't leave revealed content hidden.
    const failsafe = window.setTimeout(disarm, 3000);

    import("@/lib/gsap")
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return;
        cleanup = run(gsap, ScrollTrigger, disarm);
      })
      .catch(disarm)
      .finally(() => window.clearTimeout(failsafe));

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}

function run(gsap: typeof Gsap, ScrollTrigger: typeof ScrollTriggerType, disarm: () => void) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const q = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);

    // 1. Hero art settles from a slight overscale as the page opens.
    const heroArt = q('[data-bg-art="hero"]');
    if (heroArt.length) gsap.fromTo(heroArt, { scale: 1.08 }, { scale: 1, duration: 1.4, ease: "power2.out" });

    // 2. Hero headline and panel rise together. Starting opacity is 0.01 rather than 0 so the
    //    largest element is still painted immediately and the LCP measurement is unaffected.
    const heroItems = q("[data-gsap-hero]");
    if (heroItems.length) {
      gsap.from(heroItems, { y: 24, opacity: 0.01, duration: 0.7, ease: "power2.out", stagger: 0.12 });
    }

    // 3. Background art drifts against the scroll.
    q("[data-bg-art]").forEach((art) => {
      gsap.to(art, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: art.parentElement ?? art, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });

    // 4. Cards and sections fade and rise in batches as they enter the viewport.
    const reveals = q("[data-gsap-reveal]");
    if (reveals.length) {
      gsap.set(reveals, { opacity: 0, y: 32 });
      ScrollTrigger.batch(reveals, {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.08, overwrite: true }),
      });
    }
    // GSAP owns the inline styles now, so the CSS pre-hide is no longer needed.
    disarm();

    // 5. Role illustrations breathe. The frame around them is glass, so only the image moves.
    q("[data-gsap-float]").forEach((img) => {
      gsap.to(img, { y: 8, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 });
    });

    // 6. Hovering a card nudges its illustration, never the blurred card itself.
    const hoverCleanups = q("[data-gsap-hover]").map((card) => {
      const art = card.querySelector<HTMLElement>("[data-art-frame] img");
      if (!art) return () => {};
      const to = (scale: number) => () => gsap.to(art, { scale, duration: 0.25, ease: "power2.out", overwrite: "auto" });
      const enter = to(1.02);
      const leave = to(1);
      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointerleave", leave);
      card.addEventListener("focusin", enter);
      card.addEventListener("focusout", leave);
      return () => {
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("pointerleave", leave);
        card.removeEventListener("focusin", enter);
        card.removeEventListener("focusout", leave);
      };
    });

    // 7. Stat counters run up to their final value, snapped to whole numbers.
    q("[data-gsap-count]").forEach((slot) => {
      const final = Number(slot.dataset.gsapCount);
      if (!Number.isFinite(final)) return;
      // Don't flash a number that is already on screen back to zero; leave it at its final value.
      const box = slot.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) return;
      const counter = { value: 0 };
      slot.textContent = "0";
      gsap.to(counter, {
        value: final,
        duration: 1.2,
        ease: "power2.out",
        snap: { value: 1 },
        onUpdate: () => {
          slot.textContent = String(counter.value);
        },
        scrollTrigger: { trigger: slot, start: "top 85%", once: true },
      });
    });

    return () => hoverCleanups.forEach((off) => off());
  });

  // Reduced motion: no tweens are created, so nothing would ever clear the pre-hide.
  disarm();

  // Art decodes after first paint and changes the page height, so re-measure once it's in.
  const refresh = () => ScrollTrigger.refresh();
  if (document.readyState === "complete") refresh();
  else window.addEventListener("load", refresh, { once: true });

  return () => {
    window.removeEventListener("load", refresh);
    mm.revert();
  };
}
