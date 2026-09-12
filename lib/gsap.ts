import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Module scope runs once per client bundle, so the plugin is registered exactly once.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
