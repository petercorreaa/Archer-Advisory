"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { BlogCard } from "@/components/blog/BlogCard";
import { gsap } from "@/lib/gsap";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/date";

// Per-category cover styles (same map as BlogCard)
const COVER_STYLES: Record<string, React.CSSProperties> = {
  Compliance: {
    backgroundImage: [
      "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
      "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
      "linear-gradient(145deg, #080d1e 0%, #101840 60%, #0a1020 100%)",
    ].join(", "),
    backgroundSize: "64px 64px, 64px 64px, 100% 100%",
  },
  "Trust Accounting": {
    backgroundImage: [
      "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
      "linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
      "linear-gradient(145deg, #090914 0%, #12122e 45%, #0b1828 100%)",
    ].join(", "),
    backgroundSize: "72px 72px, 72px 72px, 100% 100%",
  },
  "Practice Management": {
    backgroundImage: [
      "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)",
      "linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
      "linear-gradient(145deg, #120a06 0%, #241408 60%, #100c0a 100%)",
    ].join(", "),
    backgroundSize: "80px 80px, 80px 80px, 100% 100%",
  },
};
const DEFAULT_COVER: React.CSSProperties = {
  backgroundImage: "linear-gradient(145deg, #0c0c18 0%, #1a1a2e 100%)",
};

type Props = {
  post: PostMeta;
  related: PostMeta[];
  children: ReactNode; // rendered MDX from server
};

export function PostPageClient({ post, related, children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const coverStyle = COVER_STYLES[post.category] ?? DEFAULT_COVER;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero entrance
        gsap
          .timeline({ delay: 0.1 })
          .fromTo(
            ".post-hero-fade",
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power2.out" }
          );

        // Hero cover parallax
        gsap.to(".post-hero-bg", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: ".js-post-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Article body fade in
        gsap.fromTo(
          ".js-post-body",
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".js-post-body",
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );

        // Related cards stagger
        gsap.fromTo(
          ".js-related-card",
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".js-related-section",
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".post-hero-fade, .js-post-body, .js-related-card", {
          opacity: 1,
          y: 0,
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>

      {/* ── Article hero ───────────────────────────────────────────── */}
      <section
        className="js-post-hero relative flex items-end overflow-hidden"
        style={{ minHeight: "60vh" }}
      >
        {/* Cover gradient */}
        <div
          className="post-hero-bg absolute inset-0 will-change-transform"
          style={{ ...coverStyle, top: "-15%", bottom: "-15%" }}
        />
        {/* Dark fade from bottom so text is readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(9,9,20,0.88) 0%, rgba(9,9,20,0.4) 50%, transparent 100%)",
          }}
        />

        <Container className="relative z-10 pb-14 pt-36 lg:pb-16">
          {/* Back link */}
          <Link
            href="/blog"
            className="post-hero-fade inline-flex items-center gap-2 text-sm text-white/45
                       hover:text-white/75 transition-colors duration-200 mb-8 group"
          >
            <span aria-hidden="true" className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
            All posts
          </Link>

          {/* Category */}
          <p className="post-hero-fade font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-5">
            {post.category}
          </p>

          {/* Title */}
          <h1
            className="post-hero-fade text-white max-w-3xl"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
            }}
          >
            {post.title}
          </h1>

          {/* Author + date */}
          <div className="post-hero-fade flex items-center gap-4 mt-6 text-sm text-white/45">
            <span>{post.author}</span>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-white/25" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </Container>
      </section>

      {/* ── Article prose ─────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">

            {/* Main column */}
            <div className="js-post-body min-w-0 max-w-2xl">
              {children}
            </div>

            {/* Sidebar */}
            <aside className="js-post-body hidden lg:block">
              <div className="sticky top-[120px]">
                {/* Article meta card */}
                <div className="rounded-xl border border-ink/8 bg-brand-sand/50 p-6 mb-6">
                  <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35 mb-4">
                    About this article
                  </p>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-xs text-ink/35 font-body mb-0.5">Category</dt>
                      <dd className="text-sm font-heading font-semibold text-ink/75">{post.category}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-ink/35 font-body mb-0.5">Published</dt>
                      <dd className="text-sm font-heading font-semibold text-ink/75">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-ink/35 font-body mb-0.5">Author</dt>
                      <dd className="text-sm font-heading font-semibold text-ink/75">{post.author}</dd>
                    </div>
                  </dl>
                </div>

                {/* CTA */}
                <div className="rounded-xl bg-ink p-6 text-white">
                  <p className="font-heading font-bold text-white mb-2" style={{ fontSize: "0.95rem", lineHeight: 1.2 }}>
                    Need expert guidance?
                  </p>
                  <p className="text-xs text-white/55 leading-relaxed mb-5">
                    Speak to an Archer advisor about your firm's compliance and financial management.
                  </p>
                  <Button href="/contact" variant="ghost" size="sm" className="w-full justify-center">
                    Book a consultation
                  </Button>
                </div>
              </div>
            </aside>

          </div>
        </Container>
      </section>

      {/* ── Related posts ─────────────────────────────────────────── */}
      {related.length > 0 && (
        <section
          className="js-related-section bg-brand-sand py-16 lg:py-24"
        >
          <Container>
            <div className="flex items-center gap-4 mb-10">
              <span aria-hidden="true" className="w-6 h-px bg-brand-orange" />
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45">
                Related posts
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-3xl">
              {related.map((p) => (
                <div key={p.slug} className="js-related-card">
                  <BlogCard post={p} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}


    </div>
  );
}
