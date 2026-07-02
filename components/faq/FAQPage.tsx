"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { gsap } from "@/lib/gsap";
import { FAQ_CATEGORIES, type FAQItem } from "@/content/faq";

// ── Easing shared with Tailwind brand curve ──────────────────────────────
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

// ── Single accordion item ─────────────────────────────────────────────────

function AccordionItem({
  item,
  isOpen,
  onToggle,
  btnId,
  panelId,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  btnId: string;
  panelId: string;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Animate height on open/close
  useEffect(() => {
    const body = bodyRef.current;
    const inner = innerRef.current;
    if (!body || !inner) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      body.style.height = isOpen ? "auto" : "0px";
      body.style.overflow = isOpen ? "visible" : "hidden";
      return;
    }

    if (isOpen) {
      const h = inner.scrollHeight;
      gsap.fromTo(
        body,
        { height: 0 },
        { height: h, duration: 0.42, ease: EASE, onComplete: () => { body.style.height = "auto"; } }
      );
    } else {
      gsap.to(body, { height: 0, duration: 0.36, ease: EASE });
    }
  }, [isOpen]);

  return (
    <div className="js-faq-item border-b border-ink/8">
      <h3 className="m-0">
        <button
          id={btnId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group w-full flex items-start justify-between gap-6 py-5 text-left
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40
                     focus-visible:ring-offset-2 rounded-sm"
        >
          <span
            className="font-heading font-semibold text-base text-ink leading-snug
                       group-hover:text-brand-orange transition-colors duration-200"
          >
            {item.question}
          </span>
          {/* ± icon */}
          <span
            aria-hidden="true"
            className="mt-0.5 shrink-0 w-6 h-6 rounded-full border border-ink/15
                       flex items-center justify-center text-ink/40 transition-all duration-300
                       group-hover:border-brand-orange/40 group-hover:text-brand-orange"
            style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: `transform 0.36s ${EASE}` }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <line x1="6" y1="1" x2="6" y2="11" />
              <line x1="1" y1="6" x2="11" y2="6" />
            </svg>
          </span>
        </button>
      </h3>

      {/* Collapsible region */}
      <div
        ref={bodyRef}
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        style={{ height: 0, overflow: "hidden" }}
      >
        <div ref={innerRef}>
          <p className="pb-6 pt-0.5 text-base text-ink/58 leading-relaxed max-w-2xl">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Page component ────────────────────────────────────────────────────────

export function FAQPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const uid = useId(); // stable prefix for ARIA ids
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Page header
        gsap
          .timeline({ delay: 0.15 })
          .fromTo(
            ".faq-word",
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.048, duration: 0.7, ease: "power2.out" }
          )
          .fromTo(
            ".faq-fade",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.65, ease: "power2.out" },
            "-=0.25"
          );

        // Hero bg parallax
        gsap.to(".faq-hero-bg", {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: ".js-faq-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Category group headers slide in from left on scroll
        gsap.utils.toArray<HTMLElement>(".js-faq-group").forEach((group) => {
          const header = group.querySelector(".js-faq-group-header");
          const items = group.querySelectorAll(".js-faq-item");

          if (header) {
            gsap.fromTo(
              header,
              { x: -28, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.75,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: group,
                  start: "top 84%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          if (items.length) {
            gsap.fromTo(
              items,
              { y: 22, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.055,
                duration: 0.55,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: group,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".faq-word, .faq-fade, .js-faq-group-header, .js-faq-item",
          { opacity: 1, y: 0, x: 0 }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>

      {/* ═══════════════════════════════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="js-faq-hero relative flex items-center overflow-hidden"
        style={{ minHeight: "46vh" }}
      >
        <div
          className="faq-hero-bg absolute inset-0 will-change-transform"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
              "linear-gradient(160deg, #090914 0%, #0d0d28 55%, #0a1620 100%)",
            ].join(", "),
            backgroundSize: "72px 72px, 72px 72px, 100% 100%",
            top: "-15%",
            bottom: "-15%",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 90% 20%, rgba(16,12,158,0.18) 0%, transparent 65%)",
          }}
        />

        <Container className="relative z-10 pt-36 pb-16 lg:pt-40 lg:pb-20">
          <p className="faq-fade font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 mb-8">
            FAQ
          </p>
          <h1
            className="text-white max-w-3xl"
            style={{
              fontSize: "clamp(2.6rem, 5.5vw, 4.25rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
            }}
          >
            {"Questions we hear often.".split(" ").map((word, i, arr) => (
              <span
                key={i}
                className="faq-word inline-block"
                style={{ marginRight: i < arr.length - 1 ? "0.28em" : 0 }}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="faq-fade mt-7 max-w-lg text-lg text-white/55 leading-relaxed">
            Honest answers to the questions law firms ask before, during, and after engaging us.
          </p>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ACCORDION BODY
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-16 lg:gap-24">

            {/* ── Left: sticky category nav (desktop) ── */}
            <nav aria-label="FAQ categories" className="hidden lg:block">
              <ul className="sticky top-[120px] space-y-1">
                {FAQ_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <a
                      href={`#${cat.id}`}
                      className="block py-1.5 px-3 text-sm font-body text-ink/45 rounded
                                 hover:text-ink/80 transition-colors duration-150
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40"
                    >
                      {cat.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Right: question groups ── */}
            <div className="space-y-16 lg:space-y-20">
              {FAQ_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  id={cat.id}
                  className="js-faq-group scroll-mt-32"
                >
                  {/* Category heading */}
                  <div className="js-faq-group-header flex items-center gap-4 mb-7">
                    <span aria-hidden="true" className="w-6 h-px bg-brand-orange shrink-0" />
                    <h2
                      className="font-heading font-semibold text-ink/55"
                      style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
                    >
                      {cat.title}
                    </h2>
                  </div>

                  {/* Accordion items */}
                  <div role="list" aria-label={cat.title}>
                    {/* First item has a top border */}
                    <div className="border-t border-ink/8">
                      {cat.items.map((item) => {
                        const btnId  = `${uid}-btn-${item.id}`;
                        const panelId = `${uid}-panel-${item.id}`;
                        return (
                          <div key={item.id} role="listitem">
                            <AccordionItem
                              item={item}
                              isOpen={openItems.has(item.id)}
                              onToggle={() => toggle(item.id)}
                              btnId={btnId}
                              panelId={panelId}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </Container>
      </section>


    </div>
  );
}
