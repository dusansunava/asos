import LogoDark from "@/assets/exercise_logo_white.png";
import LogoLight from "@/assets/exercise_logo_black.png";
import { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Logo = ({
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <>
      <img
        className={cn("hidden dark:block", className)}
        {...props}
        src={LogoDark}
        alt="Logo"
      />
      <img
        className={cn("dark:hidden", className)}
        {...props}
        src={LogoLight}
        alt="Logo"
      />
    </>
  );
};
