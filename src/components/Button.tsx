import React from 'react'
import cn from "../utils/cn";

const Button = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn(
          "h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Button;
