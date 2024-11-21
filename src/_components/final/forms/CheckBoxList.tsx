import { cn } from "~/utils";

import { FormLabel } from "../ui/form";

type BaseProps = {
  options: { value: string | boolean; label: string }[];
  className?: string;
  label?: string;
  warning?: string;
};

type SingleSelectProps = BaseProps & {
  multiSelect?: false;
  selected: string | boolean;
  onSelect: (value: string | boolean) => void;
};

type MultiSelectProps = BaseProps & {
  multiSelect: true;
  selected: string[];
  onSelect: (value: string | boolean) => void;
};

type CircularCheckboxListProps = SingleSelectProps | MultiSelectProps;

const CircularCheckboxList: React.FC<CircularCheckboxListProps> = ({
  options,
  onSelect,
  selected,
  multiSelect = false,
  className = "",
  label = "",
  warning = "",
}) => {
  const isSelected = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value === selected;
    }
    if (multiSelect) {
      return (selected as string[]).includes(value);
    }
    return value === selected;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div>
        {label && (
          <FormLabel className={cn("text-xs font-semibold text-zinc-700")}>
            {label}
          </FormLabel>
        )}

        {warning && (
          <div className="overflow-wrap-anywhere max-w-[1100px] overflow-hidden break-words text-xs text-zinc-500">
            {warning}
          </div>
        )}
      </div>
      {options.map((option) => (
        <label
          key={option.label}
          className="group flex cursor-pointer items-center space-x-3"
          onClick={() => onSelect(option.value)}
        >
          <div className="relative flex items-center justify-center">
            <div
              className={`h-5 w-5 rounded-full border-2 transition-colors ${
                isSelected(option.value)
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300 group-hover:border-gray-400"
              } `}
            >
              {isSelected(option.value) && (
                <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
              )}
            </div>
          </div>
          <span className="text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CircularCheckboxList;
