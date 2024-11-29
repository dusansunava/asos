import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table as TableType } from "@tanstack/react-table";

export default function TablePageIndexInput({ table }: { table: TableType<any> }) {
  const tableValue = String(+table.getState().pagination.pageIndex + 1);

  const [value, setValue] = useState(tableValue);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  useEffect(() => {
    const number = Number(value);

    if (number < 1) return;

    if (number > table.getPageCount()) return;

    table.setPageIndex(number - 1);
  }, [value]);

  useEffect(() => {
    if (tableValue != value) setValue(tableValue);
  }, [tableValue]);

  return (
    <Input
      className="w-24 h-8 text-sm"
      type="number"
      min={1}
      max={table.getPageCount()}
      value={value}
      onKeyDown={(event) => event.code === "Minus" && event.preventDefault()}
      onChange={handleOnChange}
    />
  );
};

