import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { X } from "lucide-react";
import Button from "../Button";
import { useGeolocation } from "../../hooks/useGeolocation";

interface LocationErrorProps {
  errorMessage?: string;
  isSupported: boolean;
  hideError: () => void;
}

export default function Layout() {
  const [showError, setShowError] = useState(true);
  const location = useGeolocation();
  const [, setIsDark] = useState(() => {
    return localStorage.theme === "dark";
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      if ("theme" in localStorage) return; // use manually set theme if available

      if (event.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const isDark = !prev;
      if (isDark) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
      return isDark;
    });
  };

  return (
    <div className="text-gray-700 dark:text-gray-300 bg-white dark:bg-black/85 transition">
      <Header
        toggleTheme={toggleTheme}
        location={{
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        }}
        showError={() => setShowError(true)}
      />
      <SideBar
        toggleTheme={toggleTheme}
        location={{
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        }}
        showError={() => setShowError(true)}
      />
      <main className="sm:ml-16 min-h-screen">
        <Outlet />
      </main>
      <Footer />
      {showError && (
        <LocationError
          errorMessage={location?.error?.message}
          isSupported={location.isSupported}
          hideError={() => setShowError(false)}
        />
      )}
    </div>
  );
}

function LocationError({
  errorMessage,
  isSupported,
  hideError,
}: LocationErrorProps) {
  return (
    <div className="fixed sm:right-4 bottom-8 rounded-lg border border-black/10 dark:border-white/10 shadow-lg bg-sky-50 dark:bg-[rgb(30,30,30)]">
      <Button
        onClick={hideError}
        className=" w-8 h-8 px-0 absolute -end-1 -top-1 rounded-full border border-black/10 dark:border-white/10 bg-sky-50 dark:bg-[rgb(30,30,30)] text-gray-600 dark:text-gray-400"
      >
        <span className="sr-only">Close</span>
        <X className="w-4 h-4" />
      </Button>

      <div className="p-4">
        {!isSupported ? (
          <p>Geolocation is not supported in this browser.</p>
        ) : null}
        {errorMessage ? (
          <div>
            <p className="font-medium">{errorMessage}</p>

            <p className="text-sm text-gray-500">
              Enable location services to get real time weather data of your
              current city
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
