"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { STATS } from "@/lib/data";

// ── Static data ────────────────────────────────────────────────────────────

const HEADLINE = ["Precise accounting.", "Complete compliance.", "Built for law firms."];

const SERVICES = [
  {
    n: "01",
    title: "Trust Accounting & Reconciliation",
    body: "Daily three-way reconciliations, IOLTA compliance, matter-level reporting, and audit-ready ledgers — keeping your firm perpetually examination-ready.",
  },
  {
    n: "02",
    title: "Legal Billing & Matter Management",
    body: "Timekeeping oversight, billing rate strategy, LEDES e-billing, and collections workflow integrated seamlessly across your practice management stack.",
  },
  {
    n: "03",
    title: "Data Analytics & Reporting",
    body: "Custom KPIs, profitability analysis by matter and practice group, utilization dashboards, and partner compensation modeling built for the boardroom.",
  },
  {
    n: "04",
    title: "Workflow Automation",
    body: "Integration-led automation connecting practice management, accounting, and compliance systems — eliminating manual handoffs and reducing exposure to human error.",
  },
];


const PARTNERS = [
  "Clio",
  "QuickBooks Online",
  "Xero",
  "Cosmolex",
  "NetSuite",
  "Sage Intacct",
  "LawPay",
  "MyCase",
  "PracticePanther",
  "Smokeball",
];

const DIFF_PILLARS = [
  [
    "IOLTA & Trust Account Ethics",
    "Three-way reconciliation, fiduciary rule compliance, and bar association audit preparation.",
  ],
  [
    "AML & Know-Your-Client",
    "Anti-money laundering program design and client risk classification for matters and retainers.",
  ],
  [
    "Conflict Check Frameworks",
    "Process design and technology integration for comprehensive matter-level conflict identification.",
  ],
  [
    "Financial Regulatory Filings",
    "State bar financial reporting, FATCA/FBAR obligations, and mandatory disclosure compliance.",
  ],
];

const TESTIMONIALS = [
  {
    quote:
      "Archer transformed our trust accounting from a liability into a competitive advantage. Their advisors understand law firm operations at a level I've never seen from an accounting firm.",
    name: "Margaret D. Holloway",
    title: "Managing Partner",
    firm: "Holloway & Vance LLP",
  },
  {
    quote:
      "We were flagged during a bar association review of our IOLTA accounts. Archer rebuilt our entire reconciliation process in thirty days. We've had zero findings since.",
    name: "Robert J. Castellano",
    title: "Founding Partner",
    firm: "Castellano Bennett PC",
  },
  {
    quote:
      "The combination of accounting depth and compliance fluency is genuinely rare. Archer doesn't just prepare our financials — they advise us on the decisions behind them.",
    name: "Evelyn S. Park",
    title: "Chief Operating Officer",
    firm: "Meridian Law Group",
  },
];

