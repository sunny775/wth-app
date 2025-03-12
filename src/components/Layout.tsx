import { useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import useLocation from "../utils/useLocation";
import { X } from "lucide-react";

interface LayoutProps {
  toggleTheme: () => void;
}

interface LocationErrorProps {
  error: Error;
  hideError: () => void;
}

export default function Layout({ toggleTheme }: LayoutProps) {
  const [showError, setShowError] = useState(true);
  const location = useLocation();

  return (
    <div className="text-gray-700 dark:text-gray-300 bg-white dark:bg-black/85 transition">
      <Header />
      <SideBar toggleTheme={toggleTheme} location={location.data} showError={()=> setShowError(true)} />
      <main className="ml-16 min-h-screen">
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
    <div className="fixed right-4 bottom-8 rounded-lg border border-black/10 dark:border-white/10 shadow-lg bg-sky-50 dark:bg-[rgb(30,30,30)]">
      <button
        onClick={hideError}
        className="absolute -end-1 -top-1 rounded-full border border-black/10 dark:border-white/10 bg-sky-50 dark:bg-[rgb(30,30,30)] text-gray-600 dark:text-gray-400 cursor-pointer p-1"
      >
        <span className="sr-only">Close</span>
        <X />
      </button>

      <div className="p-4">
        <div>
          <p className="font-medium">{error.message}</p>

          <p className="line-clamp-1 text-sm text-gray-500">
            Enable location services to get real time weather data of your
            current city
          </p>
        </div>
      </div>
    </div>
  );
}
