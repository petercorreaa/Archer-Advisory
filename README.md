# Archer Advisory

Marketing website for Archer Advisory — a boutique legal accounting and compliance firm serving law firms exclusively.

Built with **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**, **GSAP + Lenis**, and **next-mdx-remote** for MDX blog content.

---

## Local development

**Prerequisites:** Node.js 20+, npm 10+

```bash
# 1. Install dependencies
npm install

# 2. Copy env vars and fill in values
cp .env.example .env.local

# 3. Start the dev server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URL, no trailing slash. Used in sitemap, robots.txt, and OG metadata. |
| `NEXT_PUBLIC_CALENDLY_URL` | Contact page | Calendly scheduling link. Example: `https://calendly.com/your-username/consultation`. Create one at [calendly.com/event_types/new](https://calendly.com/event_types/new). |

On Vercel both can be set in **Settings → Environment Variables** before the first build.

---

## Editing content

### Blog posts

Posts live in `content/blog/` as `.mdx` files. Each file requires this frontmatter:

```mdx
---
title: "Your Post Title"
excerpt: "One or two sentence summary shown on the blog index card."
date: "2026-07-01"
author: "Archer Advisory"
category: "Compliance"
coverImage: ""
---

Your MDX content here. Standard Markdown plus React components.
```

Valid categories: `Compliance`, `Trust Accounting`, `Practice Management`. Adding a new category value is fine — it appears automatically in the filter on `/blog`.

**Adding a post:** Create a new `.mdx` file in `content/blog/`. The slug derives from the filename (`my-post.mdx` → `/blog/my-post`). No code change needed — `generateStaticParams` picks it up at build time.

**Editing a post:** Edit the `.mdx` file directly. Frontmatter drives the card, the article header, and the `<title>` / OG tags.

### FAQ

Questions and answers live in `content/faq.ts` as typed TypeScript objects:

```ts
{
  id: "unique-id",          // must be unique across all categories
  question: "Your question?",
  answer: "Full answer as a plain string.",
}
```

Add items to an existing `FAQCategory` in the `FAQ_CATEGORIES` array, or append a new category object. No restart needed in dev.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with Turbopack and fast refresh |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint |

---

## Deploy to Vercel

### Connect the GitHub repo

1. Push your code to a GitHub repository:

   ```bash
   git remote add origin https://github.com/your-org/archer-advisory.git
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new), click **Import Git Repository**, and select the repo. Vercel detects Next.js — leave the default build settings unchanged.

3. Before clicking **Deploy**, add environment variables under **Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` → your production domain, e.g. `https://archeradvisory.com`
   - `NEXT_PUBLIC_CALENDLY_URL` → your Calendly scheduling link

4. Click **Deploy**. The first build takes ~60 seconds.

From this point, every push to `main` triggers a production deployment automatically. Pull requests get unique preview URLs.

### Add a custom domain

1. Vercel dashboard → your project → **Settings → Domains → Add**
2. Enter your domain (e.g. `archeradvisory.com`)
3. Vercel gives you two DNS records to set at your registrar:

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

4. Create those records at your DNS provider. Vercel provisions TLS automatically once DNS propagates (up to 48 hours; usually under 30 minutes).
5. Update `NEXT_PUBLIC_SITE_URL` to the final domain and trigger a redeploy.

### Wire the contact form

The message form on `/contact` has a placeholder submit handler. To make it functional, choose one:

- **Resend** — create an API route at `app/api/contact/route.ts` and use the [Resend Next.js quickstart](https://resend.com/docs/send-with-nextjs). Add your `RESEND_API_KEY` as a secret env var (no `NEXT_PUBLIC_` prefix).
- **Formspree** — replace the `fetch` call in `components/contact/ContactPage.tsx` with `fetch("https://formspree.io/f/<your-form-id>", ...)`. No API route needed.
- **Custom API route** — uncomment the example in the `handleSubmit` function in `ContactPage.tsx` and implement `app/api/contact/route.ts`.

---

## Project structure

```
app/
  layout.tsx                Root layout — fonts, header, footer, metadata defaults
  page.tsx                  Home (/)
  about/page.tsx
  services/page.tsx
  faq/page.tsx
  blog/page.tsx             Blog index (/blog)
  blog/[slug]/page.tsx      Blog post — generateStaticParams + MDX render
  contact/page.tsx
  opengraph-image.tsx       Default OG image (1200×630) served from /opengraph-image
  sitemap.ts                /sitemap.xml — static routes + all blog slugs
  robots.ts                 /robots.txt
  globals.css               Brand foundation, focus styles, reduced-motion rules

components/
  Header.tsx                Sticky blur header, mobile overlay, active-link state
  Footer.tsx                Sand footer, partner logos, social icons
  Button.tsx                primary / outline / gradient / ghost variants
  Container.tsx             Max-width wrapper
  Section.tsx               Surface-aware section (white / sand)
  SmoothScrollProvider.tsx  Lenis smooth scroll + GSAP ScrollTrigger sync
  home/HomePage.tsx
  about/AboutPage.tsx
  services/ServicesPage.tsx
  faq/FAQPage.tsx
  blog/BlogPage.tsx         Card grid + category filter
  blog/BlogCard.tsx
  blog/PostPageClient.tsx   Post layout (client wrapper, accepts MDX as children)
  blog/mdxComponents.tsx    Styled MDX element map
  contact/ContactPage.tsx

content/
  blog/*.mdx                Blog posts (frontmatter + MDX body)
  faq.ts                    FAQ questions grouped by category

lib/
  blog.ts                   getAllPosts / getPostBySlug / getRelatedPosts
  date.ts                   formatDate (isolated — safe to import in client components)
  gsap.ts                   GSAP + ScrollTrigger registration, prefersReducedMotion()
  cn.ts                     clsx utility wrapper
  data.ts                   Shared STATS array (used by Home and About count-up)
```

---

## Accessibility

- All interactive elements have visible `:focus-visible` rings (2px brand orange, 3px offset)
- GSAP animations respect `prefers-reduced-motion` via `gsap.matchMedia()` on every page
- The process section on `/services` degrades to a static list on mobile (< 1024px) and under reduced-motion — both handled in `globals.css` with `!important` overrides beating GSAP inline styles
- FAQ accordion uses `button[aria-expanded]` + `div[role="region"][aria-labelledby]` — fully keyboard navigable
- Body text is `#1a1a1a` on white (contrast ~19:1); muted secondary text at `text-ink/65` is ~5.3:1 (passes WCAG AA)
