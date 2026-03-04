import { Metadata } from "next";
import CalameoComponent from "@/_components/editions-page/calameo-component";
import PageWrapper from "@/_lib/utils/page-wrapper";
import NewsletterSubscriptionComponent from "@/_lib/utils/newsletter-subscription-component";

export const metadata: Metadata = {
  title: "Digital Editions | The Sentinel",
  description:
    "Browse the digital editions of The Sentinel. Read the latest newspaper editions online.",
};

const EditionsPage = () => {
  return (
    <PageWrapper cssClasses="my-10">
      <main>
        <h2 className="text-36px font-inter font-bold">Editions</h2>
        <div className="flex flex-col gap-10">
          <CalameoComponent />
          <NewsletterSubscriptionComponent />
        </div>
      </main>
    </PageWrapper>
  );
};

export default EditionsPage;
