import { Metadata } from "next";
import PageWrapper from "@/_lib/utils/page-wrapper";

export const metadata: Metadata = {
  title: "Privacy Policy | The Sentinel",
  description:
    "The Sentinel privacy policy. Learn how we collect, use, and protect your personal information.",
};

const PrivacyPage = () => {
  return (
    <PageWrapper cssClasses="my-10">
      <main>
        <h2 className="text-36px font-inter font-bold mb-10">Privacy Policy</h2>
        <div className="space-y-4">
          <p>
            The Sentinel respects your privacy and is committed to protecting
            your personal information. We collect limited data to deliver our
            news, services, and communications — including when you contact us,
            subscribe, or interact with our website.
          </p>
          <p>
            Any information we collect is handled in accordance with the Privacy
            Act 1988 (Cth) and the Australian Privacy Principles (APPs). We
            never sell personal information and only share data with trusted
            service providers when necessary to deliver our services.
          </p>
          <p>2025 The Sentinel. All rights reserved.</p>
        </div>
      </main>
    </PageWrapper>
  );
};

export default PrivacyPage;
