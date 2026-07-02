import type { Metadata } from "next";
import { FAQPage } from "@/components/faq/FAQPage";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about trust accounting, AML compliance, conflict checks, law society reconciliation, and working with Archer Advisory.",
  openGraph: {
    title: "FAQ — Archer Advisory",
    description:
      "Common questions about trust accounting, AML compliance, conflict checks, and law society reconciliation — answered honestly.",
    url: "/faq",
  },
};

export default function Page() {
  return <FAQPage />;
}
