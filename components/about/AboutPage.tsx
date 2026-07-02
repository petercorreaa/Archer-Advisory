"use client";

import { useEffect, useRef } from "react";
import { GlobePulse } from "@/components/ui/cobe-globe-pulse";
import Link from "next/link";
import { Container } from "@/components/Container";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { STATS } from "@/lib/data";

// ── Static data ────────────────────────────────────────────────────────────

const VALUES = [
  {
    n: "01",
    name: "Excellence",
    body: "We do not accept close enough. Every reconciliation, every report, every advisory engagement is held to a standard we would not hesitate to defend before a regulator, a bar examiner, or a managing partner.",
  },
  {
    n: "02",
    name: "Integrity",
    body: "We advise with candor. If your trust account practices carry risk, we will tell you — plainly, and before a regulator does. Our interest is your firm's long-term health, not your short-term comfort.",
  },
  {
    n: "03",
    name: "Partnership",
    body: "We measure our success by yours. Our advisors are accessible, proactive, and invested in your firm's trajectory — not just its quarterly reports. We are colleagues, not vendors.",
  },
];

const MILESTONES = [
  { year: "2008", event: "Founded in New York, serving boutique litigation practices" },
  { year: "2013", event: "AML compliance advisory practice established" },
  { year: "2017", event: "Expanded to 50-firm client roster across eight states" },
  { year: "2024", event: "100+ law firm clients served nationwide" },
];

const TEAM = [
  {
    initials: "JW",
    name: "James R. Whitmore",
    role: "Managing Partner",
    bio: "25 years advising law firm partners on trust accounting, IOLTA compliance, and strategic financial management.",
    accent: "from-[#0a0a18] to-[#1a1a38]",
  },
  {
    initials: "CM",
    name: "Dr. Catherine L. Morrow",
    role: "Director of Compliance",
    bio: "Former state bar financial examiner with deep expertise in AML program design, KYC frameworks, and regulatory filings.",
    accent: "from-[#0f0a1e] to-[#1e1028]",
  },
  {
    initials: "MT",
    name: "Marcus A. Tan",
    role: "Director of Client Services",
    bio: "Specialises in legal billing strategy, LEDES e-billing implementation, and practice management platform integration.",
    accent: "from-[#0a1018] to-[#102030]",
  },
  {
    initials: "SR",
    name: "Sofia V. Reyes",
    role: "Senior Advisor, Analytics",
    bio: "Builds the financial models and dashboards that give law firm partners clarity on profitability, utilisation, and growth.",
    accent: "from-[#120a10] to-[#241228]",
  },
];

const PAGE_HEADLINE = ["Specialists in the", "business of law."];

// ── Component ──────────────────────────────────────────────────────────────

