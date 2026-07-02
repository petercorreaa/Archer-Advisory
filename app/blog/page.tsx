import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogPage } from "@/components/blog/BlogPage";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical guidance on trust accounting, AML compliance, legal billing, and law firm financial management from the advisors at Archer Advisory.",
  openGraph: {
    title: "Insights — Archer Advisory",
    description:
      "Practical guidance on trust accounting, AML compliance, and law firm financial management.",
    url: "/blog",
  },
};

export default function Page() {
  const posts = getAllPosts();
  return <BlogPage posts={posts} />;
}
