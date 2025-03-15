import React from "react";
import cn from "../utils/cn";

const Input = ({ className, ...props }: React.ComponentProps<"input">) => {
  return (
    <input
      className={cn(
        "w-full rounded-full bg-black/4 dark:bg-white/4 text-gray-700 dark:text-gray-300  border-gray-600 sm:text-sm pl-10 h-10 focus:outline-none focus:border focus:border-sky-600 placeholder:text-gray-400 dark:placeholder:text-gray-500",
        className
      )}
      {...props}
    />
  );
};

export default Input;
