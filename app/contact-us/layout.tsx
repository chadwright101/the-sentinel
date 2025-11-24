import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | The Sentinel",
  description:
    "Get in touch with The Sentinel. Find contact information for our news team, advertising inquiries, and general information.",
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
