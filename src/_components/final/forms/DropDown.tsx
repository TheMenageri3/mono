import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/_components/ui/dropdown-menu";

import { Path, UseFormReturn } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { FormLabel } from "../ui/form";
import { cn } from "~/utils";

export const Dropdown = <T,>({
  form,
  getLabel,
  formKey,
  values,
  multiSelect = false,
  label = "",
}: {
  form: UseFormReturn<T>;
  getLabel: () => string;
  formKey: keyof T;
  values: string[];
  multiSelect?: boolean;
  label?: string;
}) => {
  return (
    <div className="relative">
      {label && (
        <FormLabel className={cn("text-xs font-semibold text-zinc-700")}>
          {label}
        </FormLabel>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full min-w-64 items-center justify-between rounded-md border border-zinc-200 p-2 focus:outline-none">
            <div className="text-sm">{getLabel()}</div>
            <div>
              <ChevronDown className="h-4 w-4" />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="flex w-full min-w-64 flex-col gap-2 border border-gray-900 bg-white p-2"
          align="start"
        >
          {values.map((value) => (
            <DropdownMenuItem
              key={value}
              className={clsx(
                "p-2 hover:bg-transparent focus:bg-gray-500 focus:text-white",
                form.watch(formKey as unknown as Path<T>) === value &&
                  "bg-gray-200",
              )}
              onClick={() => {
                if (multiSelect) {
                  // @ts-expect-error: we know it's an array
                  const containsValue = form.watch(formKey).includes(value);
                  if (containsValue) {
                    form.setValue(
                      formKey as unknown as Path<T>,
                      // @ts-expect-error: we know it's an array

                      form.watch(formKey).filter((v) => v !== value),
                    );
                  } else {
                    // @ts-expect-error: we know it's an array
                    form.setValue(formKey, [...form.watch(formKey), value]);
                  }
                } else {
                  form.setValue(formKey as unknown as Path<T>, value as any);
                }
              }}
            >
              {value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
