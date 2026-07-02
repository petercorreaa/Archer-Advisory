import Link from "next/link";
import { Container } from "@/components/Container";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const SERVICES = [
  "Tax Planning & Strategy",
  "Business Structuring",
  "Financial Advisory",
  "Regulatory Compliance",
  "Estate & Succession Planning",
  "Bookkeeping & Accounting",
];

const INTEGRATION_PARTNERS = [
  "Clio",
  "QuickBooks Online",
  "Xero",
  "Cosmolex",
  "NetSuite",
  "Sage Intacct",
];

export function Footer() {
  return (
    <footer className="bg-brand-sand text-ink">
      <Container className="py-16 lg:py-20">
        {/* Column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Firm blurb — spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-orange.png"
              alt="Archer Advisory"
              className="h-9 w-auto"
            />
            <p className="mt-4 text-sm text-ink/65 max-w-xs leading-relaxed">
              A boutique strategic advisory firm helping leadership teams navigate complex
              decisions with clarity and confidence. Fiduciary standards. Measurable outcomes.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialLink href="https://linkedin.com" label="LinkedIn">
                <LinkedInIcon />
              </SocialLink>
              <SocialLink href="https://x.com" label="X (Twitter)">
                <XIcon />
              </SocialLink>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-heading font-semibold text-xs uppercase tracking-widest text-ink/40 mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-ink/65 hover:text-ink transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-heading font-semibold text-xs uppercase tracking-widest text-ink/40 mb-5">
              Services
            </p>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-ink/65 hover:text-ink transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Integration partners */}
        <div className="mt-14 pt-10 border-t border-ink/10">
          <p className="font-heading font-semibold text-xs uppercase tracking-widest text-ink/40 mb-5">
            Integration Partners
          </p>
          <div className="flex flex-wrap gap-2">
            {INTEGRATION_PARTNERS.map((partner) => (
              <span
                key={partner}
                className="inline-flex items-center px-3 py-1.5 rounded border border-ink/15 bg-white/50
                           font-heading text-xs font-semibold text-ink/50"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-ink/45">
            © {new Date().getFullYear()} Archer Advisory. All rights reserved.
          </p>
          <p className="text-xs text-ink/60">
            All consultations are strictly confidential.{" "}
            <Link
              href="/contact"
              className="font-semibold text-brand-orange hover:underline underline-offset-2"
            >
              Schedule your free consultation →
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center rounded-full border border-ink/15
                 text-ink/50 hover:text-ink hover:border-ink/30 transition-colors duration-200"
    >
      {children}
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
