import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function IndeterminateLoading({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute top-0 inset-x-0 h-1 bg-primary/20 overflow-hidden @container",
        className
      )}
      {...props}
    >
      <div className="h-full bg-primary animate-indeterminate w-44" />
    </div>
  );
}
