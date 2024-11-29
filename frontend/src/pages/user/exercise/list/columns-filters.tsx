import { DataTableColumnDef } from "@/components/data-table/table";
import { DataTableFilterDef } from "@/components/data-table/filters";
import { Exercise } from "@/pages/user/exerciseList/schema";
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
import { ExerciseLogo } from "@/pages/user/exerciseList/ExerciseLogo";

export const exerciseColumns: DataTableColumnDef<Exercise>[] = [
  {
    accessorKey: "icon",
    messageKey: "Common.logo",
    enableSorting: false,
    cell: ({ row }) => <ExerciseLogo logo={row.original.logo} />,
  },
  {
    accessorKey: "name",
    messageKey: "Common.name",
  },
  {
    accessorKey: "type",
    messageKey: "Common.type",
    cell: ({ row }) => <Badge>{row.original.type}</Badge>,
  },
  {
    accessorKey: "intensity",
    messageKey: "Common.intesity",
  },
  {
    accessorKey: "bodyPart",
    messageKey: "Common.bodyPart",
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
                to={`/exercise/detail/${row.original.id}`}
              >
                <Search />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <Message>detail</Message>
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
