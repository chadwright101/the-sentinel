"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { getContactInfo } from "@/_actions/contact-actions";

interface ContactMember {
  name: string;
  email: string;
}

interface ContactSection {
  phone: string;
  contactInfo: ContactMember[];
}

interface ContactPageData {
  phone: string;
  email: string;
  newsTeam: ContactSection;
  advertising: ContactSection & { deadline?: string };
  design: ContactMember[];
}

export default function ContactInfoComponent() {
  const [data, setData] = useState<ContactPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const verifyAndFetch = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!executeRecaptcha) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (!executeRecaptcha) {
          setError(
            "Security verification unavailable. Please refresh the page and try again.",
          );
          setLoading(false);
          return;
        }
      }

      const token = await executeRecaptcha("contact_info");
      const result = await getContactInfo(token);

      if (result.success && result.data) {
        setData(result.data as ContactPageData);
      } else {
        setError(result.error || "Failed to verify. Please try again.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [executeRecaptcha]);

  useEffect(() => {
    verifyAndFetch();
  }, [verifyAndFetch]);

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/^0/, "+61").replace(/\s/g, "");
  };

  if (loading) {
    return (
      <div className="flex h-full bg-beige/50 border rounded-md border-black/50 flex-col items-center justify-center py-20 text-center gap-6">
        <div className="spinner"></div>
        <p className="text-16px font-medium text-paragraph max-w-[300px]">
          Standby! We&apos;re checking to see if you&apos;re human before
          showing you our contact information...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4 border border-red-200 rounded-lg bg-red-50 p-6">
        <p className="text-16px font-medium text-red-600">
          {error === "Low reCAPTCHA score - potential spam detected"
            ? "Sorry, we couldn&apos;t verify that you are a human. Please try again later."
            : error}
        </p>
        <button
          onClick={verifyAndFetch}
          className="px-6 py-2 bg-teal text-white rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-10">
      <section>
        <h3 className="text-20px font-inter font-bold mb-3 text-heading">
          General
        </h3>
        <div className="grid gap-2">
          <div className="grid desktop:grid-cols-[135px_1fr] place-items-start desktop:gap-5">
            <p className="font-medium text-paragraph">Phone:</p>
            <Link
              href={`tel:${formatPhoneNumber(data.phone)}`}
              className="text-16px font-light text-paragraph hover:underline hover:text-teal transition-colors duration-200"
            >
              {data.phone}
            </Link>
          </div>
          <div className="text-16px grid desktop:grid-cols-[135px_1fr] place-items-start font-medium desktop:gap-5">
            <p className="text-paragraph">Email:</p>
            <Link
              href={`mailto:${data.email}`}
              className="text-16px font-light text-paragraph hover:underline hover:text-teal transition-colors duration-200"
            >
              {data.email}
            </Link>
          </div>

          <div className="grid desktop:grid-cols-[135px_1fr] place-items-start desktop:gap-5">
            <p className="font-medium text-paragraph">Physical address:</p>
            <p className="text-16px text-paragraph">
              Shop 6, 35 Swan Street, Beerwah
            </p>
          </div>
          <div className="grid desktop:grid-cols-[135px_1fr] place-items-start desktop:gap-5">
            <p className="font-medium text-paragraph">Mail address:</p>
            <p className="text-16px text-paragraph">
              PO Box 190, Beerwah, Queensland 4519
            </p>
          </div>
          <div className="grid desktop:grid-cols-[135px_1fr] place-items-start desktop:gap-5">
            <p className="font-medium text-paragraph">Office hours:</p>
            <p className="text-16px text-paragraph">
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
        <h3 className="text-20px font-inter font-bold mb-3 text-heading">
          News team
        </h3>
        <div className="grid gap-2">
          <div className="grid desktop:grid-cols-[135px_1fr] place-items-start desktop:gap-5">
            <p className="font-medium text-paragraph">Phone:</p>
            <Link
              href={`tel:${formatPhoneNumber(data.newsTeam.phone)}`}
              className="text-16px font-light text-paragraph hover:underline hover:text-teal transition-colors duration-200"
            >
              {data.newsTeam.phone}
            </Link>
          </div>
          {data.newsTeam.contactInfo.map((member, index) => (
            <div
              key={index}
              className="text-16px grid desktop:grid-cols-[135px_1fr] place-items-start font-medium desktop:gap-5"
            >
              <p className="text-paragraph">{member.name}:</p>
              <Link
                href={`mailto:${member.email}`}
                className="text-16px font-light text-paragraph hover:underline hover:text-teal transition-colors duration-200"
              >
                {member.email}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-20px font-inter font-bold mb-3 text-heading">
          Advertising team
        </h3>
        <div className="grid gap-2">
          <div className="grid desktop:grid-cols-[135px_1fr] place-items-start desktop:gap-5">
            <p className="font-medium text-paragraph">Phone:</p>
            <Link
              href={`tel:${formatPhoneNumber(data.advertising.phone)}`}
              className="text-16px font-light text-paragraph hover:underline hover:text-teal transition-colors duration-200"
            >
              {data.advertising.phone}
            </Link>
          </div>
          {data.advertising.contactInfo.map((person, index) => (
            <div
              key={index}
              className="text-16px grid desktop:grid-cols-[135px_1fr] place-items-start font-medium desktop:gap-5"
            >
              <p className="text-paragraph">{person.name}:</p>
              <Link
                href={`mailto:${person.email}`}
                className="text-16px font-light text-paragraph hover:underline hover:text-teal transition-colors duration-200"
              >
                {person.email}
              </Link>
            </div>
          ))}
          <p className="italic text-paragraph">
            (Deadline for advertising – Friday 12 noon)
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-20px font-inter font-bold mb-3 text-heading">
          Design and layout team
        </h3>
        <div className="grid gap-2">
          {data.design.map((person, index) => (
            <div
              key={index}
              className="text-16px grid desktop:grid-cols-[135px_1fr] place-items-start font-medium desktop:gap-5"
            >
              <p className="text-paragraph">{person.name}:</p>
              <Link
                href={`mailto:${person.email}`}
                className="text-16px font-light text-paragraph hover:underline hover:text-teal transition-colors duration-200"
              >
                {person.email}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
