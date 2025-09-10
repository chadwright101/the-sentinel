import Link from "next/link";
import classNames from "classnames";

interface AdFallbackProps {
  aspectRatio: "6/1" | "1/4" | "1/1" | "1/2" | "4/1";
  width?: number;
  height?: number;
  className?: string;
}

const AdFallback = ({ aspectRatio, width, height, className }: AdFallbackProps) => {
  return (
    <Link
      href="/contact"
      className={classNames(
        "flex items-center justify-center bg-beige border-4 border-[#FF5C00] desktop:hover:opacity-85 ease-in-out duration-300",
        `aspect-[${aspectRatio}]`,
        className
      )}
      style={{ width, height }}
    >
      <div className="text-center p-4">
        <p className="font-inter font-bold text-dark-brown text-14px tablet:text-16px desktop:text-18px leading-tight">
          Advertise here!
        </p>
        <p className="font-inter font-bold text-dark-brown text-12px tablet:text-14px desktop:text-16px mt-1">
          Contact us today
        </p>
      </div>
    </Link>
  );
};

export default AdFallback;