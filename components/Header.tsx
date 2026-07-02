"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileLinksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Staggered entrance when mobile menu opens
  useEffect(() => {
    if (!menuOpen || !mobileLinksRef.current || prefersReducedMotion()) return;
    const items = mobileLinksRef.current.querySelectorAll("li");
    gsap.fromTo(
      items,
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.4, ease: "power2.out", clearProps: "all" }
    );
  }, [menuOpen]);

  // Lock body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => void (document.body.style.overflow = "");
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/*
       * Floating island — centered, full width minus 1rem gutter on each side,
       * capped at the site's content width. Rounded from the start; deepens
       * its shadow and tightens padding after 60px of scroll.
       */}
      <header
        className={cn(
          // Position: centered pill floating above the page
          "fixed top-4 left-1/2 -translate-x-1/2 z-50",
          "w-[calc(100%-1rem)] max-w-[1440px]",
          // Shape
          "rounded-2xl",
          // Transition
          "transition-all duration-300 ease-in-out",
          // Resting: light background + subtle border
          scrolled
            ? "py-5   bg-white/95 backdrop-blur-md border border-ink/10 shadow-[0_8px_32px_rgba(26,26,26,0.13)]"
            : "py-6   bg-white/88 backdrop-blur-sm border border-ink/6  shadow-[0_4px_20px_rgba(26,26,26,0.08)]"
        )}
      >
        <div className="flex items-center justify-between gap-8 px-3 lg:px-5">
          {/* Wordmark */}
          <Link
            href="/"
            onClick={close}
            className="shrink-0 focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 rounded-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-orange.png"
              alt="Archer Advisory"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "font-body text-sm font-semibold tracking-wide transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 rounded-sm",
                  pathname === href
                    ? "text-brand-orange"
                    : "text-ink/60 hover:text-ink"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <Button href="/contact" size="sm" className="hidden lg:inline-flex">
              Book a consultation
            </Button>

            {/* Hamburger — animated to ✕ when open */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-brand-orange/40 focus-visible:ring-offset-2 rounded-md"
            >
              <span
                className={cn(
                  "w-6 h-px bg-ink transition-all duration-300 ease-in-out origin-center",
                  menuOpen && "translate-y-[6px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "w-6 h-px bg-ink transition-all duration-300 ease-in-out",
                  menuOpen && "opacity-0 scale-x-0"
                )}
              />
              <span
                className={cn(
                  "w-6 h-px bg-ink transition-all duration-300 ease-in-out origin-center",
                  menuOpen && "-translate-y-[6px] -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-white lg:hidden",
          "transition-opacity duration-300 ease-in-out",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex-1 flex flex-col justify-center px-6 pt-28">
          <ul ref={mobileLinksRef} className="space-y-1" aria-label="Mobile navigation">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={close}
                  className={cn(
                    "block py-3 font-heading font-bold text-4xl tracking-tight transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 rounded-sm",
                    pathname === href
                      ? "text-brand-orange"
                      : "text-ink hover:text-brand-orange"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button href="/contact" size="lg" onClick={close}>
              Book a consultation
            </Button>
          </div>
        </div>

        <div className="px-6 pb-10">
          <p className="text-xs text-ink/40 font-body">
            All consultations are strictly confidential.
          </p>
        </div>
      </div>
    </>
  );
}
