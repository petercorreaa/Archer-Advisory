"use client";

import { useEffect, useRef, useState } from "react";
import { InlineWidget } from "react-calendly";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { gsap } from "@/lib/gsap";

// Set NEXT_PUBLIC_CALENDLY_URL in .env.local — see .env.example
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/archer-advisory/consultation";

// ── Contact detail cards ──────────────────────────────────────────────────

const DETAILS = [
  {
    label: "Email",
    value: "hello@archeradvisory.com",
    href: "mailto:hello@archeradvisory.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="16" height="13" rx="2" />
        <path d="M2 7l8 5.5L18 7" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+1 (555) 000-0000",
    href: "tel:+15550000000",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 4a1 1 0 011-1h2.5a1 1 0 011 1l.8 3.2a1 1 0 01-.27 1L7 9.5a11 11 0 005.5 5.5l1.3-1.03a1 1 0 011-.27L18 14.5a1 1 0 011 1V18a1 1 0 01-1 1C8 19 1 12 1 4a1 1 0 011-1h1z" />
      </svg>
    ),
  },
  {
    label: "Office",
    value: "New York, NY",
    href: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2C7.24 2 5 4.24 5 7c0 4 5 10 5 10s5-6 5-10c0-2.76-2.24-5-5-5z" />
        <circle cx="10" cy="7" r="2" />
      </svg>
    ),
  },
  {
    label: "Response time",
    value: "Within one business day",
    href: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 5v5l3 3" />
      </svg>
    ),
  },
];

// ── Form state type ───────────────────────────────────────────────────────

type FormState = {
  name: string;
  email: string;
  firm: string;
  message: string;
};

const EMPTY_FORM: FormState = { name: "", email: "", firm: "", message: "" };

// ── Component ─────────────────────────────────────────────────────────────

