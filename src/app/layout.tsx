import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/components/locale-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JsonLd } from "@/components/json-ld";
import {
  content,
  getAbsoluteUrl,
  getSiteUrl,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

const locale = content.defaultLocale;
const t = content.locales[locale];
const siteUrl = getSiteUrl();
const ogImage = content.avatarUrl
  ? getAbsoluteUrl(content.avatarUrl)
  : getAbsoluteUrl("/me.jpg");
const seoTitle = content.seo.title[locale];
const jobTitle = content.seo.jobTitle[locale];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoTitle,
    template: `%s | ${content.name}`,
  },
  description: t.description,
  applicationName: content.name,
  authors: [{ name: content.name, url: siteUrl }],
  creator: content.name,
  publisher: content.name,
  keywords: content.seo.keywords,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
      "en-US": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: seoTitle,
    description: t.description,
    url: siteUrl,
    siteName: content.name,
    locale: locale === "tr" ? "tr_TR" : "en_US",
    alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
    type: "profile",
    firstName: content.name.split(" ")[0],
    lastName: content.name.split(" ").slice(1).join(" "),
    images: [
      {
        url: ogImage,
        width: 800,
        height: 800,
        alt: `${content.name} — ${jobTitle}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: t.description,
    images: [ogImage],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <JsonLd />
        <ThemeProvider attribute="class" defaultTheme="light">
          <LocaleProvider>
            <TooltipProvider delayDuration={0}>
              <div className="absolute inset-x-0 top-0 h-[80px] overflow-hidden z-0 sm:h-[100px]">
                <FlickeringGrid
                  className="h-full w-full"
                  squareSize={7}
                  gridGap={2}
                  style={{
                    maskImage: "linear-gradient(to bottom, black, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black, transparent)",
                  }}
                />
              </div>
              <div className="relative z-10 mx-auto w-full max-w-2xl px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] pt-8 sm:px-6 sm:py-16 sm:pb-28 md:py-24">
                {children}
              </div>
              <Navbar />
            </TooltipProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
