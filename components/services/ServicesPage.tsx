"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// ── Static data ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    n: "01",
    title: "Trust Accounting & Reconciliation",
    description:
      "Comprehensive daily, monthly, and quarterly reconciliation services keeping your IOLTA and client trust accounts perpetually audit-ready. We work within your practice management system to reconcile matter-level balances to the day.",
    outcomes: [
      "Daily three-way reconciliations (bank × ledger × matter balances)",
      "IOLTA compliance across all trust and escrow accounts",
      "Matter-level trust transaction reporting",
      "Audit-ready workpapers prepared quarterly",
      "Bar association examination support and representation",
      "Client disbursement tracking and historical reporting",
    ],
    imgUrl: "https://images.unsplash.com/photo-1707157284454-553ef0a4ed0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "02",
    title: "Legal Billing & Matter Management",
    description:
      "End-to-end billing oversight from timekeeper rate setting to LEDES e-billing submission and collections follow-up. We integrate with your DMS and practice management platform to eliminate billing friction and capture revenue that would otherwise be written off.",
    outcomes: [
      "Timekeeper rate analysis and market benchmarking",
      "LEDES e-billing setup and client portal management",
      "Pre-bill review workflows and write-down tracking",
      "Collections ageing reports and follow-up protocols",
      "Matter profitability analysis per engagement",
      "WIP and accounts receivable dashboard reporting",
    ],
    imgUrl: "https://images.unsplash.com/photo-1775144657566-e5b093073baf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "03",
    title: "Data Analytics & Reporting",
    description:
      "Custom financial intelligence built for law firm leadership — from practice group profitability to partner compensation models. We build the dashboards your managing partner can actually use and the reports your finance committee can act on.",
    outcomes: [
      "Custom KPI frameworks for firm management reporting",
      "Profitability analysis by matter, client, and practice group",
      "Utilisation and realisation rate dashboards",
      "Partner compensation and equity draw modelling",
      "Year-over-year trend analysis and revenue forecasting",
      "Presentation-ready boardroom reporting packs",
    ],
    imgUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "04",
    title: "Workflow Automation",
    description:
      "Integration-led automation connecting your practice management, accounting, billing, and compliance systems. We design and implement the workflows that eliminate manual handoffs, reduce reconciliation errors, and free your staff for higher-value work.",
    outcomes: [
      "Practice management ↔ accounting integration (Clio, MyCase, Cosmolex)",
      "Automated trust account reconciliation workflows",
      "E-billing submission automation for LEDES clients",
      "Document generation and engagement letter automation",
      "Compliance alert and exception reporting systems",
      "Staff onboarding support and system training documentation",
    ],
    imgUrl: "https://images.unsplash.com/photo-1762340277219-17cba0c9bca0?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

