import type { Metadata, Viewport } from "next";
import { Fraunces, Newsreader, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Donor management, online giving, and donor stewardship — built for community nonprofits, not enterprise budgets.";

export const metadata: Metadata = {
  metadataBase: new URL("https://almonry.app"),
  title: "Almonry — Where generosity is kept",
  description,
  openGraph: {
    title: "Almonry — Where generosity is kept",
    description,
    type: "website",
    url: "https://almonry.app",
    siteName: "Almonry",
  },
  twitter: {
    card: "summary_large_image",
    title: "Almonry — Where generosity is kept",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#F2EBDC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${newsreader.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
