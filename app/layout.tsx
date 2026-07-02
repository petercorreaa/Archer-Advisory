import type { Metadata } from "next";
import { Libre_Franklin, Nunito } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Header } from "@/components/Header";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";

const libreFranklin = Libre_Franklin({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://archeradvisory.com";
const SITE_NAME = "Archer Advisory";
const DEFAULT_DESCRIPTION =
  "Trust accounting, AML compliance, legal billing, and financial management advisory — built exclusively for law firms.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s — ${SITE_NAME}`,
    default: `${SITE_NAME} — Legal Accounting & Compliance for Law Firms`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: `${SITE_NAME} — Legal Accounting & Compliance for Law Firms`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Legal Accounting & Compliance for Law Firms`,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreFranklin.variable} ${nunito.variable} h-full`}
    >
      <head>
        <meta name="theme-color" content="#090914" />
      </head>
      <body className="min-h-full flex flex-col font-body">
        <SmoothScrollProvider>
          <Header />
          {/*
           * pt-20 clears the fixed header (default py-5 ≈ ~72px).
           * Pages do not need to manage this offset themselves.
           */}
          <main className="flex-1">{children}</main>
          <CTABanner />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
