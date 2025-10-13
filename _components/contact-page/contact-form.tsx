"use client";

import ButtonType from "@/_components/ui/buttons/button-type";

const ContactForm = () => {
  return (
    <form className="space-y-6">
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
        />
      </div>

      <ButtonType
        type="submit"
        cssClasses="w-full tablet:w-auto desktop:w-full"
      >
        Send Message
      </ButtonType>
    </form>
  );
};

export default ContactForm;
