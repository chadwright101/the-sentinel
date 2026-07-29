import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense } from "react";
import HeaderContainer from "@/_components/navigation/header/header-container";
import FooterComponent from "@/_components/navigation/footer/footer-component";
import LayoutAdSpaceComponent from "@/_components/ad-spaces/layout-ad-space-component";
import SearchBarComponent from "@/_components/navigation/search-bar-component";
import { fetchAdData } from "@/_components/fetch-ad-data";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Newsreader, Abril_Fatface } from "next/font/google";

import "@/_styles/globals.css";

const interSansSerif = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-inter",
});

const newsreaderSerif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-newsreader",
});

const abrilFatfaceSerif = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril-fatface",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sentinelnews.com.au/"),
  title: "The Sentinel News Online",
  description:
    "The Sentinel is a free, independent newspaper serving the Somerset and Moreton Bay regions of Queensland, covering local news, sport and community events from Kilcoy and Esk to Caboolture and Bribie Island.",
  keywords:
    "Somerset news, Moreton Bay news, Kilcoy news, Caboolture news, Woodford news, Esk news, Lowood news, Bribie Island news, Morayfield news, Burpengary news, Queensland regional news, independent local newspaper, community news, local sport",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
  },
  openGraph: {
    description:
      "The Sentinel is a free, independent newspaper serving the Somerset and Moreton Bay regions of Queensland, covering local news, sport and community events.",
    type: "website",
    locale: "en_AU",
    siteName: "The Sentinel",
    images: [
      {
        url: "/open-graph-image.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sentinel",
    description:
      "The Sentinel is a free, independent newspaper serving the Somerset and Moreton Bay regions of Queensland, covering local news, sport and community events.",
    images: ["/open-graph-image.webp"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adData = await fetchAdData();
  const enableAnalytics = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${interSansSerif.variable} ${newsreaderSerif.variable} ${abrilFatfaceSerif.variable} antialiased`}
      >
        <HeaderContainer />
        <LayoutAdSpaceComponent adData={adData} />
        <Suspense fallback={null}>
          <SearchBarComponent />
        </Suspense>
        {children}
        <Analytics />
        <FooterComponent />
        {enableAnalytics && <GoogleAnalytics gaId="G-HDPFPPJJJ2" />}
      </body>
    </html>
  );
}
