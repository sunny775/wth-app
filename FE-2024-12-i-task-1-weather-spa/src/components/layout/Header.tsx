import { useEffect, useState } from "react";
import BrandLogo from "../BrandLogo";
import HeaderSearchBar from "../search/HeaderSearch";
import { Search, X } from "lucide-react";
import useMediaQuery from "../../hooks/useMedia";
import MobileMenu, { MenuProps } from "./MobileMenu";

export default function Header(menuProps: MenuProps) {
  const [showInput, setShowInput] = useState(false);
  const matches = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    if (matches) {
      setShowInput(true);
    }
  }, [matches]);

  const show = () => {
    setShowInput(true);
  };

  const hide = () => {
    setShowInput(false);
  };
  return (
    <header className="sticky inset-x-0 top-0 z-50 shadow dark:shadow-md sm:pl-16 bg-white/30 dark:bg-black/10 backdrop-blur-sm">
      <div className="relative flex h-16 items-center justify-between px-2 sm:px-8">
        <MobileMenu {...menuProps} />
        {(matches || !showInput) && <BrandLogo />}
        {!matches && !showInput && (
          <div
            onClick={show}
            className=" flex justify-center items-center cursor-pointer"
          >
            <Search className="w-6 h-6 stroke-gray-700" />
          </div>
        )}
        {showInput && <HeaderSearchBar className="sm:max-w-[300px]" />}
        {!matches && showInput && (
          <div
            onClick={hide}
            className="flex justify-center items-center cursor-pointer ml-4"
          >
            <X className="w-6 h-6 stroke-gray-700" />
          </div>
        )}
      </div>
    </header>
  );
}
