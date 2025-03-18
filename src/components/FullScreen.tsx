import { ComponentProps } from "react";
import cn from "../utils/cn";

export default function FullPage({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col items-center justify-center gap-4 bg-white dark:bg-[rgb(40,40,40)] w-screen h-screen",
        className
      )}
    >
      {children}
    </div>
  );
}
