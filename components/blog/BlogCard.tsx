import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/date";

// Per-category cover styles — dark CSS gradient placeholders
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

const COVER_ACCENTS: Record<string, string> = {
  Compliance: "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(16,12,158,0.22) 0%, transparent 65%)",
  "Trust Accounting": "radial-gradient(ellipse 55% 60% at 70% 65%, rgba(12,60,140,0.18) 0%, transparent 65%)",
  "Practice Management": "radial-gradient(ellipse 55% 60% at 70% 70%, rgba(180,80,20,0.14) 0%, transparent 65%)",
};

const DEFAULT_COVER: React.CSSProperties = {
  backgroundImage: "linear-gradient(145deg, #0c0c18 0%, #1a1a2e 100%)",
};

type Props = {
  post: PostMeta;
  className?: string;
};

export function BlogCard({ post, className = "" }: Props) {
  const coverStyle = COVER_STYLES[post.category] ?? DEFAULT_COVER;
  const accentBg = COVER_ACCENTS[post.category] ?? "none";

  return (
    <article
      className={`js-blog-card group flex flex-col bg-white border border-ink/8 rounded-2xl
                  overflow-hidden hover:border-ink/18 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                  transition-all duration-300 ${className}`}
    >
      {/* Cover */}
      <Link
        href={`/blog/${post.slug}`}
        className="block relative overflow-hidden shrink-0"
        style={{ height: "200px" }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="absolute inset-0" style={coverStyle} />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: accentBg }}
        />
        {/* Category watermark */}
        <span
          aria-hidden="true"
          className="absolute bottom-4 right-4 font-heading font-bold text-white/[0.07] select-none"
          style={{ fontSize: "2.5rem", lineHeight: 1 }}
        >
          {post.category.charAt(0)}
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 lg:p-7">
        {/* Category badge */}
        <span
          className="inline-block self-start font-heading font-semibold text-[10px] uppercase
                     tracking-[0.18em] text-brand-orange bg-brand-orange/8 rounded-full
                     px-3 py-1 mb-4"
        >
          {post.category}
        </span>

        {/* Title */}
        <h2 className="font-heading font-bold text-ink mb-3 leading-snug line-clamp-3"
            style={{ fontSize: "1.05rem" }}>
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-brand-orange transition-colors duration-200
                       focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-brand-orange/40 focus-visible:ring-offset-2 rounded-sm"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-ink/55 leading-relaxed line-clamp-3 flex-1 mb-5">
          {post.excerpt}
        </p>

        {/* Meta footer */}
        <div className="flex items-center justify-between pt-4 border-t border-ink/6">
          <span className="text-xs text-ink/35 font-body">{post.author}</span>
          <time
            dateTime={post.date}
            className="text-xs text-ink/35 font-body"
          >
            {formatDate(post.date)}
          </time>
        </div>
      </div>
    </article>
  );
}
