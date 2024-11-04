import { NavLink, NavLinkProps } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MenuNavItem = ({ className, ...props }: NavLinkProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full flex justify-start items-center rounded-none p-0",
        className
      )}
    >
      <NavLink
        {...props}
        className={({ isActive }) =>
          isActive
            ? "w-full dark:text-blue-400 text-blue-600 underline underline-offset-2 font-bold py-2 px-7 flex flex-row items-center justify-start"
            : "py-2 px-7 flex flex-row items-center justify-start w-full"
        }
      />
    </Button>
  );
};

export default MenuNavItem;
