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

    // 2b. Silk creases break out from behind the content and then drift for good.
    //     Two tweens per crease on purpose: the entrance owns scale, and the perpetual loop owns
    //     position and rotation, so neither ever overwrites the other mid-flight.
    //     The crease angle lives in the standalone CSS `rotate` property and the centring in CSS
    //     `translate`, both of which compose with GSAP's `transform` rather than fighting it — so
    //     GSAP only ever touches scale, position and opacity here.
    q("[data-silk-crease]").forEach((crease, i) => {
      const delay = parseFloat(getComputedStyle(crease).getPropertyValue("--crease-delay")) || 0;

      gsap.fromTo(
        crease,
        { scaleX: 0.28, scaleY: 0.12, opacity: 0 },
        { scaleX: 1, scaleY: 1, opacity: 1, duration: 2.4, ease: "power3.out", delay },
      );

      gsap.to(crease, {
        xPercent: i % 2 === 0 ? 8 : -8,
        yPercent: i % 2 === 0 ? -6 : 6,
        scaleY: 1.18,
        duration: 13 + i * 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: delay + 2.4,
      });
    });

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
    // 4b. Capability capsules pop in rather than rising, so the group reads as one gesture.
    const pops = q("[data-gsap-pop]");
    if (pops.length) {
      gsap.set(pops, { opacity: 0, scale: 0.86 });
      ScrollTrigger.batch(pops, {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.7)", stagger: 0.08, overwrite: true }),
      });
    }

    // 4d. The six outcome pieces arrive as one slab with its gaps closed, then break apart into
    //     their real positions. Offsets are measured when the trigger fires rather than at setup,
    //     so they are correct at whatever breakpoint and layout the reader is actually on.
    q("[data-break-root]").forEach((root) => {
      const pieces = gsap.utils.toArray<HTMLElement>("[data-break-item]", root);
      if (!pieces.length) return;
      gsap.set(pieces, { opacity: 0 });

      ScrollTrigger.create({
        trigger: root,
        start: "top 82%",
        once: true,
        onEnter: () => {
          const box = root.getBoundingClientRect();
          const cx = box.left + box.width / 2;
          const cy = box.top + box.height / 2;
          // Pull each piece toward the centre so the gaps close and the six read as one surface.
          pieces.forEach((el) => {
            const b = el.getBoundingClientRect();
            gsap.set(el, {
              x: (cx - (b.left + b.width / 2)) * 0.052,
              y: (cy - (b.top + b.height / 2)) * 0.052,
              scale: 0.985,
            });
          });

          gsap
            .timeline()
            .to(pieces, { opacity: 1, duration: 0.35, ease: "power1.out" })
            .to(
              pieces,
              {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.75,
                ease: "back.out(1.4)",
                stagger: { each: 0.05, from: "center", grid: "auto" },
              },
              "+=0.12",
            );
        },
      });
    });

    // 4c. Before / after: the two states arrive in sequence, so the change reads as a change.
    //     Start states are set immediately rather than in the tween, so nothing flashes between
    //     the CSS pre-hide being dropped and the trigger firing further down the page.
    const compareCleanups: Array<() => void> = [];
    q("[data-compare-root]").forEach((root) => {
      const pick = (name: string) => root.querySelector<HTMLElement>(`[data-compare="${name}"]`);
      const before = pick("before");
      const link = pick("link");
      const after = pick("after");
      const glow = pick("glow");

      // Opposing entrance: the two columns start off-position — "before" held above, "after" held
      // below — and travel to their real positions one after the other. The whole displacement
      // lives here rather than in the scroll scrub, so once they land they stay landed.
      // The "before" card is server-rendered in its finished state (struck, grey, crosshatched).
      // With motion allowed, wind it back to a plain card so the sequence can play toward that.
      const grey = root.querySelector<HTMLElement>('[data-before="grey"]');
      const hatch = root.querySelector<HTMLElement>('[data-drift="hatch"]');
      const strikeTexts = Array.from(root.querySelectorAll<HTMLElement>("[data-strike]"));
      strikeTexts.forEach((t) => t.classList.remove("before-struck"));

      if (before) gsap.set(before, { opacity: 0, y: -72 });
      if (grey) gsap.set(grey, { opacity: 0 });
      if (hatch) gsap.set(hatch, { opacity: 0 });
      if (link) gsap.set(link, { opacity: 0, scale: 0.4 });
      if (after) gsap.set(after, { opacity: 0, y: 96 });
      if (glow) gsap.set(glow, { opacity: 0 });

      // Strike segments are injected at trigger time, one per wrapped line, because how many
      // lines a pain wraps onto depends on the width the reader is actually at. Until a resize,
      // the drawn segments simply stay; on a resize they hand over to the CSS strike-through,
      // which re-wraps with the text on its own.
      const injected: HTMLElement[] = [];
      let resizeWatch: ResizeObserver | undefined;
      const settleToCss = () => {
        injected.forEach((s) => s.remove());
        injected.length = 0;
        strikeTexts.forEach((t) => t.classList.add("before-struck"));
      };

      const drawStrikes = () => {
        const strikes = gsap.timeline();
        strikeTexts.forEach((text, i) => {
          const li = text.parentElement;
          if (!li) return;
          const liBox = li.getBoundingClientRect();
          const range = document.createRange();
          range.selectNodeContents(text);
          const segments = Array.from(range.getClientRects())
            .filter((r) => r.width > 2)
            .map((r) => {
              const seg = document.createElement("span");
              seg.className = "strike-line";
              seg.setAttribute("aria-hidden", "true");
              // Offsets are relative to the li, so the card's own entrance transform cancels out.
              seg.style.left = `${r.left - liBox.left}px`;
              seg.style.top = `${r.top - liBox.top + r.height * 0.55}px`;
              seg.style.width = `${r.width}px`;
              li.appendChild(seg);
              injected.push(seg);
              return seg;
            });
          if (!segments.length) return;
          gsap.set(segments, { scaleX: 0 });
          // One bullet at a time; a wrapped bullet strikes its lines in reading order.
          strikes.to(segments, { scaleX: 1, duration: 0.42, ease: "power2.inOut", stagger: 0.16 }, i === 0 ? 0 : "+=0.08");
        });
        return strikes;
      };

      const watchResize = () => {
        const list = root.querySelector<HTMLElement>("[data-strike-list]");
        if (!list || !injected.length) return;
        const startWidth = list.getBoundingClientRect().width;
        resizeWatch = new ResizeObserver(() => {
          if (Math.abs(list.getBoundingClientRect().width - startWidth) < 1) return;
          settleToCss();
          resizeWatch?.disconnect();
        });
        resizeWatch.observe(list);
      };

      compareCleanups.push(() => {
        resizeWatch?.disconnect();
        settleToCss();
      });

      // Built when the trigger fires, so the strike measurements match the live layout.
      //   1. "before" drops into place as a plain card
      //   2. each pain is struck through, one after another
      //   3. the card drains to grey and the crosshatch comes up
      //   4. the arrow pops, then "after" lifts up into place and its glow blooms
      ScrollTrigger.create({
        trigger: root,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          if (before) tl.to(before, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
          if (strikeTexts.length) tl.add(drawStrikes(), "+=0.1");
          if (grey) tl.to(grey, { opacity: 1, duration: 0.6, ease: "power1.out" }, "+=0.15");
          if (hatch) tl.to(hatch, { opacity: 1, duration: 0.8, ease: "power1.out" }, "<0.1");
          if (link) tl.to(link, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2.2)" }, "-=0.25");
          if (after) tl.to(after, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.1");
          if (glow) tl.to(glow, { opacity: 1, duration: 1.1, ease: "power2.out" }, "-=0.6");
          tl.call(watchResize);
        },
      });

      // Scroll-scrubbed drift, sequenced rather than simultaneous: the "before" column sinks
      // through the first half of the section's travel, then the "after" column rises and lights
      // up through the second half. One timeline, so the ordering holds at any scroll speed and
      // reverses cleanly on the way back up.
      //
      // Only decorative layers and whole panels move — text opacity is never scrubbed, so nothing
      // is ever half-faded while it is being read.
      const drift = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      // The columns themselves are deliberately NOT scrubbed: their travel belongs to the
      // entrance, which ends at their real position and leaves them there. Only the decorative
      // hatch drifts with the scroll, so the panel has life without ever shifting the copy.
      if (hatch) drift.to(hatch, { yPercent: 18, xPercent: -13, duration: 1 }, 0);

      // The arrow keeps flowing from one state to the other.
      const arrow = root.querySelector<HTMLElement>('[data-drift="arrow"]');
      if (arrow) gsap.to(arrow, { x: 5, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1 });

      // Hovering the resolved state deepens its glow. This targets the inner bloom layer, not the
      // glow wrapper the scrub owns, so the two never overwrite each other.
      const bloomEl = root.querySelector<HTMLElement>('[data-drift="bloom"]');
      if (after && bloomEl) {
        const bloom = (scale: number) => () => gsap.to(bloomEl, { scale, duration: 0.45, ease: "power2.out", overwrite: "auto" });
        const enter = bloom(1.18);
        const leave = bloom(1);
        after.addEventListener("pointerenter", enter);
        after.addEventListener("pointerleave", leave);
        compareCleanups.push(() => {
          after.removeEventListener("pointerenter", enter);
          after.removeEventListener("pointerleave", leave);
        });
      }
    });

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

    return () => [...compareCleanups, ...hoverCleanups].forEach((off) => off());
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
