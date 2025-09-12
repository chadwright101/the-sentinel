"use client";

import { useState } from "react";

import ButtonType from "@/_components/ui/buttons/button-type";
import classNames from "classnames";
import { newsletterSignUp } from "@/_actions/newsletter-signup";

interface NewsletterSubscribeComponentProps {
  cssClasses?: string;
}

const NewsletterSubscriptionComponent = ({
  cssClasses,
}: NewsletterSubscribeComponentProps) => {
  const [showSignupSuccessful, setShowSignupSuccessful] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        try {
          setError(null);

          /* if (!executeRecaptcha) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (!executeRecaptcha) {
              setError(
                "Security verification unavailable. Please refresh the page and try again."
              );
              return;
            }
          }

          const recaptchaToken = await executeRecaptcha("contact_form");
          formData.append("recaptchaToken", recaptchaToken); */

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
      className={classNames(
        "grid gap-5 mt-5 w-full bg-teal px-5 py-7 tablet:grid-cols-[1.5fr_1fr] desktop:grid-cols-[1fr_1.25fr_1fr] desktop:gap-10 desktop:mt-[50px] desktop:py-[100px] desktop:px-10",
        cssClasses
      )}
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
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="bg-white py-2.5 px-2.5 placeholder:text-black font-medium desktop:self-center font-inter"
          />

          <ButtonType
            type="submit"
            cssClasses="w-full min-[600px]:w-auto min-[600px]:place-self-center"
          >
            Subscribe Now
          </ButtonType>

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

export default NewsletterSubscriptionComponent;
