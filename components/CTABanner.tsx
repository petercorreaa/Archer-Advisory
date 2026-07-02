import Link from "next/link";
import { Container } from "@/components/Container";

export function CTABanner() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <Container>
        <div
          className="gradient-blue rounded-2xl overflow-hidden px-10 py-14 lg:px-16 lg:py-16"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
              "linear-gradient(135deg, #100c9e, #121b4e)",
            ].join(", "),
            backgroundSize: "72px 72px, 72px 72px, 100% 100%",
            boxShadow: "0 32px 64px rgba(16,12,158,0.25), 0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          {/* Radial accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 90% 50%, rgba(255,255,255,0.055) 0%, transparent 65%)",
            }}
          />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            {/* Left: copy */}
            <div className="max-w-2xl">
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 mb-5">
                Get Started
              </p>
              <h2
                className="text-white mb-4"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)", lineHeight: 1.08, letterSpacing: "-0.01em" }}
              >
                Ready to take control of your firm's finances?
              </h2>
              <p className="text-base lg:text-lg text-white/62 leading-relaxed">
                Book a free 30-minute consultation. No commitment — just clear answers
                from an advisor who understands law firm accounting.
              </p>
            </div>

            {/* Right: CTA */}
            <div className="shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full font-heading font-semibold text-base
                           bg-white text-ink px-8 py-4
                           hover:bg-white/90 transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#100c9e]"
              >
                Schedule now
                <span aria-hidden="true" className="text-brand-orange">→</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
