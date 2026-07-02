import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Archer Advisory — specialist legal accountants with deep law-society compliance expertise, serving law firms across the country.",
  openGraph: {
    title: "About — Archer Advisory",
    description:
      "Specialist legal accountants with deep law-society compliance expertise, serving law firms across the country.",
    url: "/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
