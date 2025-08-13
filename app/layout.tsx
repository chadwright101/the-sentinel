import type { Metadata } from "next";

import { Inter, Newsreader, Abril_Fatface } from "next/font/google";

const interSansSerif = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const newsreaderSerif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const abrilFatfaceSerif = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
});

import "@/_styles/globals.css";
import Header from "@/_components/navigation/header/header";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSansSerif.className} ${newsreaderSerif.className} ${abrilFatfaceSerif.className} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
