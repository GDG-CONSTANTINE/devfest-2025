import type { Metadata } from 'next';
import { SEO_CONFIG } from './seo_data';

export const metadata: Metadata = {
  title: {
    default: SEO_CONFIG.title,
    template: '%s | GDG Constantine', // For sub-pages
  },
  icons: {
    icon: '/logo/icon-logo.svg',
    shortcut: '/logo/icon-logo.svg',
    apple: '/logo/icon-logo.svg',
  },
  description: SEO_CONFIG.description,
  metadataBase: new URL(SEO_CONFIG.canonical),
  alternates: {
    canonical: SEO_CONFIG.canonical,
  },
  openGraph: {
    ...SEO_CONFIG.openGraph,
    publishedTime: String(SEO_CONFIG.openGraph.publishedTime),
    authors: SEO_CONFIG.openGraph.authors,
  },
  // Twitter/X metadata
  twitter: {
    card: 'summary_large_image',
    site: '@GDGConstantine',
    creator: '@GDGConstantine',
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    images: [SEO_CONFIG.openGraph.images[0].url],
  },
  // Robots for SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Additional metadata for better SEO
  category: 'Technology Conference',
  authors: [{ name: 'GDG Constantine' }],
  creator: 'GDG Constantine',
  publisher: 'Google Developer Groups',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Verification tags (add when available)
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  // Keywords for better ranking
  keywords: [
    'DevFest Constantine 2025',
    'DevFest Algeria',
    'GDG Constantine',
    'Google Developer Conference Algeria',
    'tech conference Constantine',
    'developer conference Algeria',
    'Google Developers Group',
    'AI workshops Algeria',
    'Cloud computing conference',
    'web development workshops',
    'mobile development Algeria',
    'hackathon Constantine',
    'tech events Algeria 2025',
    'Hotel El-Khiam conference',
    'Google technology events',
    'developer community Algeria',
    'Android development',
    'Machine Learning workshops',
    'Flutter development',
    'Firebase workshops',
    'tech networking Algeria',
  ],
};
