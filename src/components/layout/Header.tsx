import BrandLogo from "../BrandLogo";
import HeaderSearchBar from "../search/HeaderSearch";

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 shadow dark:shadow-md pl-16 bg-white/30 dark:bg-black/10 backdrop-blur-sm">
      <div className="relative flex h-16 items-center justify-between px-8">
        <BrandLogo />
        <HeaderSearchBar className="max-w-[300px]" />
      </div>
    </header>
  );
}
