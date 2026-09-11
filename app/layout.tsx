import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { homeCopy, site } from "@/data/site";
import { organizationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/ui/MotionProvider";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

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
      className={`${manrope.variable} ${jakarta.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
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
