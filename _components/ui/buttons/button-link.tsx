import { buttonStyles } from "@/_styles/button-styles";
import { ButtonProps } from "@/_types/button-types";
import Link from "next/link";

const ButtonLink = ({
  children,
  onClick,
  cssClasses,
  href = "#",
  disabled,
  ariaLabel,
}: ButtonProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={buttonStyles(cssClasses, disabled)}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
