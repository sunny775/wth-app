import React from "react";
import cn from "../utils/cn";

const Button = ({ className, ...props }: React.ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-all disabled:opacity-50 disabled:pointer-events-none border border-black/2 dark:border-white/10  py-1.5 text-sky-600 shadow hover:shadow-md cursor-pointer active:scale-105 hover:opacity-80 dark:shadow-white/2",
        className
      )}
      {...props}
    />
  );
};

export default Button;
