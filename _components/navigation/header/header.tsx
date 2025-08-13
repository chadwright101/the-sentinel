import { MobileHeader } from "./mobile/mobile-header";
import { DesktopHeader } from "./desktop/desktop-header";

export default function Header() {
  return (
    <header className="fixed w-full left-0 mx-auto z-50 ease-in-out duration-300 overflow-y-hidden">
      <div className="relative">
        <MobileHeader />
        {/* <DesktopHeader isScrolled={isScrolled} /> */}
      </div>
    </header>
  );
}