export function ContactPage() {
  const rootRef  = useRef<HTMLDivElement>(null);
  const [form, setForm]         = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    // TODO: Wire to an API route or form service.
    // Example using an internal API route:
    //   await fetch("/api/contact", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(form),
    //   });
    // Example using Resend: https://resend.com/docs/send-with-nextjs
    // Example using Formspree: await fetch("https://formspree.io/f/<form-id>", ...)
    await new Promise((r) => setTimeout(r, 800)); // simulate latency
    setSending(false);
    setSubmitted(true);
    setForm(EMPTY_FORM);
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero word stagger + sub fade
        gsap
          .timeline({ delay: 0.15 })
          .fromTo(
            ".contact-word",
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.055, duration: 0.7, ease: "power2.out" }
          )
          .fromTo(
            ".contact-fade",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.65, ease: "power2.out" },
            "-=0.3"
          );

        // Hero bg parallax
        gsap.to(".contact-hero-bg", {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: ".js-contact-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Detail cards stagger
        gsap.fromTo(
          ".js-detail-card",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".js-details-grid",
              start: "top 84%",
              toggleActions: "play none none none",
            },
          }
        );

        // Calendly widget container
        gsap.fromTo(
          ".js-calendly-wrap",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".js-calendly-wrap",
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );

        // Form fields stagger
        gsap.fromTo(
          ".js-form-field",
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".js-form",
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".contact-word, .contact-fade, .js-detail-card, .js-calendly-wrap, .js-form-field",
          { opacity: 1, y: 0 }
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
      <section
        className="js-contact-hero relative flex items-center overflow-hidden"
        style={{ minHeight: "48vh" }}
      >
        <div
          className="contact-hero-bg absolute inset-0 will-change-transform"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
              "linear-gradient(160deg, #090914 0%, #0e0e2a 55%, #091520 100%)",
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
              "radial-gradient(ellipse 55% 65% at 85% 20%, rgba(16,12,158,0.18) 0%, transparent 65%)",
          }}
        />

        <Container className="relative z-10 pt-36 pb-16 lg:pt-40 lg:pb-20">
          <p className="contact-fade font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 mb-8">
            Contact
          </p>
          <h1
            className="text-white max-w-3xl"
            style={{
              fontSize: "clamp(2.6rem, 5.5vw, 4.25rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
            }}
          >
            {"Let's talk about your firm.".split(" ").map((word, i, arr) => (
              <span
                key={i}
                className="contact-word inline-block"
                style={{ marginRight: i < arr.length - 1 ? "0.28em" : 0 }}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="contact-fade mt-7 max-w-lg text-lg text-white/55 leading-relaxed">
            Book a confidential consultation directly in our calendar, or send us a message and
            we'll respond within one business day. No obligation, no sales process.
          </p>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. CONTACT DETAILS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20 border-b border-ink/6">
        <Container>
          <div
            className="js-details-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {DETAILS.map((d) => (
              <div
                key={d.label}
                className="js-detail-card flex items-start gap-4 p-5 rounded-xl border border-ink/8
                           bg-ink/[0.015] hover:border-ink/15 transition-colors duration-200"
              >
                <span className="mt-0.5 shrink-0 text-brand-orange">{d.icon}</span>
                <div className="min-w-0">
                  <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/30 mb-1.5">
                    {d.label}
                  </p>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="text-sm font-body text-ink/75 hover:text-brand-orange
                                 transition-colors duration-150 break-all
                                 focus-visible:outline-none focus-visible:ring-2
                                 focus-visible:ring-brand-orange/40 rounded-sm"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <p className="text-sm font-body text-ink/75">{d.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. CALENDLY INLINE WIDGET
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <Container>

          {/* Section label */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <span aria-hidden="true" className="w-6 h-px bg-brand-orange" />
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                Book a time
              </p>
            </div>
            <h2
              className="text-ink max-w-lg"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.1 }}
            >
              Schedule a free consultation
            </h2>
            <p className="mt-3 text-base text-ink/50 leading-relaxed max-w-md">
              Choose a time that works for you. The first conversation is always a no-obligation
              discovery call — typically 30 minutes.
            </p>
          </div>

          {/* Calendly widget */}
          {/* Set NEXT_PUBLIC_CALENDLY_URL in .env.local to your Calendly scheduling link */}
          <div
            className="js-calendly-wrap rounded-2xl overflow-hidden border border-ink/8
                       shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
          >
            <InlineWidget
              url={CALENDLY_URL}
              styles={{ minWidth: "320px", height: "700px" }}
              pageSettings={{
                backgroundColor: "ffffff",
                primaryColor:    "CF432B",
                textColor:       "1a1a1a",
                hideLandingPageDetails: true,
                hideEventTypeDetails:   false,
              }}
            />
          </div>

        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. MESSAGE FORM
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-brand-sand py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_560px] gap-12 lg:gap-20 items-start">

            {/* Left: copy */}
            <div className="lg:pt-3">
              <div className="flex items-center gap-4 mb-6">
                <span aria-hidden="true" className="w-6 h-px bg-brand-orange" />
                <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                  Send a message
                </p>
              </div>
              <h2
                className="text-ink mb-5"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.1 }}
              >
                Prefer to write? We're listening.
              </h2>
              <p className="text-base text-ink/58 leading-relaxed mb-8 max-w-sm">
                Describe your situation and we'll respond with a clear picture of how Archer can
                help — no pitch deck, no obligations.
              </p>

              {/* Confidentiality note */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/60 border border-ink/8 max-w-sm">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-brand-orange"
                  aria-hidden="true"
                >
                  <rect x="3" y="8" width="12" height="8" rx="2" />
                  <path d="M6 8V6a3 3 0 016 0v2" />
                  <circle cx="9" cy="12" r="1" />
                </svg>
                <p className="text-xs text-ink/50 leading-relaxed">
                  All enquiries are treated as strictly confidential. Information you share is used
                  only to respond to your enquiry.
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div>
              {submitted ? (
                /* ── Success state ── */
                <div className="bg-white rounded-2xl border border-ink/8 p-10 text-center
                                shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                  <div
                    className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center
                               justify-center mx-auto mb-5"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      stroke="#CF432B"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 11l5 5 9-9" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-ink mb-2" style={{ fontSize: "1.15rem" }}>
                    Message received
                  </h3>
                  <p className="text-sm text-ink/55 leading-relaxed mb-7">
                    Thank you — we'll review your message and respond within one business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-heading font-semibold text-brand-orange
                               border-b border-brand-orange/30 pb-0.5
                               hover:border-brand-orange transition-colors duration-200
                               focus-visible:outline-none focus-visible:ring-2
                               focus-visible:ring-brand-orange/40 rounded-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form
                  ref={null}
                  onSubmit={handleSubmit}
                  noValidate
                  className="js-form bg-white rounded-2xl border border-ink/8 p-8 lg:p-10
                             shadow-[0_4px_24px_rgba(0,0,0,0.06)] space-y-5"
                >

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="js-form-field">
                      <label
                        htmlFor="contact-name"
                        className="block font-heading font-semibold text-[11px] uppercase
                                   tracking-[0.14em] text-ink/45 mb-2"
                      >
                        Full name <span aria-hidden="true" className="text-brand-orange">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full h-11 px-4 rounded-lg border border-ink/15 bg-ink/[0.02]
                                   text-sm text-ink font-body placeholder:text-ink/25
                                   focus:outline-none focus:border-brand-orange/50
                                   focus:ring-2 focus:ring-brand-orange/15
                                   transition-colors duration-150"
                      />
                    </div>
                    <div className="js-form-field">
                      <label
                        htmlFor="contact-email"
                        className="block font-heading font-semibold text-[11px] uppercase
                                   tracking-[0.14em] text-ink/45 mb-2"
                      >
                        Email address <span aria-hidden="true" className="text-brand-orange">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@smithlaw.com"
                        className="w-full h-11 px-4 rounded-lg border border-ink/15 bg-ink/[0.02]
                                   text-sm text-ink font-body placeholder:text-ink/25
                                   focus:outline-none focus:border-brand-orange/50
                                   focus:ring-2 focus:ring-brand-orange/15
                                   transition-colors duration-150"
                      />
                    </div>
                  </div>

                  {/* Firm */}
                  <div className="js-form-field">
                    <label
                      htmlFor="contact-firm"
                      className="block font-heading font-semibold text-[11px] uppercase
                                 tracking-[0.14em] text-ink/45 mb-2"
                    >
                      Firm / organisation
                    </label>
                    <input
                      id="contact-firm"
                      name="firm"
                      type="text"
                      autoComplete="organization"
                      value={form.firm}
                      onChange={handleChange}
                      placeholder="Smith & Associates LLP"
                      className="w-full h-11 px-4 rounded-lg border border-ink/15 bg-ink/[0.02]
                                 text-sm text-ink font-body placeholder:text-ink/25
                                 focus:outline-none focus:border-brand-orange/50
                                 focus:ring-2 focus:ring-brand-orange/15
                                 transition-colors duration-150"
                    />
                  </div>

                  {/* Message */}
                  <div className="js-form-field">
                    <label
                      htmlFor="contact-message"
                      className="block font-heading font-semibold text-[11px] uppercase
                                 tracking-[0.14em] text-ink/45 mb-2"
                    >
                      Message <span aria-hidden="true" className="text-brand-orange">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your firm and what you're looking for help with…"
                      className="w-full px-4 py-3 rounded-lg border border-ink/15 bg-ink/[0.02]
                                 text-sm text-ink font-body placeholder:text-ink/25
                                 focus:outline-none focus:border-brand-orange/50
                                 focus:ring-2 focus:ring-brand-orange/15
                                 transition-colors duration-150 resize-y leading-relaxed"
                    />
                  </div>

                  {/* Submit */}
                  <div className="js-form-field pt-1 flex items-center justify-between gap-4">
                    <p className="text-xs text-ink/30 leading-relaxed">
                      <span aria-hidden="true" className="text-brand-orange">*</span> Required fields
                    </p>
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={sending}
                    >
                      {sending ? "Sending…" : "Send message"}
                    </Button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </Container>
      </section>

    </div>
  );
}
