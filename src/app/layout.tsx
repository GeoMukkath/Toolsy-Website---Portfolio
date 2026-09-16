import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import ScrollRuler from "@/components/ScrollRuler";
import DeskTools from "@/components/DeskTools";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_TITLE = "Geo Mukkath | AI-Native Product Manager (toolsy.online)";

export const viewport: Viewport = {
  themeColor: "#1a5fb4",
};

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
    "Geo Mukkath portfolio",
    "toolsy.online",
    "AI-native product manager",
    "AI product manager",
    "product manager portfolio",
    "AI prototyping",
    "LLM product management",
    "QuickShapes",
    "QuickShapes wireframing tool",
    "Geo Mukkath QuickShapes",
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
    type: "profile",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "toolsy.online",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Geo Mukkath — AI-Native Product Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      mainEntity: { "@id": `${SITE_URL}/#person` },
      publisher: { "@id": `${SITE_URL}/#person` },
    },
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
        "Wireframing tools",
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
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#quickshapes`,
      name: "QuickShapes",
      applicationCategory: "DesignApplication",
      operatingSystem: "Web",
      url: "https://quickshapes.toolsy.online",
      description:
        "QuickShapes is a minimalist wireframing tool for product teams, built by Geo Mukkath. Sketch UI ideas as fast as thinking them — no learning curve, no bloat.",
      author: { "@id": `${SITE_URL}/#person` },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
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
