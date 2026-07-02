"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { gsap } from "@/lib/gsap";
import type { PostMeta } from "@/lib/blog";

const ALL = "All";

type Props = {
  posts: PostMeta[];
};

export function BlogPage({ posts }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const categories = [ALL, ...Array.from(new Set(posts.map((p) => p.category)))];
  const visible = activeCategory === ALL
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  // Entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ delay: 0.15 })
          .fromTo(
            ".blog-word",
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.055, duration: 0.7, ease: "power2.out" }
          )
          .fromTo(
            ".blog-fade",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out" },
            "-=0.3"
          );

        gsap.to(".blog-hero-bg", {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: ".js-blog-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".blog-word, .blog-fade", { opacity: 1, y: 0 });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Animate cards on mount + after filter change
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      grid.querySelectorAll<HTMLElement>(".js-blog-card").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const cards = grid.querySelectorAll<HTMLElement>(".js-blog-card");
    gsap.fromTo(
      cards,
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.55,
        ease: "power2.out",
      }
    );
  }, [visible]);

  return (
    <div ref={rootRef}>

      {/* ── Page header ─────────────────────────────────────────────── */}
      <section
        className="js-blog-hero relative flex items-center overflow-hidden"
        style={{ minHeight: "44vh" }}
      >
        <div
          className="blog-hero-bg absolute inset-0 will-change-transform"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
              "linear-gradient(158deg, #090914 0%, #0f0f26 55%, #081420 100%)",
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
              "radial-gradient(ellipse 50% 70% at 88% 18%, rgba(16,12,158,0.17) 0%, transparent 65%)",
          }}
        />

        <Container className="relative z-10 pt-36 pb-16 lg:pt-40 lg:pb-20">
          <p className="blog-fade font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 mb-8">
            Insights
          </p>
          <h1
            className="text-white max-w-2xl"
            style={{
              fontSize: "clamp(2.6rem, 5.5vw, 4.25rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
            }}
          >
            {"Perspectives on legal finance.".split(" ").map((word, i, arr) => (
              <span
                key={i}
                className="blog-word inline-block"
                style={{ marginRight: i < arr.length - 1 ? "0.28em" : 0 }}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="blog-fade mt-7 max-w-lg text-lg text-white/55 leading-relaxed">
            Practical guidance on trust accounting, compliance, billing, and the financial
            management of law firm practice.
          </p>
        </Container>
      </section>

      {/* ── Filter + grid ───────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <Container>

          {/* Category filter pills */}
          <div
            className="blog-fade flex flex-wrap gap-2 mb-12"
            role="group"
            aria-label="Filter by category"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  className={`
                    h-9 px-4 rounded-full border text-sm font-heading font-semibold
                    transition-all duration-200 focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-brand-orange/40 focus-visible:ring-offset-2
                    ${isActive
                      ? "bg-brand-orange text-white border-brand-orange"
                      : "border-ink/15 text-ink/55 hover:border-ink/30 hover:text-ink/80 bg-transparent"
                    }
                  `}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Posts grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {visible.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Empty state */}
          {visible.length === 0 && (
            <p className="text-center text-ink/35 py-20 text-sm font-body">
              No posts in this category yet.
            </p>
          )}

        </Container>
      </section>

    </div>
  );
}
