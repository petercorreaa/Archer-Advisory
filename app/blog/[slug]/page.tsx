import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { PostPageClient } from "@/components/blog/PostPageClient";
import { mdxComponents } from "@/components/blog/mdxComponents";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,  // layout template appends " — Archer Advisory"
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — Archer Advisory`,
      description: post.excerpt,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category);

  // Strip frontmatter-only meta props before passing to client
  const { content, ...postMeta } = post;

  return (
    <PostPageClient post={postMeta} related={related}>
      <MDXRemote source={content} components={mdxComponents} />
    </PostPageClient>
  );
}
