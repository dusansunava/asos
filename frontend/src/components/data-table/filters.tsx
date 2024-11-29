import { cn } from "@/lib/utils";
import { Message, useMessage } from "@/providers/intl/IntlMessage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import z from "@/lib/zod";
import { ReactElement } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Accordion from "@radix-ui/react-accordion";

export type DataTableFilterDef<T = { [key: string]: string }> =
  | {
      accessorKey: keyof T | string;
      messageKey: string;
      type: "string" | "number" | "boolean";
    }
  | {
      accessorKey: keyof T | string;
      type: "select";
      messageKey: string;
      options: {
        value: string;
        label: string;
      }[];
    };

type FilterComponentProps = DataTableFilterDef & {
  name: string;
  value: any;
  onChange: (value: any) => void;
  className?: string;
  noLabel?: boolean;
  index?: number;
};

export const FilterComponent = ({
  type,
  name,
  value,
  onChange,
  ..._props
}: FilterComponentProps) => {
  const label = useMessage({
    exactly: true,
    value: _props?.messageKey,
  });

  const props = { name, value, placeholder: label };

  return (
    <div
      className={cn(
        !_props.index && "md:max-w-sm",
        !!_props.index && _props.noLabel && "space-y-2"
      )}
    >
      <div className="text-start pl-2">
        <Label className="w-full">{label}</Label>
      </div>
      {{
        string: <Input {...props} onChange={(e) => onChange(e.target.value)} />,
        number: (
          <Input
            type="number"
            {...props}
            onChange={(e) => onChange(e.target.value)}
          />
        ),
        boolean: (
          <Select onValueChange={onChange} value={props.value?.toString()}>
            <SelectTrigger>
              <span
                className={
                  props.value === undefined
                    ? "text-muted-foreground"
                    : undefined
                }
              >
                {props.value ? (
                  <Message exactly>
                    {props.value === "true" ? "Common.yes" : "Common.no"}
                  </Message>
                ) : (
                  label
                )}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">
                <Message exactly>Common.yes</Message>
              </SelectItem>
              <SelectItem value="false">
                <Message exactly>Common.no</Message>
              </SelectItem>
            </SelectContent>
          </Select>
        ),
        select: (
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger>
              <span
                className={!props.value ? "text-muted-foreground" : undefined}
              >
                {props.value ? (
                  <Message exactly>
                    {
                      //@ts-ignore
                      _props.options?.find(({ value }) => value === props.value)
                        ?.label
                    }
                  </Message>
                ) : (
                  label
                )}
              </span>
            </SelectTrigger>
            <SelectContent>
              {/*@ts-ignore*/}
              {_props.options?.map(({ label, value }) => (
                <SelectItem key={value ?? "undefined"} value={value}>
                  <Message exactly>{label}</Message>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ),
      }[type] ?? null}
    </div>
  );
};

export function generateFiltersSchema(filters: DataTableFilterDef[]) {
  let _object = {};
  let defaultValue = {};

  for (const filter of filters) {
    switch (filter.type) {
      case "string":
        defaultValue[filter.accessorKey] = "";
        _object[filter.accessorKey] = z.string().nullable();
        break;
      case "boolean":
        defaultValue[filter.accessorKey] = "";
        _object[filter.accessorKey] = z.string().nullable();
        break;
      case "select":
        defaultValue[filter.accessorKey] = null;
        _object[filter.accessorKey] = z.string().nullable();
        break;
    }
  }

  return z.object(_object);
}

type FiltersProps = {
  filters: DataTableFilterDef[];
  state: { [key: string]: any };
  update: (key: string, value: any) => void;
  children?: ReactElement;
};

export const Filters = ({ filters, state, update, children }: FiltersProps) => {
  return filters.length === 0 ? (
    <div className="flex sm:justify-end flex-wrap gap-y-2 gap-x-4">
      {children}
    </div>
  ) : (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item
        value="filter"
        className={cn("flex flex-wrap gap-x-2 gap-y-4 -mb-4")}
      >
        <Accordion.AccordionTrigger asChild>
          <Button size="icon">
            <Filter size="1.2rem" />
          </Button>
        </Accordion.AccordionTrigger>

        {children}

        <Accordion.Content
          className={cn(
            "flex-[0_0_100%] data-[state=open]:pb-4 grid gap-4 sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4"
          )}
        >
          {filters.map((filter, index) =>
            handleFilter(filter, { state, update, index })
          )}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

function handleFilter(
  filter: DataTableFilterDef,
  {
    state,
    update,
    ...props
  }: Pick<FiltersProps, "state" | "update"> & {
    className?: string;
    noLabel?: boolean;
    index?: number;
  }
) {
  const name = filter.accessorKey as string;

  const value = state[name];

  function onChange(value: any) {
    update(name, value);
  }

  return (
    <FilterComponent
      key={name}
      {...{ name, value, onChange, ...filter, ...props }}
    />
  );
}

export function getFiltersDefaultValues(filters: DataTableFilterDef[]) {
  let defaultValues = {};

  for (const filter of filters) {
    switch (filter.type) {
      case "string":
        defaultValues[filter.accessorKey] = "";
        break;
      case "boolean":
        defaultValues[filter.accessorKey] = "";
        break;
      case "select":
        defaultValues[filter.accessorKey] = null;
    }
  }

  return defaultValues;
}
