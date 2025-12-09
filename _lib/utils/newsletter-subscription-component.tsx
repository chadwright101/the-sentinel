"use client";

import { useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

import ButtonType from "@/_components/ui/buttons/button-type";
import classNames from "classnames";
import { newsletterSignUp } from "@/_actions/newsletter-signup";
import Link from "next/link";

interface NewsletterSubscribeComponentProps {
  cssClasses?: string;
}

const NewsletterForm = () => {
  const [showSignupSuccessful, setShowSignupSuccessful] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  return (
    <form
      action={async (formData) => {
        try {
          setError(null);

          if (!executeRecaptcha) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (!executeRecaptcha) {
              setError(
                "Security verification unavailable. Please refresh the page and try again."
              );
              return;
            }
          }

          const recaptchaToken = await executeRecaptcha("newsletter_signup");
          formData.append("recaptchaToken", recaptchaToken);

          const result = await newsletterSignUp(formData);

          if (result.success) {
            setShowSignupSuccessful(true);
          } else {
            setError(
              result.error ||
                "Failed to subscribe to newsletter. Please try again."
            );
          }
        } catch (err) {
          setError("An unexpected error occurred. Please try again.");
          console.error("Contact form error:", err);
        }
      }}
      className="grid gap-5 mt-5 w-full bg-teal px-5 py-7 tablet:grid-cols-[1.25fr_1fr] desktop:grid-cols-3 desktop:gap-10 desktop:mt-[50px] desktop:py-[100px] desktop:px-10"
    >
      <h3 className="grid place-items-center text-32px uppercase font-bold font-inter text-white text-center tablet:col-span-2 desktop:col-span-1 desktop:text-36px">
        Subscribe to <span className="text-white font-inter">The Sentinel</span>
      </h3>
      {showSignupSuccessful ? (
        <p className="w-full text-center text-white font-inter text-24px min-[600px]:w-auto min-[600px]:place-self-center">
          Subscribe successful!
        </p>
      ) : (
        <>
          <div className="grid gap-4 w-full min-[600px]:grid-cols-2 desktop:grid-cols-1">
            <div className="grid">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
                autoComplete="email"
                className="bg-white py-2.5 px-2.5 placeholder:text-black font-medium desktop:self-center font-inter"
                required
              />
            </div>
            <div className="grid">
              <label htmlFor="given-name" className="sr-only">
                First name
              </label>
              <input
                id="given-name"
                type="text"
                name="given-name"
                placeholder="Name"
                autoComplete="given-name"
                autoCapitalize="words"
                className="bg-white py-2.5 px-2.5 placeholder:text-black font-medium desktop:self-center font-inter"
                required
              />
            </div>
          </div>
          <div className="grid gap-3 w-full min-[600px]:w-auto min-[600px]:place-self-center">
            <ButtonType
              type="submit"
              cssClasses="w-full min-[600px]:w-auto"
            >
              Subscribe Now
            </ButtonType>
            <p className="text-12px text-white text-center font-inter">
              This site is protected by reCAPTCHA and the Google{" "}
              <Link href="https://policies.google.com/privacy" target="_blank" className="underline text-white">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="https://policies.google.com/terms" target="_blank" className="underline text-white">
                Terms of Service
              </Link>{" "}
              apply.
            </p>
          </div>

          {error && (
            <p className="w-full text-center text-white font-inter text-16px tablet:col-span-2 desktop:col-span-3">
              {error}
            </p>
          )}
        </>
      )}
    </form>
  );
};

const NewsletterSubscriptionComponent = ({
  cssClasses,
}: NewsletterSubscribeComponentProps) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      scriptProps={{
        async: true,
        defer: true,
      }}
    >
      <div className={cssClasses}>
        <NewsletterForm />
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default NewsletterSubscriptionComponent;
