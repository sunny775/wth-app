import Container from "./Container";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container classNames="py-8 lg:py-12">
        <BrandLogo fontSize="text-lg" />

        <div className="mt-4 lg:flex lg:items-end lg:justify-between">
          <p className="max-w-md text-pretty leading-relaxed text-gray-700">
            Search your favorite cities for real time weather information
          </p>

          <p className="text-sm text-gray-700 lg:mt-0">
            &copy; Weather App {new Date().getFullYear()}
          </p>
        </div>
      </Container>
    </footer>
  );
}
