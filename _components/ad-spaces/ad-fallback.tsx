import Link from "next/link";
import classNames from "classnames";

interface AdFallbackProps {
  cssClasses?: string;
}

const AdFallback = ({ cssClasses }: AdFallbackProps) => {
  return (
    <Link
      href="/contact"
      className={classNames(
        "from-light-brown bg-linear-to-bl to-beige desktop:hover:opacity-85 ease-in-out duration-300",
        cssClasses
      )}
    >
      <div className="w-full h-full grid place-items-center">
        <div className="text-center p-4">
          <p className="font-inter font-bold text-black text-14px tablet:text-16px desktop:text-24px leading-tight">
            Advertise here!
          </p>
          <p className="font-inter font-bold text-black text-12px tablet:text-14px desktop:text-16px mt-2">
            Contact us today
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AdFallback;
