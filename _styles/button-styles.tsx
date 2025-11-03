import classNames from "classnames";

export const buttonStyles = (
  cssClasses?: string,
  disabled?: boolean,
  pending?: boolean
) =>
  classNames(
    "bg-light-brown text-black border-4 border-light-brown font-bold font-inter flex text-[20px] uppercase text-center py-[6px] px-[50px] justify-center duration-500 rounded-full min-w-[200px]",
    cssClasses,
    {
      "cursor-pointer": !pending && !disabled,
      "cursor-not-allowed opacity-50": pending || disabled,
      "desktop:hover:bg-teal desktop:hover:text-white": !pending && !disabled,
    }
  );
