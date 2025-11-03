"use client";

import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ButtonType from "@/_components/ui/buttons/button-type";
import { sendEmail } from "@/_actions/send-email-actions";

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (showSuccessMessage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showSuccessMessage]);

  return (
    <div>
      {showSuccessMessage ? (
        <p className="text-16px text-black">
          Thank you for your message. We will be in touch soon.
        </p>
      ) : (
        <form
          className="space-y-6"
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

              const recaptchaToken = await executeRecaptcha("contact_form");
              formData.append("recaptchaToken", recaptchaToken);

              const result = await sendEmail(formData);

              if (result.success) {
                setShowSuccessMessage(true);
              } else {
                setError(
                  result.error || "Failed to send message. Please try again."
                );
              }
            } catch (err) {
              setError("An unexpected error occurred. Please try again.");
              console.error("Contact form error:", err);
            }
          }}
        >
          <input type="hidden" name="_honey" className="hidden" />

          <div className="w-full">
            <label
              htmlFor="name"
              className="text-16px font-inter font-semibold mb-2 block"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className="w-full p-2.5 border rounded-md border-black/50 font-inter text-16px focus:outline-non focus:outline-teal transition-colors duration-300"
              required
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="email"
              className="text-16px font-inter font-semibold mb-2 block"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full p-2.5 border rounded-md border-black/50 font-inter text-16px focus:outline-non focus:outline-teal transition-colors duration-300"
              required
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="phone"
              className="text-16px font-inter font-semibold mb-2 block"
            >
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full p-2.5 border rounded-md border-black/50 font-inter text-16px focus:outline-non focus:outline-teal transition-colors duration-300"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="message"
              className="text-16px font-inter font-semibold mb-2 block"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message here..."
              rows={6}
              className="w-full p-2.5 border rounded-md border-black/50 font-inter text-16px focus:outline-teal transition-colors duration-300 resize-vertical"
              required
            ></textarea>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3">
              <p className="text-14px text-red-600">{error}</p>
            </div>
          )}

          <ButtonType
            type="submit"
            cssClasses="w-full tablet:w-auto desktop:w-full"
          >
            Send Message
          </ButtonType>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
