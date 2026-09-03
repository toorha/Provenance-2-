import type { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

/* Pliant carries everything the product says: headings, body, UI, the
   tables. A variable grotesque with width and weight axes, so one file
   covers a 68px headline and a 12px table row. Self-hosted from the
   licensed release rather than a CDN. */
const pliant = localFont({
  src: "./fonts/Pliant.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

/* EB Garamond, for the marketing statements only. It has the weight to
   be set large without turning delicate, which is the whole reason a
   serif is here at all. */
const garamond = localFont({
  src: "./fonts/EBGaramond.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "400 800",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/* The technical voice, and only that: dates, revisions, source types,
   counts, timestamps. Never navigation, headlines or sentences. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

/* Inter carries the PRODUCT UI only — everything inside a Vera frame. The
   frame depicts software, and software has its own typeface; a real product
   screenshot would never be set in the marketing face. Keeping Pliant outside
   the frame and Inter inside is what makes the frame read as a different
   artefact rather than a styled table. Deviation from DESIGN.md §4.1. */
const productFont = Inter({
  subsets: ["latin"],
  variable: "--font-product",
  display: "swap",
  weight: ["400", "500", "600"],
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Helvetica Neue", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Provenance · Vera, the AI teammate for commercial real estate",
  description:
    "Vera works across development, leasing, asset management, operations, legal and planning, tracking the work and answering questions from the record. Everything Vera learns builds Provenance, the persistent memory of the property.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${pliant.variable} ${garamond.variable} ${plexMono.variable} ${productFont.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
