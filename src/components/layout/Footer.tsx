import BrandLogo from "../BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-600 ml-16">
      <div className="w-full p-8">
        <BrandLogo fontSize="text-lg" />

        <div className="mt-4 lg:flex lg:items-end lg:justify-between">
          <p className="max-w-md text-pretty leading-relaxed">
            Search your favorite cities for real time weather information
          </p>

          <p className="text-sm lg:mt-0">
            &copy; Weather App {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
