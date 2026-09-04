import type { Metadata, Viewport } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/meta/structured-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manual.cssi.kbvalbury.com"),
  title: {
    default: "CSSI Manual Book — KB Valbury User Documentation",
    template: "%s | CSSI Manual Book",
  },
  description:
    "Complete user manual for the CSSI application ecosystem by KB Valbury. Covers Portal, CRM, Flowra, Daily Operation, ITQM, and Intranet applications.",
  keywords: [
    "CSSI",
    "KB Valbury",
    "manual",
    "documentation",
    "portal",
    "CRM",
    "Flowra",
    "daily operation",
    "ITQM",
    "intranet",
    "user guide",
    "help",
  ],
  authors: [{ name: "KB Valbury" }],
  creator: "KB Valbury",
  publisher: "KB Valbury",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manual.cssi.kbvalbury.com",
    siteName: "CSSI Manual Book",
    title: "CSSI Manual Book — KB Valbury User Documentation",
    description:
      "Complete user manual for the CSSI application ecosystem by KB Valbury.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CSSI Manual Book",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSSI Manual Book — KB Valbury User Documentation",
    description:
      "Complete user manual for the CSSI application ecosystem by KB Valbury.",
    images: ["/og-image.png"],
    creator: "@kbvalbury",
  },
  alternates: {
    canonical: "https://manual.cssi.kbvalbury.com/en/docs",
    languages: {
      "en-US": "https://manual.cssi.kbvalbury.com/en/docs",
      "id-ID": "https://manual.cssi.kbvalbury.com/id/docs",
      "ko-KR": "https://manual.cssi.kbvalbury.com/ko/docs",
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
    ],
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f1a" },
  ],
  colorScheme: "light dark",
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={inter.variable}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-background min-h-screen text-foreground antialiased">
        <StructuredData />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
