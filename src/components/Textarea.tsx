import React from "react";
import cn from "../utils/cn";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "block w-full rounded-md bg-gray-100 dark:bg-black/8 px-3 py-1.5  focus:outline-none focus:border focus:border-sky-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 sm:text-sm/6",
        className
      )}
      rows={4}
      ref={ref}
      {...props}
    />
  );
});

export default Textarea;
