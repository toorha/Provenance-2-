import type { Metadata } from "next";
import { Archivo, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/* Grotesque with engineering bones. Carries all body, UI and product text. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  axes: ["wdth"],
});

/* Sculptural display serif. Hero, a few section heads, key statements only. */
const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: "400",
});

/* Drafting-label mono. Small technical labels and figures only. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Provenance · the memory layer for commercial real estate",
  description:
    "Provenance keeps track of what is happening to a property now, preserves why decisions were made, and carries that context forward over time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${plexMono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
