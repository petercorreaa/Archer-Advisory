import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins once, guarding against double-registration during HMR / RSC.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * True when the user has requested reduced motion, or when called on the server.
 * Treating SSR as "reduced" keeps us from assuming animation is safe before hydration.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Reduced-motion-aware animation helper.
 *
 * Runs `build` to create a GSAP timeline/tween only when motion is allowed.
 * When the user prefers reduced motion, the optional `onReducedMotion` callback
 * is invoked instead so you can snap elements to their final state with no
 * transforms. Returns the created animation (or undefined) and a cleanup fn.
 */
export function animateWithMotion<T extends gsap.core.Animation>(
  build: (ctx: typeof gsap) => T,
  onReducedMotion?: () => void
): { animation?: T; cleanup: () => void } {
  if (prefersReducedMotion()) {
    onReducedMotion?.();
    return { cleanup: () => {} };
  }

  const animation = build(gsap);
  return {
    animation,
    cleanup: () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    },
  };
}

export { gsap, ScrollTrigger };
