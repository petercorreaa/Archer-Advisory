import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="font-heading font-bold text-ink mt-10 mb-4"
      style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.7rem)", lineHeight: 1.12 }}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="font-heading font-semibold text-ink mt-8 mb-3"
      style={{ fontSize: "1.15rem", lineHeight: 1.18 }}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="font-heading font-semibold text-ink mt-6 mb-2"
      style={{ fontSize: "1rem", lineHeight: 1.2 }}
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p
      className="font-body text-ink/70 leading-[1.78] mb-5"
      style={{ fontSize: "1.0625rem" }}
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-5 space-y-2.5" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-5 space-y-2.5 list-decimal list-inside" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li
      className="flex items-start gap-3 font-body text-ink/70 leading-relaxed"
      style={{ fontSize: "1.0625rem" }}
      {...props}
    >
      <span
        aria-hidden="true"
        className="mt-[0.45em] w-1.5 h-1.5 rounded-full bg-brand-orange/60 shrink-0"
      />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-2 border-brand-orange/35 pl-6 my-8 italic text-ink/55"
      style={{ fontSize: "1.0625rem" }}
      {...props}
    >
      {children}
    </blockquote>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-ink/90" {...props}>
      {children}
    </strong>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-brand-orange underline underline-offset-2 decoration-brand-orange/40
                 hover:decoration-brand-orange transition-all duration-150"
      {...props}
    >
      {children}
    </a>
  ),
  hr: () => (
    <hr className="my-10 border-ink/10" aria-hidden="true" />
  ),
  code: ({ children, ...props }) => (
    <code
      className="font-mono text-sm bg-ink/[0.06] text-ink/80 rounded px-1.5 py-0.5"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="my-6 p-5 rounded-xl bg-ink/[0.04] border border-ink/8 overflow-x-auto text-sm font-mono text-ink/70"
      {...props}
    >
      {children}
    </pre>
  ),
};
