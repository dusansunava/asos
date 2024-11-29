import {
  ColumnDef,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { setByPath } from "@/lib/utils";
import { Fragment, ReactNode, useEffect, useState } from "react";
import useQueryRequest from "@/lib/fetch/useQueryRequest";
import { Message } from "@/providers/intl/IntlMessage";
import { FilterX } from "lucide-react";
import { useQueryState } from "@/lib/useQueryState";
import z from "@/lib/zod";
import { Updater } from "@tanstack/react-table";
import { Link, useLocation } from "react-router-dom";
import { IndeterminateLoading } from "@/components/ui/indeterminate-loading";
import {
  DataTableFilterDef,
  Filters,
  generateFiltersSchema,
  getFiltersDefaultValues,
} from "@/components/data-table/filters";
import TablePageIndexInput from "@/components/data-table/page-input";
import SortedHeader from "@/components/data-table/header-sorter";

export type DataTableColumnDef<T> = ColumnDef<T> & {
  header?: never;
  headerFn?: ColumnDef<T>["header"];
  defaultVisible?: boolean;
  messageKey?: string;
  accessorKey: string;
};

type DataTableProps<TData> = {
  columns: DataTableColumnDef<TData>[];
  url: string;
  addEntity?: boolean;
  filters?: DataTableFilterDef[];
  children?: ReactNode;
};

type PaginationData<T> = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  data: T[];
};

const DataTable = <TData,>({
  columns,
  url,
  addEntity = false,
  filters = [],
  children,
}: DataTableProps<TData>) => {
  const DataTableSchema = z.object({
    sorting: z.array(
      z.object({
        desc: z.boolean(),
        id: z.string(),
      })
    ),
    pagination: z.object({
      pageIndex: z.number(),
      pageSize: z.number(),
    }),
    search: generateFiltersSchema(filters),
  });

  const [state, setState] = useQueryState<z.infer<typeof DataTableSchema>>({
    schema: DataTableSchema,
    defaultValues: {
      sorting: [
        {
          desc: false,
          id: columns[0]?.accessorKey,
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
      search: getFiltersDefaultValues(filters),
    },
  });
  const location = useLocation();

  function update(key: string, value: any) {
    switch (key) {
      case "columnVisibility":
        break;
      default:
        setState((old: z.infer<typeof DataTableSchema>) =>
          setByPath(old, value, key)
        );
    }
  }

  function onPaginationChange(updater: Updater<PaginationState>) {
    if (typeof updater === "function") {
      update("pagination", updater(state.pagination));
    }
  }

  function onSortingChange(updater: Updater<SortingState>) {
    if (typeof updater === "function")
      update("sorting", updater(state.sorting));
  }

  const { data: paginationData, isLoading } = useQueryRequest<
    PaginationData<TData>
  >({
    url,
    method: "POST",
    body: state,
    queryKey: [url, state],
  });
  const [memory, setMemory] = useState<TData[]>(
    paginationData ? paginationData.data : []
  );

  useEffect(() => {
    if (paginationData) {
      setMemory(paginationData.data);
    }
  }, [paginationData]);

  const table = useReactTable({
    data: memory,
    columns,
    pageCount: paginationData?.totalPages || 0,
    onPaginationChange,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      sorting: state.sorting,
      pagination: state.pagination,
      columnVisibility: state.columnVisibility,
    },
  });

  function handleFilterUpdate(key: string, value: any) {
    setState((old: any) => {
      old = setByPath(old, 0, "pagination.pageIndex");
      old = setByPath(old, value, "search." + key);
      return old;
    });
  }

  return (
    <>
      <Filters
        filters={filters}
        state={state.search}
        update={handleFilterUpdate}
      >
        <>
          <div>
            <Button
              onClick={() => setState(null)}
              variant="outline"
              size="icon"
              className="ml-auto"
            >
              <FilterX size="1.2rem" />
            </Button>
          </div>
          {children}
          {addEntity && (
            <Button className="p-0">
              <Link to={location.pathname + "/create"} className="px-4 py-2">
                <Message exactly>Common.createNew</Message>
              </Link>
            </Button>
          )}
        </>
      </Filters>
      <div className="rounded-md border text-start bg-background mt-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-xs">
                {headerGroup.headers.map((header) => {
                  // @ts-ignore
                  const Header = header.column.columnDef.headerFn;

                  let Component =
                    typeof Header === "function" ? (
                      // @ts-ignore
                      <Header {...header.getContext} />
                    ) : header.column.accessorFn != null ? (
                      // @ts-ignore
                      <Message exactly>
                        {/* @ts-ignore */}
                        {header.column.columnDef.messageKey || header.column.id}
                      </Message>
                    ) : null;

                  if (header.column.getCanSort())
                    Component = (
                      <SortedHeader {...header.getContext()}>
                        {/* @ts-ignore */}
                        {Component}
                      </SortedHeader>
                    );

                  if (header.isPlaceholder) Component = null;

                  return <TableHead key={header.id}>{Component}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading && (
            <tbody className="table-header-group">
              <tr>
                <td colSpan={columns.length} className="relative">
                  <IndeterminateLoading className="table-header-group" />
                </td>
              </tr>
            </tbody>
          )}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b-2 md:border-b"
                >
                  {row.getVisibleCells().map((cell) => {
                    // @ts-ignore
                    const Header = cell.column.columnDef.headerFn;

                    let Component =
                      typeof Header === "function" ? (
                        // @ts-ignore
                        <Header {...cell.getContext} />
                      ) : cell.column.accessorFn != null ? (
                        <Message exactly>
                          {/* @ts-ignore */}
                          {cell.column.columnDef.messageKey || cell.column.id}
                        </Message>
                      ) : null;
                    return (
                      <Fragment key={cell.id}>
                        <TableCell className="flex items-center md:hidden font-medium text-muted-foreground">
                          {Component}
                        </TableCell>
                        <TableCell>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      </Fragment>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center col-span-full md:col-span-1 grid place-content-center md:table-cell"
                >
                  <Message exactly>Common.table.noData</Message>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex-wrap-reverse gap-2 flex items-center justify-end space-x-2 py-4 px-4">
          <div className="flex-1 text-sm text-muted-foreground flex items-center gap-1">
            <Message exactly>Common.pageText</Message>{" "}
            <TablePageIndexInput table={table} />
            <Message exactly>Common.ofText</Message> {table.getPageCount()}
          </div>

          <div className="space-x-2 flex items-start">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <Message exactly>Common.previous</Message>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <Message exactly>Common.next</Message>
            </Button>

            <Select
              key={String(table.getState().pagination.pageSize)}
              onValueChange={(_value) => table.setPageSize(Number(_value))}
              defaultValue={String(table.getState().pagination.pageSize)}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["5", "10", "20", "30", "40", "50"].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
