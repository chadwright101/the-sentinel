import classNames from "classnames";

interface PageWrapperProps {
  cssClasses?: string;
  children: React.ReactNode;
}

const PageWrapper = ({ cssClasses, children }: PageWrapperProps) => {
  return (
    <div
      className={classNames(
        "px-5 max-w-[1100px] mx-auto desktop:px-10",
        cssClasses
      )}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