// ── Component ──────────────────────────────────────────────────────────────

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Full-motion experience ─────────────────────────────────────
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero — staggered word reveal, runs once on load
        gsap
          .timeline({ delay: 0.15 })
          .fromTo(
            ".hero-word",
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.045, duration: 0.7, ease: "power2.out" }
          )
          .fromTo(
            ".hero-fade",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.12, duration: 0.65, ease: "power2.out" },
            "-=0.3"
          );

        // Hero background parallax — scrubbed to scroll
        gsap.to(".hero-bg", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: ".js-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Scroll-scrub reveals — each section slides up as it enters
        gsap.utils.toArray<HTMLElement>(".js-reveal").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 64, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 86%",
                end: "top 52%",
                scrub: 1,
              },
            }
          );
        });

        // Differentiator interior lines stagger when diff section comes into view
        gsap.fromTo(
          ".js-diff-line",
          { x: -18, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.09,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".js-diff-section",
              start: "top 65%",
              toggleActions: "play none none none",
            },
          }
        );

        // Service cards — stagger from below, play-once
        gsap.fromTo(
          ".js-service-card",
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.11,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".js-services-grid",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // Stats count-up — each counter fires independently when in view
        STATS.forEach((stat, i) => {
          const el = rootRef.current?.querySelectorAll(".js-stat-value")[i] as HTMLElement | null;
          if (!el) return;
          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: stat.end,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            onUpdate() {
              el.textContent = Math.round(proxy.val) + stat.suffix;
            },
          });
        });

        // Testimonial cards stagger
        gsap.fromTo(
          ".js-testimonial-card",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.13,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".js-testimonials-grid",
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );

      });

      // ── Reduced-motion: show everything at final state immediately ─
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".hero-word, .hero-fade, .js-reveal, .js-why-archer, .js-diff-line, .js-service-card, .js-testimonial-card",
          { opacity: 1, y: 0, x: 0, scale: 1 }
        );
        STATS.forEach((stat, i) => {
          const el = rootRef.current?.querySelectorAll(".js-stat-value")[i] as HTMLElement | null;
          if (el) el.textContent = stat.end + stat.suffix;
        });
      });

      // Refresh once after all triggers are registered
      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* ═══════════════════════════════════════════════════════════════
          1. HERO
          Full-viewport dark hero with CSS architectural grid + GSAP parallax.
      ══════════════════════════════════════════════════════════════════ */}
      <section className="js-hero relative min-h-screen flex items-center overflow-hidden">
        {/* Background layer — parallax target */}
        <div
          className="hero-bg absolute inset-0 will-change-transform"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
              "linear-gradient(150deg, #090914 0%, #12122e 45%, #0b1828 100%)",
            ].join(", "),
            backgroundSize: "72px 72px, 72px 72px, 100% 100%",
            top: "-15%",
            bottom: "-15%",
          }}
        />

        {/* Brand-blue radial accent — top-right quadrant */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 60% at 78% 20%, rgba(16,12,158,0.22) 0%, transparent 68%)",
          }}
        />

        {/* Subtle vignette at the bottom for content legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(9,9,20,0.6) 0%, transparent 100%)",
          }}
        />

        {/* Hero content */}
        <Container className="relative z-10 pt-36 pb-32 lg:pt-44 lg:pb-40">
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <p className="hero-fade font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 mb-9">
              Archer Advisory — Law Firm Financial Services
            </p>

            {/* Headline — each word is individually animated */}
            <h1
              className="text-white mb-9"
              style={{ fontSize: "clamp(3rem, 6.5vw, 5.25rem)", lineHeight: 1.04, letterSpacing: "-0.02em" }}
            >
              {HEADLINE.map((line, li) => (
                <span key={li} className="block">
                  {line.split(" ").map((word, wi, arr) => (
                    <span
                      key={wi}
                      className="hero-word inline-block"
                      style={{ marginRight: wi < arr.length - 1 ? "0.3em" : 0 }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Subhead */}
            <p className="hero-fade max-w-2xl text-lg lg:text-xl text-white/60 leading-relaxed mb-11">
              Archer Advisory serves as your firm's financial and compliance backbone — from IOLTA
              trust accounting to AML advisory — so your attorneys can focus entirely on the law.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="hero-fade"
              >
                Book a consultation
              </Button>
              <Button
                href="/services"
                variant="ghost"
                size="lg"
                className="hero-fade"
              >
                Our services
              </Button>
            </div>
          </div>
        </Container>

        {/* Scroll nudge */}
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 opacity-35"
        >
          <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-white">
            Scroll
          </span>
          {/* Mouse icon */}
          <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
            <rect x="1" y="1" width="16" height="26" rx="8" stroke="white" strokeOpacity="0.5" />
            <rect x="8" y="5" width="2" height="5" rx="1" fill="white" className="animate-bounce" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2 + 3. STICKY SLIDE-OVER BLOCK
          Why Archer is sticky within this wrapper. Once the Differentiator
          scrolls past, the wrapper ends and Why Archer unsticks — preventing
          it from reappearing below the Differentiator.
      ══════════════════════════════════════════════════════════════════ */}
      <div>

      {/* 2. VALUE PROPOSITION */}
      <section className="js-why-archer sticky top-[112px] z-[1] min-h-screen flex flex-col justify-center bg-white py-28 lg:py-36">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-7">
              Why Archer Advisory
            </p>
            <h2 className="text-ink" style={{ lineHeight: 1.06 }}>
              The standard for financial integrity in legal practice.
            </h2>
            <p className="mt-7 text-lg text-ink/60 leading-relaxed max-w-xl mx-auto">
              Law firms operate in one of the most compliance-dense environments in professional
              services. We built our practice around that reality — combining accounting depth with
              regulatory fluency so nothing falls through the cracks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/8 rounded-xl overflow-hidden border border-ink/8">
            {[
              {
                label: "Fiduciary-grade rigor",
                body: "Every engagement is held to the same standard we'd apply if we were your managing partner — not just your accountant.",
              },
              {
                label: "Law-firm-only focus",
                body: "We don't serve restaurants, retailers, or startups. Our entire practice is built around the economics and ethics of legal service delivery.",
              },
              {
                label: "Integrated compliance",
                body: "Financial reporting and regulatory advisory delivered as a single, coordinated service — never siloed, never duplicated.",
              },
            ].map(({ label, body }) => (
              <div key={label} className="bg-white p-8 lg:p-10">
                <div className="w-8 h-px bg-brand-orange mb-6" aria-hidden="true" />
                <p className="font-heading font-semibold text-base text-ink mb-3">{label}</p>
                <p className="text-sm text-ink/55 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. DIFFERENTIATOR SPOTLIGHT — slides up over the pinned Why Archer section
          Sand section housing the blue gradient panel — compliant with the
          rule that .gradient-blue only lives on sand surfaces.
      ══════════════════════════════════════════════════════════════════ */}
      <section className="js-diff-section relative z-[2] py-28 lg:py-36 bg-brand-sand">
        <Container>
          {/* Section label above the panel */}
          <div className="mb-12 flex items-center gap-4">
            <div className="w-6 h-px bg-ink/25" aria-hidden="true" />
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              Our Differentiator
            </p>
          </div>

          {/* The gradient panel */}
          <div
            className="js-diff-panel gradient-blue rounded-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 40px 80px rgba(16,12,158,0.28), 0 8px 24px rgba(0,0,0,0.18)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {/* Left — the claim */}
              <div className="p-10 lg:p-16">
                <h2
                  className="js-diff-line text-white mb-8"
                  style={{ lineHeight: 1.05, fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  Compliance beyond accounting.
                </h2>
                <p className="js-diff-line text-base text-white/68 leading-relaxed mb-5">
                  Most accounting firms stop at the numbers. Archer goes further — advising
                  your firm on conflict checks, AML compliance programs, trust account ethics,
                  and the regulatory decisions that expose firms to professional liability.
                </p>
                <p className="js-diff-line text-base text-white/68 leading-relaxed mb-10">
                  We are not your typical accountants. We are your firm's compliance counsel,
                  financial steward, and risk-management partner — rolled into one.
                </p>
                <Link
                  href="/services"
                  className="js-diff-line inline-flex items-center gap-2.5 font-heading font-semibold text-sm
                             text-white/80 border-b border-white/30 pb-0.5
                             hover:text-white hover:border-white transition-colors duration-200"
                >
                  Explore our advisory services
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Right — compliance pillars */}
              <div className="p-10 lg:p-16">
                <p className="js-diff-line font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-9">
                  Areas of advisory
                </p>
                <ul className="space-y-7">
                  {DIFF_PILLARS.map(([title, desc]) => (
                    <li key={title} className="js-diff-line flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 w-5 h-5 rounded-full border border-white/25 flex items-center justify-center shrink-0"
                      >
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                          <path
                            d="M1.5 3.5l2 2 4-4"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div>
                        <p className="font-heading font-semibold text-sm text-white mb-1">
                          {title}
                        </p>
                        <p className="text-xs text-white/52 leading-relaxed">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      </div>{/* end sticky slide-over block */}

      {/* ═══════════════════════════════════════════════════════════════
          4. SERVICES PREVIEW
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 bg-white">
        <Container>
          <div className="js-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-5">
                Services
              </p>
              <h2 className="text-ink max-w-xs" style={{ lineHeight: 1.06 }}>
                What we do for your firm.
              </h2>
            </div>
            <Link
              href="/services"
              className="font-heading font-semibold text-sm text-ink/45 hover:text-ink
                         transition-colors duration-200 whitespace-nowrap"
            >
              View all services →
            </Link>
          </div>

          <div className="js-services-grid grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((svc) => (
              <Link
                key={svc.title}
                href="/services"
                className="js-service-card group block border border-ink/[0.08] rounded-xl p-9
                           shadow-[0_4px_24px_rgba(26,26,26,0.07)]
                           hover:border-brand-orange/25 hover:shadow-[0_6px_32px_rgba(207,67,43,0.09)]
                           transition-all duration-300 ease-brand"
              >
                <div className="flex items-center justify-between mb-7">
                  <span className="font-heading text-xs font-semibold text-ink/25">{svc.n}</span>
                  <span
                    aria-hidden="true"
                    className="block h-px w-8 bg-ink/15 transition-all duration-300 ease-brand
                               group-hover:w-14 group-hover:bg-brand-orange/40"
                  />
                </div>
                <h3
                  className="font-heading font-semibold text-ink mb-4 leading-snug"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)" }}
                >
                  {svc.title}
                </h3>
                <p className="text-sm text-ink/55 leading-relaxed mb-7">{svc.body}</p>
                <span
                  className="inline-flex items-center gap-1.5 font-heading font-semibold text-sm
                             text-brand-orange opacity-0 translate-y-1
                             group-hover:opacity-100 group-hover:translate-y-0
                             transition-all duration-250 ease-brand"
                >
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. STATS
          Dark ink section — count-up animation via GSAP.
      ══════════════════════════════════════════════════════════════════ */}
      <section className="js-reveal py-28 lg:py-36 bg-ink">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {STATS.map(({ end, suffix, label }) => (
              <div key={label} className="text-center lg:text-left">
                <p
                  className="js-stat-value font-heading font-bold text-white"
                  style={{
                    fontSize: "clamp(2.75rem, 5.5vw, 4.25rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                  aria-label={`${end}${suffix} ${label}`}
                >
                  {/* Initial placeholder shown before GSAP fires */}
                  0{suffix}
                </p>
                <p className="mt-3 text-sm text-white/45 font-body leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          6. PLATFORM PARTNERS MARQUEE
          CSS-animated infinite horizontal scroll. Reduced-motion falls
          back to a static centered list (handled in globals.css).
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-t border-b border-ink/[0.07]">
        <Container>
          <p className="text-center font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/30 mb-10">
            Trusted integrations
          </p>
        </Container>

        {/* Visually hidden accessible list */}
        <ul className="sr-only" aria-label="Integration partners">
          {PARTNERS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        {/* Visual marquee — aria-hidden so screen readers use the list above */}
        <div className="overflow-hidden" aria-hidden="true">
          <div className="marquee-track flex items-center gap-16 w-max px-8">
            {[...PARTNERS, ...PARTNERS].map((partner, i) => (
              <span
                key={i}
                className="font-heading font-semibold text-sm text-ink/30 whitespace-nowrap shrink-0"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          7. TESTIMONIALS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 bg-white">
        <Container>
          <div className="js-reveal text-center mb-16">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-6">
              Client Perspectives
            </p>
            <h2 className="text-ink" style={{ lineHeight: 1.06 }}>
              Trusted by leading law firms.
            </h2>
          </div>

          <div className="js-testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="js-testimonial-card bg-white rounded-xl p-9 flex flex-col border border-ink/[0.08]"
                style={{ boxShadow: "0 4px 24px rgba(26,26,26,0.07)" }}
              >
                {/* Open-quote mark */}
                <svg
                  width="30"
                  height="22"
                  viewBox="0 0 30 22"
                  fill="none"
                  className="mb-7 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M0 22V13.6C0 9.87 .74 6.93 2.22 4.62 3.7 2.3 5.97.73 9.02 0L10.56 2.42C8.72 3 7.34 4.03 6.38 5.5 5.42 6.97 4.91 8.65 4.84 10.56h4.62V22H0zm16.56 0V13.6c0-3.73.74-6.67 2.22-8.98C20.26 2.3 22.53.73 25.58 0L27.12 2.42c-1.84.58-3.22 1.61-4.18 3.08-.96 1.47-1.47 3.15-1.54 5.06h4.62V22H16.56z"
                    fill="#CF432B"
                    fillOpacity="0.12"
                  />
                </svg>

                <blockquote className="text-sm text-ink/72 leading-relaxed flex-1 mb-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="border-t border-ink/[0.07] pt-5">
                  <p className="font-heading font-semibold text-sm text-ink">{t.name}</p>
                  <p className="text-xs text-ink/40 mt-0.5">
                    {t.title}, {t.firm}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

    </div>
  );
}