const COMPLIANCE_PILLARS = [
  {
    title: "Conflict Check Frameworks",
    body: "We design and implement comprehensive conflict identification processes — integrating with your practice management system to run automated matter-level checks against your existing client and adverse-party database. We also advise on the policies governing how flagged conflicts are evaluated, documented, and resolved.",
    detail: [
      "Automated intake conflict screening",
      "Adverse-party database configuration",
      "Escalation and waiver documentation protocols",
      "Periodic portfolio conflict review",
    ],
  },
  {
    title: "AML & Know-Your-Client Compliance",
    body: "Archer designs AML compliance programmes tailored to law firm operations — including client risk classification, enhanced due-diligence procedures, suspicious activity monitoring, and SAR filing protocols. We are conversant with FATF guidance and domestic bar obligations specific to legal professionals.",
    detail: [
      "Client risk tier classification framework",
      "Enhanced due-diligence procedures for high-risk matters",
      "Suspicious activity monitoring and SAR filing",
      "Ongoing AML training for fee-earners and staff",
    ],
  },
  {
    title: "Trust Account Ethics & Bar Compliance",
    body: "Beyond the numbers, we advise on the ethical duties that govern your trust accounts — from the permissible uses of client funds to the precise record-keeping obligations imposed by your state bar. We represent firms during bar association financial examinations and prepare the supporting workpapers.",
    detail: [
      "Ethics-of-trust-accounts advisory and training",
      "Bar examination preparation and workpaper assembly",
      "Safekeeping rule compliance review",
      "Client funds usage and disbursement advisory",
    ],
  },
  {
    title: "Regulatory Filings & Reporting",
    body: "Law firms face a growing body of mandatory financial disclosure and reporting obligations — from state bar annual financial reports to FATCA and FBAR requirements on foreign accounts. Archer prepares and files these on your behalf, ensuring accuracy and meeting all deadlines.",
    detail: [
      "State bar annual financial reporting",
      "FATCA/FBAR disclosure for foreign account holders",
      "Trust account overdraft notification procedures",
      "Regulatory correspondence and examination support",
    ],
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Discovery & Assessment",
    headline: "We begin by listening.",
    body: "Our first engagement is a comprehensive review of your firm's current financial processes, technology stack, compliance posture, and reporting gaps. We interview your finance team, review your chart of accounts, examine your reconciliation history, and assess your compliance documentation — all before we propose a single change.",
    points: [
      "Structured interviews with finance team and managing partners",
      "Technology stack and integration audit",
      "Historical reconciliation and compliance gap analysis",
      "Risk-prioritised findings report delivered within 10 business days",
    ],
  },
  {
    n: "02",
    title: "Engagement Design",
    headline: "Bespoke, not templated.",
    body: "Based on our assessment, we design a service engagement tailored to your firm's scale, practice areas, and risk profile. We document the scope, deliverables, timelines, and success criteria — and you review and approve everything before we begin. No scope creep. No surprises.",
    points: [
      "Service scope document and deliverable schedule",
      "Technology integration plan and system access requirements",
      "Engagement letter with clear KPIs and reporting cadence",
      "Dedicated senior advisor assigned before engagement start",
    ],
  },
  {
    n: "03",
    title: "Implementation & Integration",
    headline: "Inside your systems, not alongside them.",
    body: "Our advisors work directly within your existing systems — your practice management platform, your accounting software, your document management system. We do not ask you to adopt new tools to suit our workflow. We adapt to yours, then improve it from within.",
    points: [
      "Direct integration with Clio, MyCase, Cosmolex, QuickBooks, Xero",
      "Live reconciliation walkthroughs with your finance team",
      "Process documentation and standard operating procedures",
      "Phased implementation with quality checkpoints at each stage",
    ],
  },
  {
    n: "04",
    title: "Ongoing Advisory",
    headline: "A partner, not a service ticket.",
    body: "A dedicated senior Archer advisor is assigned to your firm for the life of the engagement. You will speak to the same person at every monthly review — someone who knows your accounts, your partners, and your history. Proactive alerts, quarterly strategic reviews, and 24/7 availability for urgent compliance matters.",
    points: [
      "Named senior advisor for the life of the engagement",
      "Monthly reporting and management accounts delivery",
      "Quarterly strategic review with managing partners",
      "24/7 access for urgent compliance and trust account queries",
    ],
  },
];

const PAGE_HEADLINE = ["Every service your firm", "needs. Nothing it doesn't."];

// ── Component ──────────────────────────────────────────────────────────────

