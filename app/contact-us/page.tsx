"use client";

import PageWrapper from "@/_lib/utils/page-wrapper";
import ContactForm from "@/_components/contact-page/contact-form";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ContactInfoComponent from "@/_components/contact-page/contact-info-component";

const ContactPageContent = () => {
  return (
    <PageWrapper cssClasses="my-10">
      <h2 className="text-36px font-inter font-bold mb-10">Contact Us</h2>
      <div className="grid gap-10 desktop:grid-cols-2">
        <div className="flex flex-col gap-10">
          <ContactInfoComponent />
        </div>
        <section>
          <h3 className="text-20px font-inter font-bold mb-3">
            Send us a message
          </h3>
          <ContactForm />
        </section>
      </div>
    </PageWrapper>
  );
};

const ContactUsPage = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      scriptProps={{
        async: true,
        defer: true,
      }}
    >
      <ContactPageContent />
    </GoogleReCaptchaProvider>
  );
};

export default ContactUsPage;
