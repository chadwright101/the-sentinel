"use client";

import PageWrapper from "@/_lib/utils/page-wrapper";
import Link from "next/link";
import generalData from "@/_data/general-data.json";
import Image from "next/image";
import ContactForm from "@/_components/contact-page/contact-form";
import { useEffect, useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { verifyContactView } from "@/_actions/verify-contact-view";
import ProtectedEmail from "@/_components/contact-page/protected-email";
import ProtectedPhone from "@/_components/contact-page/protected-phone";

const ContactPageContent = () => {
  const { contactPage } = generalData;
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/^0/, "+61").replace(/\s/g, "");
  };

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        if (!executeRecaptcha) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          if (!executeRecaptcha) {
            setIsVerifying(false);
            return;
          }
        }

        const token = await executeRecaptcha("view_contact_info");
        const result = await verifyContactView(token);
        setIsVerified(result.success);
      } catch (error) {
        console.error("Verification error:", error);
        setIsVerified(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAccess();
  }, [executeRecaptcha]);

  return (
    <PageWrapper cssClasses="my-10">
      <h2 className="text-36px font-inter font-bold mb-10">Contact Us</h2>
      <div className="grid gap-10 desktop:grid-cols-2">
        <div className="space-y-10">
          <section>
            <h3 className="text-20px font-inter font-bold mb-3">General</h3>
            <div className="grid gap-2">
              <div className="grid desktop:grid-cols-[135px_1fr] place-items-start desktop:gap-5">
                <p className="font-medium">Phone:</p>
                <ProtectedPhone
                  phone={contactPage.phone}
                  isVerified={isVerified}
                  isVerifying={isVerifying}
                  formatPhoneNumber={formatPhoneNumber}
                />
              </div>
              <p className="text-16px grid desktop:grid-cols-[135px_1fr] place-items-start font-medium desktop:gap-5">
                Email:
                <span className="font-light">
                  <ProtectedEmail
                    email={contactPage.email}
                    isVerified={isVerified}
                    isVerifying={isVerifying}
                  />
                </span>
              </p>

              <div className="grid desktop:grid-cols-[135px_1fr] place-items-start desktop:gap-5">
                <p className="font-medium">Physical address:</p>
                <p className="text-16px">Shop 6, 35 Swan Street, Beerwah</p>
              </div>
              <div className="grid desktop:grid-cols-[135px_1fr] place-items-start desktop:gap-5">
                <p className="font-medium">Mail address:</p>
                <p className="text-16px">
                  PO Box 190, Beerwah, Queensland 4519
                </p>
              </div>
              <div className="grid desktop:grid-cols-[135px_1fr] place-items-start desktop:gap-5">
                <p className="font-medium">Office hours:</p>
                <p className="text-16px">
                  9am – 2pm each weekday (or give us a call to arrange an
                  appointment)
                </p>
              </div>
              <Link
                href="https://www.facebook.com/TheSentinelNews"
                target="_blank"
                className="desktop:hover:opacity-80 mr-auto"
              >
                <Image
                  src="/icons/facebook-icon-teal.svg"
                  alt="Follow us on Facebook"
                  width={32}
                  height={32}
                  className="w-8 h-auto desktop:w-6"
                />
              </Link>
            </div>
          </section>
          <section>
            <h3 className="text-20px font-inter font-bold mb-3">News team</h3>
            <div className="grid gap-2">
              <div className="grid desktop:grid-cols-[135px_1fr] place-items-start desktop:gap-5">
                <p className="font-medium">Phone:</p>
                <ProtectedPhone
                  phone={contactPage.newsTeam.phone}
                  isVerified={isVerified}
                  isVerifying={isVerifying}
                  formatPhoneNumber={formatPhoneNumber}
                />
              </div>
              {contactPage.newsTeam.contactInfo.map((member, index) => (
                <p
                  key={index}
                  className="text-16px grid desktop:grid-cols-[135px_1fr] place-items-start font-medium desktop:gap-5"
                >
                  {member.name}:
                  <span className="font-light">
                    <ProtectedEmail
                      email={member.email}
                      isVerified={isVerified}
                      isVerifying={isVerifying}
                    />
                  </span>
                </p>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-20px font-inter font-bold mb-3">
              Advertising team
            </h3>
            <div className="grid gap-2">
              <div className="grid desktop:grid-cols-[135px_1fr] place-items-start desktop:gap-5">
                <p className="font-medium">Phone:</p>
                <ProtectedPhone
                  phone={contactPage.advertising.phone}
                  isVerified={isVerified}
                  isVerifying={isVerifying}
                  formatPhoneNumber={formatPhoneNumber}
                />
              </div>
              {contactPage.advertising.contactInfo.map((person, index) => (
                <p
                  key={index}
                  className="text-16px grid desktop:grid-cols-[135px_1fr] place-items-start font-medium desktop:gap-5"
                >
                  {person.name}:
                  <ProtectedEmail
                    email={person.email}
                    isVerified={isVerified}
                    isVerifying={isVerifying}
                  />
                </p>
              ))}
              <p className="italic">
                (Deadline for advertising – Friday 12 noon)
              </p>
            </div>
          </section>
          <section>
            <h3 className="text-20px font-inter font-bold mb-3">
              Design and layout team
            </h3>
            <div className="grid gap-2">
              {contactPage.design.map((person, index) => (
                <p
                  key={index}
                  className="text-16px grid desktop:grid-cols-[135px_1fr] place-items-start font-medium desktop:gap-5"
                >
                  {person.name}:
                  <ProtectedEmail
                    email={person.email}
                    isVerified={isVerified}
                    isVerifying={isVerifying}
                  />
                </p>
              ))}
            </div>
          </section>
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
