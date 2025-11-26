import type { Metadata } from 'next'; // Add for types
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/costume/navbar";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/costume/footer";
import { metadata } from "./data/metadata"; // Your separate metadata file
// import { SEO_CONFIG } from "./data/seo_data"; // Only if you need it here

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --------- SEO optimization ----------
// Re-export for Next.js to inject site-wide
export { metadata };

// Optional: Viewport export for mobile
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// ----------- Layout ----------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* Consolidated preconnects for perf */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Instrument Sans */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        
        {/* Jaro (Hackathon font) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Jaro:opsz@6..72&display=swap"
          rel="stylesheet"
        />
        
        {/* Righteous (Titles) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Righteous&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased no-scrollbar overflow-x-hidden`}
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem
        >
          <main>
            <NavBar />
            <div className="w-screen h-full">
              {children}
            </div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}