export function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Page header — word stagger + fade, same cadence as Home hero ─
        gsap
          .timeline({ delay: 0.15 })
          .fromTo(
            ".about-word",
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: "power2.out" }
          )
          .fromTo(
            ".about-fade",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.12, duration: 0.65, ease: "power2.out" },
            "-=0.25"
          );

        // Page header background parallax
        gsap.to(".about-hero-bg", {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: ".js-about-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // ── Scroll-scrub section reveals — identical to Home ─────────────
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

        // ── Story: decorative quote callout slides in from left ───────────
        gsap.fromTo(
          ".js-story-quote",
          { x: -32, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".js-story-quote",
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );

        // ── Milestone strip — each item ticks in with stagger ─────────────
        gsap.fromTo(
          ".js-milestone",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".js-milestones",
              start: "top 84%",
              toggleActions: "play none none none",
            },
          }
        );

        // ── Value cards — lift + stagger, play-once ───────────────────────
        gsap.fromTo(
          ".js-value-card",
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.13,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".js-values-grid",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // ── Stats count-up — same pattern as Home ─────────────────────────
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

        // ── Team cards — stagger from below ──────────────────────────────
        gsap.fromTo(
          ".js-team-card",
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.11,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".js-team-grid",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        ScrollTrigger.refresh();
      });

      // ── Reduced-motion: snap everything to final state ────────────────
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".about-word, .about-fade, .js-reveal, .js-story-quote, .js-milestone, .js-value-card, .js-team-card",
          { opacity: 1, y: 0, x: 0 }
        );
        STATS.forEach((stat, i) => {
          const el = rootRef.current?.querySelectorAll(".js-stat-value")[i] as HTMLElement | null;
          if (el) el.textContent = stat.end + stat.suffix;
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>

      {/* ═══════════════════════════════════════════════════════════════
          1. PAGE HEADER
          Same dark architectural grid as Home hero, condensed to ~55vh.
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="js-about-hero relative flex items-center overflow-hidden"
        style={{ minHeight: "68vh" }}
      >
        {/* Parallax background */}
        <div
          className="about-hero-bg absolute inset-0 will-change-transform"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
              "linear-gradient(155deg, #090914 0%, #12122e 50%, #0b1828 100%)",
            ].join(", "),
            backgroundSize: "72px 72px, 72px 72px, 100% 100%",
            top: "-15%",
            bottom: "-15%",
          }}
        />

        {/* Brand-blue radial accent — bottom-left this time for variety */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 15% 90%, rgba(16,12,158,0.18) 0%, transparent 65%)",
          }}
        />

        <Container className="relative z-10 pt-36 pb-16 lg:pt-40 lg:pb-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
            {/* Left — headline + copy */}
            <div className="flex-1 min-w-0">
              {/* Eyebrow */}
              <p className="about-fade font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 mb-8">
                About Archer Advisory
              </p>

              {/* Headline — word-split for stagger */}
              <h1
                className="text-white"
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 4.75rem)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.02em",
                }}
              >
                {PAGE_HEADLINE.map((line, li) => (
                  <span key={li} className="block">
                    {line.split(" ").map((word, wi, arr) => (
                      <span
                        key={wi}
                        className="about-word inline-block"
                        style={{ marginRight: wi < arr.length - 1 ? "0.3em" : 0 }}
                      >
                        {word}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>

              {/* Intro line */}
              <p className="about-fade mt-8 max-w-xl text-lg text-white/58 leading-relaxed">
                We are not a general accounting firm that happens to serve law firms. We are accountants
                and compliance advisors who have spent our entire careers inside the legal industry.
              </p>
            </div>

            {/* Right — interactive globe */}
            <div className="about-fade shrink-0 w-full lg:w-[420px] xl:w-[460px] hidden lg:block">
              <GlobePulse
                markers={[{ id: "ontario", location: [43.65, -79.38], delay: 0 }]}
                speed={0.003}
                className="opacity-90"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. FIRM STORY
          White, two-column editorial layout.
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 bg-white">
        <Container>
          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 lg:gap-24">

            {/* Left — heading */}
            <div className="js-reveal">
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-7">
                Our Story
              </p>
              <h2 className="text-ink" style={{ lineHeight: 1.06 }}>
                Founded to serve one client: the law firm.
              </h2>
              <div className="js-milestones mt-10 space-y-1">
                {MILESTONES.map(({ year, event }) => (
                  <div
                    key={year}
                    className="js-milestone flex items-start gap-5 py-4 border-t border-ink/8 first:border-t-0"
                  >
                    <span className="font-heading font-bold text-sm text-brand-orange shrink-0 pt-0.5 w-10">
                      {year}
                    </span>
                    <span className="text-sm text-ink/55 leading-relaxed">
                      {event}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — body copy + pull quote */}
            <div className="js-reveal space-y-6">
              <p className="text-base text-ink/70 leading-relaxed">
                Archer Advisory was established by practitioners who had spent careers inside the
                legal industry — not as lawyers, but as the financial and compliance professionals
                working alongside them. We witnessed first-hand how traditional accounting firms
                struggled to meet the specific, demanding requirements of legal practice: the ethics
                of client trust accounts, the complexity of matter-level billing, and the heightened
                scrutiny of bar associations and regulators.
              </p>
              <p className="text-base text-ink/70 leading-relaxed">
                We founded Archer to close that gap. Our practice is built entirely around the law
                firm — its billing rhythms, its compliance obligations, its fiduciary duties. We hold
                ourselves to the same standard we demand of our clients: precision in every figure,
                clarity in every report, and rigour in every decision.
              </p>

              {/* Pull quote */}
              <figure
                className="js-story-quote my-10 pl-7 border-l-2 border-brand-orange"
              >
                <blockquote className="font-heading font-semibold text-xl text-ink leading-snug" style={{ letterSpacing: "-0.01em" }}>
                  &ldquo;We built Archer on a simple premise: law firms deserve the same calibre of
                  financial counsel that their clients receive in the courtroom.&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-ink/45 font-body">
                  — James R. Whitmore, Managing Partner
                </figcaption>
              </figure>

              <p className="text-base text-ink/70 leading-relaxed">
                Today, Archer serves law firms across the country, from boutique practices to
                regional powerhouses. Our measure of success is not the size of our client roster
                but the depth of our client relationships — and the confidence our clients feel when
                they walk into an audit, a bar review, or a partner meeting.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. CORE VALUES
          Sand surface — three numbered cards with staggered entrance.
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 bg-brand-sand">
        <Container>
          <div className="js-reveal text-center mb-16">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-6">
              Core Values
            </p>
            <h2 className="text-ink" style={{ lineHeight: 1.06 }}>
              What we stand for.
            </h2>
            <p className="mt-6 text-base text-ink/58 max-w-xl mx-auto leading-relaxed">
              Three principles govern every engagement, every client conversation, and every
              decision we make at Archer.
            </p>
          </div>

          <div className="js-values-grid grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.name}
                className="js-value-card bg-white rounded-xl p-9 flex flex-col"
                style={{ boxShadow: "0 2px 20px rgba(26,26,26,0.055)" }}
              >
                {/* Number + decorative rule */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-heading font-bold text-3xl text-ink/10 leading-none">
                    {v.n}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex-1 h-px bg-ink/10"
                  />
                </div>

                <h3
                  className="font-heading font-bold text-ink mb-4"
                  style={{ fontSize: "1.4rem", lineHeight: 1.1 }}
                >
                  {v.name}
                </h3>
                <p className="text-sm text-ink/60 leading-relaxed flex-1">{v.body}</p>

                {/* Orange accent at the bottom */}
                <div className="mt-8 w-8 h-0.5 bg-brand-orange" aria-hidden="true" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. STATS BAND
          Identical markup + animation to Home — dark ink, count-up.
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
                  0{suffix}
                </p>
                <p className="mt-3 text-sm text-white/45 font-body leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. TEAM
          White section, 4-up grid of placeholder member cards.
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 bg-white">
        <Container>
          <div className="js-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-5">
                Our Team
              </p>
              <h2 className="text-ink max-w-xs" style={{ lineHeight: 1.06 }}>
                The people behind Archer.
              </h2>
            </div>
            <p className="text-sm text-ink/45 max-w-xs leading-relaxed">
              Senior practitioners, every one. At Archer, client relationships are managed by
              the advisors who signed the engagement — not delegated to juniors.
            </p>
          </div>

          <div className="js-team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="js-team-card group">
                {/* Photo placeholder */}
                <div
                  className={`relative aspect-[3/4] rounded-xl overflow-hidden mb-5 bg-gradient-to-br ${member.accent}`}
                >
                  {/* Subtle architectural grid overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      backgroundImage: [
                        "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
                        "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                      ].join(", "),
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Initials watermark */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-5 right-5 font-heading font-bold text-white/10 select-none"
                    style={{ fontSize: "5rem", lineHeight: 1 }}
                  >
                    {member.initials}
                  </span>

                  {/* Bottom gradient for name overlap */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-24"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
                    }}
                  />
                </div>

                {/* Name + role */}
                <p className="font-heading font-semibold text-base text-ink leading-tight mb-1">
                  {member.name}
                </p>
                <p className="font-heading text-xs font-semibold uppercase tracking-wider text-brand-orange mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-ink/55 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>


    </div>
  );
}
