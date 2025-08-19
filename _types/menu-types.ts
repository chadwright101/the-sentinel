export interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface NavDataProps {
  navData: {
    title: string;
    url?: string;
    children?: {
      title: string;
      url: string;
    }[];
  }[];
  isScrolled?: boolean;
}
