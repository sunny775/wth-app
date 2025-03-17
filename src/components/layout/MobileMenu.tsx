import { useEffect, useState } from "react";
import Drawer from "../Drawer";
import Button from "../Button";
import { Menu, Home, MapPin, Moon, Sun } from "lucide-react";
import { Link } from "react-router";

export interface MenuProps {
  toggleTheme: () => void;
  location?: {
    lat: number;
    lon: number;
  }| null;
  showError: () => void;
}

const MobileMenu = ({ toggleTheme, location }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(false);
  }, []);
  return (
    <div className="sm:hidden mr-4">
      <Button onClick={toggleDrawer} title="Menu Button">
        <Menu className="stroke-1" />
      </Button>

      <Drawer isOpen={isOpen} onClose={toggleDrawer}>
        <div className="p-4 rounded-sm flex flex-col gap-4 shadow dark:shadow-md dark:bg-black/10">
          <div
            onClick={toggleDrawer}
            className="rounded-sm bg-sky-50 dark:bg-black/30 px-2 py-1.5 text-sky-700 p-4"
          >
            <Link to="/" title="Home" className="flex items-center gap-4">
              <Home className="size-4" />
              <span>Home</span>
            </Link>
          </div>

          <div
            onClick={toggleDrawer}
            className="rounded-sm bg-sky-50 dark:bg-black/30 px-2 py-1.5 text-sky-700 p-4"
          >
            {location ? (
              <Link
                to={`/${location?.lat}/${location?.lon}`}
                title="My Weather Data"
                className="flex items-center gap-4"
              >
                <MapPin className="size-4" />
                <span>My Weather Data</span>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <MapPin className="size-4" />
                <span>
                  You need to enable location to see the weather data of your
                  current city
                </span>
              </div>
            )}
          </div>

          <div
            onClick={toggleTheme}
            className="rounded-sm bg-sky-50 dark:bg-black/30 px-2 py-1.5 text-sky-700 p-4 flex  items-center gap-4"
          >
            <div className="flex justify-center">
              <Sun className="w-4 h-4 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0 cursor-pointer" />
              <Moon className="absolute w-4 h-4 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100 cursor-pointer" />
            </div>
            <span>Toggle Theme</span>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
