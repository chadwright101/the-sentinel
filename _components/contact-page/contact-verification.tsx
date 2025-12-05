"use client";

import { useEffect, useState, useRef } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { verifyContactView } from "@/_actions/verify-contact-view";
import PageWrapper from "@/_lib/utils/page-wrapper";
import Link from "next/link";
import generalData from "@/_data/general-data.json";
import Image from "next/image";
import ContactForm from "@/_components/contact-page/contact-form";
import ProtectedEmail from "@/_components/contact-page/protected-email";
import ProtectedPhone from "@/_components/contact-page/protected-phone";

const MAX_RETRY_ATTEMPTS = 15;
const RETRY_DELAY = 2000;

const ContactVerification = () => {
  const { contactPage } = generalData;
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [retryAttempt, setRetryAttempt] = useState(0);
  const [initializationProgress, setInitializationProgress] = useState("Initializing security verification...");
  const [error, setError] = useState<string | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/^0/, "+61").replace(/\s/g, "");
  };

  const verifyAccess = async (attempt = 0) => {
    try {
      setRetryAttempt(attempt);

      if (attempt > 2) {
        setInitializationProgress("Still loading security verification...");
      }
      if (attempt > 5) {
        setInitializationProgress("Almost there, verifying your connection...");
      }
      if (attempt > 10) {
        setInitializationProgress("Taking longer than expected, please wait...");
      }

      if (!executeRecaptcha) {
        if (attempt >= MAX_RETRY_ATTEMPTS) {
          setError("Security verification could not initialize. This may be due to a slow connection or browser extensions blocking the verification system.");
          setIsVerifying(false);
          return;
        }

        retryTimeoutRef.current = setTimeout(() => {
          verifyAccess(attempt + 1);
        }, RETRY_DELAY);
        return;
      }

      const token = await executeRecaptcha("view_contact_info");
      const result = await verifyContactView(token);
      setIsVerified(result.success);

      if (!result.success) {
        setError(result.error || "Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setIsVerified(false);
      setError("An error occurred during verification. Please refresh the page or try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleManualRetry = () => {
    setError(null);
    setIsVerifying(true);
    setRetryAttempt(0);
    setInitializationProgress("Initializing security verification...");
    verifyAccess(0);
  };

  useEffect(() => {
    verifyAccess(0);

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [executeRecaptcha]);

  if (error && !isVerifying) {
    return (
      <PageWrapper cssClasses="my-10">
        <h2 className="text-36px font-inter font-bold mb-10">Contact Us</h2>
        <div className="bg-red-500/10 border border-red-500/50 rounded-md p-6 space-y-4">
          <p className="text-16px text-black font-medium">{error}</p>
          <p className="text-14px text-black">
            Tip: If this persists, try disabling browser extensions or ad blockers, then refresh the page.
          </p>
          <button
            onClick={handleManualRetry}
            className="bg-teal text-white px-6 py-2 rounded-md desktop:hover:opacity-80 transition-opacity duration-300"
          >
            Try Again
          </button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper cssClasses="my-10">
      <h2 className="text-36px font-inter font-bold mb-10">Contact Us</h2>

      {isVerifying && (
        <div className="bg-blue/10 border border-blue/50 rounded-md p-6 mb-10">
          <p className="text-16px text-black">
            {initializationProgress}
            {retryAttempt > 2 && (
              <span className="ml-2 text-14px text-black/70">
                ({retryAttempt}/{MAX_RETRY_ATTEMPTS})
              </span>
            )}
          </p>
        </div>
      )}

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

export default ContactVerification;
