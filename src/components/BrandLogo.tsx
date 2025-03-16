import { Link } from "react-router";
import cn from "../utils/cn";

export default function BrandLogo({ className }: { className?: string }) {
  return (
    <Link to="/">
      <div
        className={cn(
          "inline-flex gap-1.5 justify-center items-center text-sm",
          className
        )}
      >
        <span className="font-medium">Weather App</span>

        <span aria-hidden="true" role="img">
          <img src="/favicon.svg" className="w-6 h-6" alt="App Logo" />
        </span>
      </div>
    </Link>
  );
}
