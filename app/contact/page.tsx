import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a confidential consultation with Archer Advisory or send us a message. We work exclusively with law firms on trust accounting, compliance, and financial management.",
  openGraph: {
    title: "Contact — Archer Advisory",
    description:
      "Book a confidential consultation or send a message. No obligation, no sales process.",
    url: "/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