export function ServicesPage() {
  const rootRef        = useRef<HTMLDivElement>(null);
  const processOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const processOuter = processOuterRef.current;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Full-motion ──────────────────────────────────────────────────
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Page header — word stagger
        gsap
          .timeline({ delay: 0.15 })
          .fromTo(
            ".svc-word",
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.048, duration: 0.7, ease: "power2.out" }
          )
          .fromTo(
            ".svc-fade",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.65, ease: "power2.out" },
            "-=0.25"
          );

        // Page header background parallax
        gsap.to(".svc-hero-bg", {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: ".js-svc-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Section reveals — scrub 1 (same cadence as Home/About)
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

        // Service image panel parallax — inner div moves inside clipped outer
        gsap.utils.toArray<HTMLElement>(".js-svc-img-inner").forEach((inner) => {
          gsap.to(inner, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: inner.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        // Service text columns — alternate slide direction
        gsap.utils.toArray<HTMLElement>(".js-svc-text").forEach((el) => {
          const dir = el.dataset.dir === "right" ? 32 : -32;
          gsap.fromTo(
            el,
            { x: dir, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // Compliance panel entrance (same as Home differentiator)
        gsap.fromTo(
          ".js-compliance-panel",
          { y: 56, opacity: 0, scale: 0.975 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".js-compliance-panel",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // Compliance pillar cards stagger
        gsap.fromTo(
          ".js-pillar-card",
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".js-pillars-grid",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // ── Pinned process section ───────────────────────────────────────
        // Capture element inside the callback so it's always current.
        const po = rootRef.current?.querySelector<HTMLElement>("[data-process-outer]");
        if (po) {
          const STEP_COUNT = PROCESS_STEPS.length;
          const activeIdx = { val: 0 };

          const panels   = po.querySelectorAll<HTMLElement>(".js-process-step");
          const navItems = po.querySelectorAll<HTMLElement>(".js-process-nav");
          panels.forEach((p, i)   => gsap.set(p, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 28 }));
          navItems.forEach((n, i) => gsap.set(n, { opacity: i === 0 ? 1 : 0.28 }));

          ScrollTrigger.create({
            trigger: po,
            start: "top top",
            end: "bottom bottom",
            invalidateOnRefresh: true,
            onUpdate: ({ progress }) => {
              const newIdx = Math.min(Math.floor(progress * STEP_COUNT), STEP_COUNT - 1);
              if (newIdx === activeIdx.val) return;

              const prev = activeIdx.val;
              activeIdx.val = newIdx;
              const dir = newIdx > prev ? 1 : -1;

              if (panels[prev])    gsap.to(panels[prev], { opacity: 0, y: -24 * dir, duration: 0.3, ease: "power2.in" });
              if (panels[newIdx])  gsap.fromTo(
                panels[newIdx],
                { opacity: 0, y: 28 * dir },
                { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", delay: 0.15 }
              );

              navItems.forEach((n, i) =>
                gsap.to(n, { opacity: i === newIdx ? 1 : 0.28, duration: 0.3 })
              );

              const fill = po.querySelector<HTMLElement>(".js-process-bar-fill");
              if (fill) gsap.to(fill, { scaleX: (newIdx + 1) / STEP_COUNT, duration: 0.4, ease: "power2.inOut" });
            },
          });
        }
      });

      // ── Reduced-motion: snap all animated targets to final state ──────
      // (CSS handles the process section layout collapse via globals.css)
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".svc-word, .svc-fade, .js-reveal, .js-svc-text, .js-compliance-panel, .js-pillar-card, .js-process-step, .js-process-nav",
          { opacity: 1, y: 0, x: 0, scale: 1 }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>

      {/* ═══════════════════════════════════════════════════════════════
          1. PAGE HEADER
      ══════════════════════════════════════════════════════════════════ */}
      <section className="js-svc-hero relative flex items-center overflow-hidden" style={{ minHeight: "58vh" }}>
        <div
          className="svc-hero-bg absolute inset-0 will-change-transform"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
              "linear-gradient(155deg, #090914 0%, #12122e 50%, #0a1420 100%)",
            ].join(", "),
            backgroundSize: "72px 72px, 72px 72px, 100% 100%",
            top: "-15%",
            bottom: "-15%",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 65% at 85% 15%, rgba(16,12,158,0.2) 0%, transparent 65%)" }}
        />
        <Container className="relative z-10 pt-36 pb-16 lg:pt-40 lg:pb-20">
          <p className="svc-fade font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 mb-8">
            Services
          </p>
          <h1
            className="text-white max-w-4xl"
            style={{ fontSize: "clamp(2.8rem, 6vw, 4.75rem)", lineHeight: 1.06, letterSpacing: "-0.02em" }}
          >
            {PAGE_HEADLINE.map((line, li) => (
              <span key={li} className="block">
                {line.split(" ").map((word, wi, arr) => (
                  <span key={wi} className="svc-word inline-block" style={{ marginRight: wi < arr.length - 1 ? "0.3em" : 0 }}>
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="svc-fade mt-8 max-w-xl text-lg text-white/58 leading-relaxed">
            Purpose-built financial and compliance services for law firms — each one designed around
            the specific obligations, rhythms, and risks of legal practice.
          </p>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. CORE SERVICES — 4 alternating rows
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white">
        {SERVICES.map((svc, i) => {
          const isEven = i % 2 === 0; // even → text left, image right
          return (
            <div
              key={svc.n}
              className="border-t border-ink/8 py-20 lg:py-28"
            >
              <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                  {/* Text column */}
                  <div
                    className={`js-svc-text ${!isEven ? "lg:col-start-2 lg:row-start-1" : ""}`}
                    data-dir={isEven ? "left" : "right"}
                  >
                    {/* Service number */}
                    <div className="mb-3">
                      <span className="font-heading font-bold text-2xl text-ink/20">{svc.n}</span>
                    </div>

                    <h2
                      className="text-ink mb-5"
                      style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)", lineHeight: 1.1 }}
                    >
                      {svc.title}
                    </h2>
                    <p className="text-base text-ink/65 leading-relaxed mb-8">{svc.description}</p>

                    {/* Outcome bullets */}
                    <ul className="space-y-3 mb-10">
                      {svc.outcomes.map((out) => (
                        <li key={out} className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 w-4 h-4 rounded-full border border-brand-orange/40 flex items-center justify-center shrink-0"
                          >
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                              <path d="M1 3l2 2 4-4" stroke="#CF432B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span className="text-sm text-ink/65 leading-relaxed">{out}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-brand-orange
                                 border-b border-brand-orange/30 pb-0.5 hover:border-brand-orange
                                 transition-colors duration-200"
                    >
                      Discuss this service <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  {/* Image column */}
                  <div
                    className={`js-svc-text ${!isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}
                    data-dir={isEven ? "right" : "left"}
                  >
                    <div
                      className="relative overflow-hidden rounded-2xl"
                      style={{ height: "clamp(320px, 45vw, 560px)" }}
                    >
                      <div
                        className="js-svc-img-inner absolute inset-x-0 will-change-transform"
                        style={{
                          top: "-15%", bottom: "-15%",
                          backgroundImage: `url(${svc.imgUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      {/* Service label watermark */}
                      <div className="absolute bottom-6 left-6">
                        <span
                          aria-hidden="true"
                          className="font-heading font-bold text-white/20 select-none"
                          style={{ fontSize: "4rem", lineHeight: 1 }}
                        >
                          {svc.n}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </Container>
            </div>
          );
        })}
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. COMPLIANCE ADVISORY — sand + blue gradient (the differentiator)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 bg-brand-sand">
        <Container>

          {/* Section intro */}
          <div className="js-reveal grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-20 mb-16">
            <div>
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-5">
                Compliance Advisory
              </p>
              <h2 className="text-ink" style={{ lineHeight: 1.06 }}>
                Beyond accounting. Into compliance.
              </h2>
            </div>
            <div className="flex items-center">
              <p className="text-base text-ink/65 leading-relaxed">
                Most accounting firms stop at the numbers. Archer goes further — advising your firm
                on the compliance obligations that sit alongside your financial management. This is
                the service that sets us apart, and the one our clients value most.
              </p>
            </div>
          </div>

          {/* Gradient panel */}
          <div
            className="js-compliance-panel gradient-blue rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 40px 80px rgba(16,12,158,0.28), 0 8px 24px rgba(0,0,0,0.18)" }}
          >
            {/* Panel header */}
            <div className="px-10 lg:px-16 pt-12 lg:pt-14 pb-10 border-b border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                <div>
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 mb-5">
                    Our Differentiator
                  </p>
                  <h3
                    className="text-white"
                    style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: 1.07 }}
                  >
                    Compliance beyond accounting.
                  </h3>
                </div>
                <p className="text-base text-white/65 leading-relaxed">
                  We advise on conflict checks, AML compliance programmes, trust account ethics, and
                  the regulatory decisions that expose firms to professional liability — areas no
                  standard accounting firm covers.
                </p>
              </div>
            </div>

            {/* Pillar cards grid */}
            <div className="js-pillars-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
              {COMPLIANCE_PILLARS.map((pillar) => (
                <div key={pillar.title} className="js-pillar-card bg-white/[0.04] p-10 lg:p-12">
                  <div className="w-6 h-px bg-white/30 mb-6" aria-hidden="true" />
                  <h4 className="font-heading font-semibold text-white mb-4" style={{ fontSize: "1.1rem", lineHeight: 1.2 }}>
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-white/60 leading-relaxed mb-6">{pillar.body}</p>
                  <ul className="space-y-2">
                    {pillar.detail.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-xs text-white/45">
                        <span aria-hidden="true" className="mt-0.5 text-white/30">—</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Panel footer CTA */}
            <div className="px-10 lg:px-16 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/10">
              <p className="text-sm text-white/55 max-w-lg leading-relaxed">
                All compliance advisory services are delivered by senior practitioners with direct
                law-society regulatory experience — not junior staff working from a checklist.
              </p>
              <Button href="/contact" variant="ghost" className="shrink-0">
                Schedule a compliance review
              </Button>
            </div>
          </div>

        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. HOW WE WORK — pinned scroll-driven progression
          Outer div holds the extra scroll space; inner div is sticky.
          GSAP fires step transitions via onUpdate.
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-t border-ink/8">
        {/* Outer: the scroll-space container */}
        <div
          ref={processOuterRef}
          data-process-outer
          style={{ height: `${PROCESS_STEPS.length * 100}vh` }}
        >
          {/* Sticky inner — occupies one viewport below the fixed header */}
          <div
            data-process-sticky
            className="sticky overflow-hidden flex flex-col"
            style={{ top: "120px", height: "calc(100vh - 120px)" }}
          >
            {/* Thin progress bar at the top */}
            <div className="shrink-0 h-px bg-ink/8">
              <div
                className="js-process-bar-fill h-full bg-brand-orange origin-left"
                style={{ transform: "scaleX(0.25)" }}
                aria-hidden="true"
              />
            </div>

            <Container className="flex-1 flex flex-col justify-center py-6">
              {/* Section label */}
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-6">
                How We Work
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-20">

                {/* Left: step navigation */}
                <div className="flex flex-col justify-center gap-4 lg:gap-6">
                  {PROCESS_STEPS.map((step, i) => (
                    <div
                      key={step.n}
                      className="js-process-nav flex items-center gap-4"
                    >
                      <span className="font-heading font-bold text-xs text-brand-orange/70 w-7 shrink-0">
                        {step.n}
                      </span>
                      <span className="font-heading font-semibold text-sm text-ink leading-snug">
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Right: step content — all stacked, GSAP shows one at a time */}
                <div className="relative" style={{ minHeight: "480px" }}>
                  {PROCESS_STEPS.map((step, i) => (
                    <div
                      key={step.n}
                      className={`js-process-step absolute inset-0 flex flex-col justify-center process-step-${i}`}
                    >
                      {/* Step number (large decorative) */}
                      <span
                        aria-hidden="true"
                        className="font-heading font-bold text-ink/[0.04] select-none mb-2"
                        style={{ fontSize: "6rem", lineHeight: 1.2 }}
                      >
                        {step.n}
                      </span>

                      <h3
                        className="font-heading font-bold text-ink mb-4"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", lineHeight: 1.1 }}
                      >
                        {step.headline}
                      </h3>
                      <p className="text-base text-ink/65 leading-relaxed mb-7 max-w-lg">
                        {step.body}
                      </p>
                      <ul className="space-y-2.5">
                        {step.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-3">
                            <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                            <span className="text-sm text-ink/60 leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

              </div>
            </Container>
          </div>
        </div>
      </section>


    </div>
  );
}
