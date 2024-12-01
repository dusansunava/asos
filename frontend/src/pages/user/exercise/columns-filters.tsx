import { DataTableColumnDef } from "@/components/data-table/table";
import { DataTableFilterDef } from "@/components/data-table/filters";
import { Exercise } from "@/pages/user/exercise/schema";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Message } from "@/providers/intl/IntlMessage";
import { Badge } from "@/components/ui/badge";
import { ExerciseLogo } from "@/pages/user/exercise/ExerciseLogo";

export const exerciseColumns: DataTableColumnDef<Exercise>[] = [
  {
    accessorKey: "logo",
    messageKey: "Common.logo",
    enableSorting: false,
    cell: () => <ExerciseLogo />,
  },
  {
    accessorKey: "name",
    messageKey: "Common.name",
    enableSorting: true,
  },
  {
    accessorKey: "type",
    messageKey: "Common.type",
    enableSorting: false,
  },
  {
    accessorKey: "intensity",
    messageKey: "Common.intensity",
    enableSorting: false,
    cell: ({ row }) => <Badge>{row.original.intensity}</Badge>,
  },
  {
    accessorKey: "bodyPart",
    messageKey: "Common.bodyPart",
    enableSorting: false,
  },
  {
    accessorKey: "actions",
    messageKey: "Common.actions",
    enableSorting: false,
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="p-0" variant="ghost">
              <Link
                className="px-4 py-2"
                to={`/exercises/detail/${row.original.id}`}
              >
                <Search />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <Message exactly>Exercise.detail.pageTitle</Message>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
];

export const exerciseFilters: DataTableFilterDef[] = [
  {
    accessorKey: "name",
    messageKey: "Common.name",
    type: "string",
  }
];
