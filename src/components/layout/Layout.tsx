import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router";
import useLocation from "../../hooks/useLocation";
import { X } from "lucide-react";
import Button from "../Button";

interface LocationErrorProps {
  error: Error;
  hideError: () => void;
}

export default function Layout() {
  const [showError, setShowError] = useState(true);
  const location = useLocation();
  const [, setIsDark] = useState(() => {
    return localStorage.theme === "dark";
  });
  const navigate = useNavigate();

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

  useEffect(() => {
    if (location.data && location.isNewState) {
      navigate(`/${location.data.lat}/${location.data.lon}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.data]);

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
        location={location.data}
        showError={() => setShowError(true)}
      />
      <SideBar
        toggleTheme={toggleTheme}
        location={location.data}
        showError={() => setShowError(true)}
      />
      <main className="sm:ml-16 min-h-screen">
        <Outlet />
      </main>
      <Footer />
      {location.error && showError && (
        <LocationError
          error={location.error}
          hideError={() => setShowError(false)}
        />
      )}
    </div>
  );
}

function LocationError({ error, hideError }: LocationErrorProps) {
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
        <div>
          <p className="font-medium">{error.message}</p>

          <p className="text-sm text-gray-500">
            Enable location services to get real time weather data of your
            current city
          </p>
        </div>
      </div>
    </div>
  );
}
