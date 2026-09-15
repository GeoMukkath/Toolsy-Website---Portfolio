import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import ScrollRuler from "@/components/ScrollRuler";
import DeskTools from "@/components/DeskTools";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://toolsy.online";
const SITE_NAME = "Geo Mukkath — AI-Native Product Manager";
const SITE_TITLE = "Geo Mukkath | AI-Native Product Manager (toolsy.online)";
const SITE_DESCRIPTION =
  "Official website of Geo Mukkath — AI-native product manager building everyday tools people use at work. User empathy + AI fluency, prototyped and shipped with AI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Geo Mukkath",
  },
  description: SITE_DESCRIPTION,
  applicationName: "toolsy.online",
  keywords: [
    "Geo Mukkath",
    "Geo Mukkath product manager",
    "Geo Mukkath AI",
    "toolsy.online",
    "AI-native product manager",
    "AI product manager",
    "product manager portfolio",
    "AI prototyping",
    "LLM product management",
  ],
  creator: "Geo Mukkath",
  authors: [{ name: "Geo Mukkath", url: SITE_URL }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "toolsy.online",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Geo Mukkath",
      alternateName: ["Geo M. Mukkath", "G. Mukkath"],
      givenName: "Geo",
      familyName: "Mukkath",
      url: SITE_URL,
      email: "mailto:geomukkath@yandex.com",
      jobTitle: "AI-Native Product Manager",
      description:
        "Geo Mukkath is an AI-native product manager who builds everyday tools people use at work, combining user empathy with AI fluency.",
      knowsAbout: [
        "AI-native product management",
        "AI prototyping",
        "LLM integration",
        "Prompt engineering",
        "User empathy",
        "Rapid iteration",
      ],
      sameAs: [
        "https://www.linkedin.com/in/geomukkath",
        "https://quickshapes.toolsy.online",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: "Toolsy",
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} antialiased`}>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <ScrollRuler />
        <DeskTools />
      </body>
    </html>
  );
}
