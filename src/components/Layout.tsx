import SideBar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { useEffect, useState } from "react";

export default function Layout() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.theme === "dark" || 
          (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
      });
    
      useEffect(() => {
        if (isDark) {
          document.documentElement.classList.add("dark");
          localStorage.theme = "dark";
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.theme = "light";
        }
      }, [isDark]);

    const toggleTheme = () => setIsDark((prev) => !prev);
    
  return (
    <div className="text-gray-700 dark:text-gray-300 bg-white dark:bg-black/85 transition">
      <Header />
      <SideBar toggleTheme={toggleTheme} />
      <main className="ml-16 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
