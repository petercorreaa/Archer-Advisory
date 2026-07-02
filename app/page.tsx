import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Legal Accounting & Compliance for Law Firms",
  description:
    "Archer Advisory delivers trust accounting, AML compliance, legal billing, and financial management services built exclusively for law firms.",
  openGraph: {
    title: "Archer Advisory — Legal Accounting & Compliance for Law Firms",
    description:
      "Trust accounting, AML compliance, legal billing, and financial management advisory — built exclusively for law firms.",
    url: "/",
  },
};

export default function Page() {
  return <HomePage />;
}
