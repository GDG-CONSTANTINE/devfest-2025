import type { Metadata } from 'next';
import { SEO_CONFIG } from './seo_data';

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.canonical),

  title: {
    default: SEO_CONFIG.title,
    template: "%s | GDG Constantine",
  },

  description: SEO_CONFIG.description,

  icons: {
    icon: "/logo/icon-logo.svg",
    shortcut: "/logo/icon-logo.svg",
    apple: "/logo/icon-logo.svg",
  },

  alternates: {
    canonical: SEO_CONFIG.canonical,
  },

  openGraph: {
    url: SEO_CONFIG.openGraph.url,
    title: SEO_CONFIG.openGraph.title,
    description: SEO_CONFIG.openGraph.description,
    siteName: SEO_CONFIG.openGraph.siteName,
    type: "website",
    images: SEO_CONFIG.openGraph.images,
    // publishedTime: SEO_CONFIG.openGraph.publishedTime,
    // authors: SEO_CONFIG.openGraph.authors,
  },

  twitter: {
    card: "summary_large_image",
    site: "@GDGConstantine",
    creator: "@GDGConstantine",
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    images: [SEO_CONFIG.openGraph.images[0].url],
  },

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

  keywords: SEO_CONFIG.keywords,

  authors: [{ name: "GDG Constantine" }],
  creator: "GDG Constantine",
  publisher: "Google Developer Groups",

  category: "Technology Conference",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  verification: {
    // google: "",
    // yandex: "",
  },
};
