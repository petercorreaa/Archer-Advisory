"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { setLenis, getLenis } from "@/lib/scroll";

/**
 * Drives smooth scrolling with Lenis and keeps GSAP ScrollTrigger in sync with it.
 * When the user prefers reduced motion we skip Lenis entirely and fall back to
 * the browser's native scrolling, with no inertia or transforms.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) {
      // Native scroll only; still let ScrollTrigger track the default scroller.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(lenis);

    // Sync Lenis position into ScrollTrigger on every scroll event.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker so both share the same RAF frame.
    // gsap.ticker time is in seconds; lenis.raf expects milliseconds.
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      setLenis(null);
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  // After a client-side route change the page height changes but Lenis keeps
  // its old scroll limit, which makes the page "stop scrolling" partway down.
  // Recalculate the limit and refresh ScrollTrigger once the new page paints.
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) {
      // Reduced-motion / native scroll path: still refresh triggers.
      ScrollTrigger.refresh();
      return;
    }
    lenis.start(); // undo any lingering stop() from a modal on the old route

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  return <>{children}</>;
}
