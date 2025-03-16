import { ElementType, ReactNode } from "react";
import cn from "../utils/cn";

export type CardProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

const Card = <T extends ElementType>({
  className,
  children,
  as,
  ...props
}: CardProps<T>) => {
  const Component = as || "div";
  return (
    <Component
      {...props}
      className={cn(
        "rounded-xl p-3 shadow-sm hover:shadow-lg bg-white dark:bg-white/2 transition",
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Card;
