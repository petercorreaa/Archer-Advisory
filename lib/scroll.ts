import type Lenis from "lenis";

let _lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  _lenis = instance;
}

export function getLenis() {
  return _lenis;
}

export function scrollToTop() {
  if (_lenis) {
    _lenis.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/** Recalculate Lenis's cached scroll limit — call after content height changes. */
export function resizeScroll() {
  _lenis?.resize();
}

/** Freeze / unfreeze smooth scrolling (used while modals/menus are open). */
export function stopScroll() {
  _lenis?.stop();
}

export function startScroll() {
  _lenis?.start();
}
