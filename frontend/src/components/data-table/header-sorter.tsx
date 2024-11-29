import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";

export default function SortedHeader({
  column,
  children,
}: {
  column: Column<any, any>;
  children: ReactElement;
}) {
  const sorted = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      className="whitespace-nowrap text-xs px-2"
      onClick={() => {
        switch (sorted) {
          case "asc":
            column.toggleSorting(true);
            break;
          case "desc":
            column.clearSorting();
            break;
          case false:
            column.toggleSorting(false);
            break;
        }
      }}
    >
      {children}
      <ArrowDown
        className={cn("ml-1 h-3 w-3", sorted !== "desc" && "hidden")}
      />
      <ArrowUp className={cn("ml-1 h-3 w-3", sorted !== "asc" && "hidden")} />
      <ArrowUpDown
        className={cn("ml-1 h-3 w-3", sorted !== false && "hidden")}
      />
    </Button>
  );
}
