import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/_components/final/ui/form";
import { Input, InputProps } from "~/_components/final/ui/input";
import { Textarea, TextareaProps } from "~/_components/final/ui/textarea";
import { cn } from "~/lib/utils";

type BaseCustomFormItemProps = {
  label: string;
  field: any; // Replace with the specific type from react-hook-form if possible
  isEditing?: boolean;
  placeholder: string;
  labelClassName?: string;
  inputClassName?: string;
};

type CustomFormItemPropsWithInput = BaseCustomFormItemProps & {
  InputComponent?: typeof Input;
  inputProps?: InputProps;
};

type CustomFormItemPropsWithTextarea = BaseCustomFormItemProps & {
  InputComponent: typeof Textarea;
  inputProps?: TextareaProps;
};

type CustomFormItemProps =
  | CustomFormItemPropsWithInput
  | CustomFormItemPropsWithTextarea;

export default function CustomFormItem({
  label,
  field,
  isEditing = true,
  placeholder,
  InputComponent = Input,
  inputProps = {},
  labelClassName = "",
  inputClassName = "",
  warning = "",
  disabled = false,
}: CustomFormItemProps & { warning?: string; disabled?: boolean }) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (disabled) return;
    const value = e.target.value;

    if (
      InputComponent === Input &&
      (inputProps as InputProps).type === "number"
    ) {
      const numberValue = Number(value);
      if (!isNaN(numberValue)) {
        field.onChange(numberValue);
        return;
      }
    }

    field.onChange(value);
  };

  return (
    <FormItem>
      <FormLabel
        className={cn("text-xs font-semibold text-zinc-700", labelClassName)}
      >
        {label}
      </FormLabel>
      {warning && (
        <div className="overflow-wrap-anywhere max-w-[1100px] overflow-hidden break-words text-xs text-zinc-500">
          {warning}
        </div>
      )}
      <FormControl>
        <InputComponent
          {...field}
          {...inputProps}
          disabled={!isEditing || disabled}
          placeholder={placeholder}
          className={cn(
            "border-[#924428] text-sm text-zinc-700 lg:border-zinc-200",
            "focus:border-primary focus:ring-2 focus:ring-primary",
            "tracking-wide transition-all duration-200",
            inputClassName,
            disabled && "cursor-not-allowed",
          )}
          onChange={handleChange}
          value={field.value}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
