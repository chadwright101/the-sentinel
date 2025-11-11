import type { Metadata } from "next";

import { Inter, Newsreader, Abril_Fatface } from "next/font/google";

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

import "@/_styles/globals.css";
import { Suspense } from "react";
import HeaderContainer from "@/_components/navigation/header/header-container";
import FooterComponent from "@/_components/navigation/footer/footer-component";
import LayoutAdSpaceComponent from "@/_components/ad-spaces/layout-ad-space-component";
import SearchBarComponent from "@/_components/navigation/search-bar-component";
import { fetchAdData } from "@/_components/fetch-ad-data";
import RecaptchaProvider from "@/_components/providers/recaptcha-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://thesentinelnews.com.au/"),
  title: "The Sentinel News Online",
  description:
    "The Sentinel News is an independent news website that covers local and regional issues in Clarence Town NSW and surrounding areas.",
  keywords:
    "Clarence Town news, NSW local news, regional news, independent journalism, Clarence Town NSW, local community news, Hunter Valley news, Australian regional news, local government news, community issues",
  openGraph: {
    description:
      "The Sentinel News is an independent news website that covers local and regional issues in Clarence Town NSW and surrounding areas.",
    type: "website",
    locale: "en_ZA",
    siteName: "The Sentinel",
    images: [
      {
        url: "/open-graph-image.webp",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adData = await fetchAdData();

  return (
    <html lang="en">
      <body
        className={`${interSansSerif.variable} ${newsreaderSerif.variable} ${abrilFatfaceSerif.variable} antialiased`}
      >
        <HeaderContainer />
        <LayoutAdSpaceComponent adData={adData} />
        <Suspense fallback={null}>
          <SearchBarComponent />
        </Suspense>
        <RecaptchaProvider>
          {children}
        </RecaptchaProvider>
        <FooterComponent />
      </body>
    </html>
  );
}
