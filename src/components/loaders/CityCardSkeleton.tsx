import { ComponentProps } from "react";

export default function CityCardSkeleton({ children }: ComponentProps<"div">) {
  return (
    <div className="rounded-xl p-3 shadow-sm hover:shadow-lg bg-white dark:bg-white/4 transition">
      <div className="flex flex-col justify-center items-center animate-pulse space-y-4 w-full">
        <div className="size-10 rounded-full bg-gray-200 dark:bg-white/10"></div>
        <div className="flex-1 space-y-6 py-1 w-full">
          {children || (
            <div className="space-y-3 flex flex-col">
              <div className="h-4 rounded bg-gray-200 dark:bg-white/10 inline-block"></div>
              <div className="h-4 rounded bg-gray-200 dark:bg-white/10"></div>
              <div className="h-4 rounded bg-gray-200 dark:bg-white/10"></div>
              <div className="h-4 rounded bg-gray-200 dark:bg-white/10"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
