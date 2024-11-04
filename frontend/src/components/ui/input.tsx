import * as React from "react";

import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";
import { useMessage } from "@/providers/intl/IntlMessage";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = "text", placeholder = "", error = null, ...props },
    ref
  ) => {
    const message = useMessage({ value: placeholder });
    const [visibility, setVisibility] = useState(false);

    return (
      <div className="relative">
        <input
          placeholder={placeholder === "" ? "" : message}
          type={type === "password" ? (visibility ? "text" : "password") : type}
          className={cn(
            error
              ? `${
                  type === "password" ? "pl-3 pr-11" : "px-3"
                } flex h-10 w-full rounded-md border border-red-600 dark:border-red-600 bg-white py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300`
              : `${
                  type === "password" ? "pl-3 pr-11" : "px-3"
                } flex h-10 w-full rounded-md border bg-white py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300`,
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <Button
            className="absolute cursor-pointer top-1/2 p-[2px] transform -translate-y-1/2 right-2 h-7 w-7"
            size="icon"
            variant="ghost"
          >
            <Eye onClick={() => setVisibility(!visibility)} />
          </Button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
