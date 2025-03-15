import { ComponentProps } from "react";
import cn from "../utils/cn";

export type CardProps = ComponentProps<"div">;

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      {...props}
      className={cn(
        "rounded-xl p-3 shadow-sm hover:shadow-lg bg-white dark:bg-white/2 transition",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
