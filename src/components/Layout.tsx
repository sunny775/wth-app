import SideBar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

export default function Layout({ toggleTheme }: { toggleTheme: () => void }) {
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
