import classNames from "classnames";

export const buttonStyles = (
  cssClasses?: string,
  disabled?: boolean,
  pending?: boolean
) =>
  classNames(
    "bg-light-brown text-white flex text-paragraph uppercase font-light text-center py-2 px-4 justify-center duration-500 rounded-[6px] min-w-[100px] cursor-pointer min-[1000px]:hover:scale-[102%]",
    cssClasses,
    {
      "opacity-50 cursor-not-allowed hover:none": pending,
    }
  );
