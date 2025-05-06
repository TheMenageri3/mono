import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface AnswerInputProps {
  question: {
    id: string;
    text: string;
    type: string;
    options?: string[];
    required?: boolean;
  };
  value?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

export function AnswerInput({
  question,
  value,
  onChange = () => {},
  disabled = false,
}: AnswerInputProps) {
  switch (question.type) {
    case "shortText":
      return (
        <Input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your answer"
          disabled={disabled}
        />
      );

    case "longText":
      return (
        <Textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your answer"
          className="min-h-[120px]"
          disabled={disabled}
        />
      );

    case "singleChoice":
      return (
        <RadioGroup
          value={value || ""}
          onValueChange={onChange}
          disabled={disabled}
          className="space-y-2"
        >
          {question.options?.map((option: string, i: number) => (
            <div key={i} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option}
                id={`${question.id}-option-${i}`}
              />
              <Label
                htmlFor={`${question.id}-option-${i}`}
                className="cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );

    case "multipleChoice":
      return (
        <div className="space-y-2">
          {question.options?.map((option: string, i: number) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox
                id={`${question.id}-option-${i}`}
                checked={value?.includes(option)}
                onCheckedChange={(checked) => {
                  const current = value || [];
                  const newValue = checked
                    ? [...current, option]
                    : current.filter((item: string) => item !== option);
                  onChange(newValue);
                }}
                disabled={disabled}
              />
              <Label
                htmlFor={`${question.id}-option-${i}`}
                className="cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      );

    case "boolean":
      return (
        <RadioGroup
          value={value !== undefined ? String(value) : ""}
          onValueChange={(v) => onChange(v === "true")}
          className="flex gap-6"
          disabled={disabled}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id={`${question.id}-yes`} />
            <Label htmlFor={`${question.id}-yes`} className="cursor-pointer">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id={`${question.id}-no`} />
            <Label htmlFor={`${question.id}-no`} className="cursor-pointer">
              No
            </Label>
          </div>
        </RadioGroup>
      );

    default:
      return <div>Unknown question type</div>;
  }
}
