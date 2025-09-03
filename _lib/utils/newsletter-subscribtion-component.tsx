"use client";

import ButtonType from "@/_components/ui/buttons/button-type";
import classNames from "classnames";

interface NewsletterSubscribeComponentProps {
  cssClasses?: string;
}

const NewsletterSubscriptionComponent = ({
  cssClasses,
}: NewsletterSubscribeComponentProps) => {
  return (
    <form
      action=""
      className={classNames(
        "grid gap-5 mt-5 w-full bg-teal px-5 py-7 tablet:grid-cols-[1.5fr_1fr] desktop:grid-cols-[1fr_1.25fr_1fr] desktop:gap-10 desktop:mt-[50px]",
        cssClasses
      )}
    >
      <h3 className="grid place-items-center text-32px uppercase font-bold font-inter text-white text-center tablet:col-span-2 desktop:col-span-1 desktop:text-36px">
        Subscribe to <span className="text-white">The Sentinal</span>
      </h3>
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        className="bg-white py-2.5 px-2.5 placeholder:text-black font-medium desktop:self-center"
      />
      <ButtonType
        type="submit"
        cssClasses="w-full min-[600px]:w-auto min-[600px]:place-self-center"
      >
        Subscribe Now
      </ButtonType>
    </form>
  );
};

export default NewsletterSubscriptionComponent;
