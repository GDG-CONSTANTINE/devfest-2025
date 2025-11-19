import type { Metadata } from 'next';
import { SEO_CONFIG } from './seo_data';


export const metadata: Metadata = {
  title: {
    default: SEO_CONFIG.title,
    template: '%s | GDG Constantine', // For sub-pages
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
  // Add Twitter if you have a handle (e.g., from socials)
  twitter: {
    card: 'summary_large_image',
    creator: '@GDGConstantine', // Add if available
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
  // Keywords for better ranking
  keywords: ['DevFest 2025', 'GDG Constantine', 'developer conference Algeria', 'Google tech workshops', 'AI cloud events'],
    icons: {
        icon: '/favicon.ico',
    },
};