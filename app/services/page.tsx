import type { Metadata } from "next";
import { ServicesPage } from "@/components/services/ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Trust accounting, legal billing, data analytics, workflow automation, and compliance advisory — purpose-built financial services for law firms.",
  openGraph: {
    title: "Services — Archer Advisory",
    description:
      "Trust accounting, legal billing, data analytics, workflow automation, and compliance advisory for law firms.",
    url: "/services",
  },
};

export default function Page() {
  return <ServicesPage />;
}
