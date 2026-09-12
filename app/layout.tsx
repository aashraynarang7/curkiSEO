import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { homeCopy, site } from "@/data/site";
import { organizationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/ui/MotionProvider";

// Inter is the face www.curki.ai renders its headings, body copy and buttons in, so it is the
// only family on this site too: display, body and label styles are all weights of the one font.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AI Associates for Workforce-Driven Organisations | Curki AI",
    template: "%s | Curki AI",
  },
  description: homeCopy.seo.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f1fc",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.language}
      data-scroll-behavior="smooth"
      className={inter.variable}
    >
      <head>
        {/*
          Pre-hides scroll-reveal targets before first paint so the deferred GSAP chunk can hide
          them without a visible flash. Only ever set when JS runs and the visitor has not asked
          for reduced motion, so content is never invisible without a tween coming to reveal it.
          GsapStage removes the attribute as soon as it owns the inline styles, and on failure.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches)" +
              "document.documentElement.setAttribute('data-gsap-armed','')}catch(e){}",
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div aria-hidden className="site-atmosphere" />
        <JsonLd data={organizationSchema()} />
        <SiteHeader />
        <MotionProvider>
          {/* overflow-x: clip keeps decorative orbs from causing sideways scroll without breaking sticky positioning. */}
          <main id="main" className="flex-1 overflow-x-clip">
            {children}
          </main>
        </MotionProvider>
        <SiteFooter />
      </body>
    </html>
  );
}
