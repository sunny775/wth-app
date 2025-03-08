import { Home, Moon, Power, Sun } from "lucide-react";
import { Link } from "react-router";

interface SideBarProps {
    toggleTheme: () => void
}

export default function SideBar({toggleTheme}: SideBarProps) {


    return <div className="flex fixed  h-screen w-16 flex-col justify-between shadow dark:shadow-md dark:bg-black/10">
    <div>
      <Link to="/" className="inline-flex size-16 items-center justify-center">
        <span className="grid size-10 place-content-center rounded-lg bg-gray-100 dark:bg-black/30 text-xs text-gray-600">
          <Home className="h-4 w-4" />
        </span>
      </Link>
  
      <div className="border-t border-gray-100 dark:border-gray-600">
        <div className="px-2">
          <div className="py-4">
            <div
              className="group relative flex justify-center rounded-sm bg-sky-50 dark:bg-black/30 px-2 py-1.5 text-sky-700"
            >
                 <Sun className="w-4 h-4 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0 cursor-pointer" onClick={toggleTheme} />
                 <Moon className="absolute w-4 h-4 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100 cursor-pointer" onClick={toggleTheme} />
  
              <span
                className="invisible whitespace-nowrap absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
              >
                Toggle Theme
              </span>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  
    <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 dark:border-gray-600 p-2">
      <form action="#">
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-black/30 hover:text-gray-700"
        >
          <Power className="h-4 w-4" />
  
          <span
            className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
          >
            Logout
          </span>
        </button>
      </form>
    </div>
  </div>
}