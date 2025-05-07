import { HelpCircle, User } from "lucide-react";

interface QuestionDisplayProps {
  question: {
    id: string;
    text: string;
    type: string;
    required?: boolean;
    helpText?: string;
  };
}

export function QuestionDisplay({ question }: QuestionDisplayProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-start gap-2">
        <h3 className="font-medium text-base">{question.text}</h3>
        {question.required && <span className="text-red-500">*</span>}
      </div>

      {question.helpText && (
        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          <HelpCircle className="h-3.5 w-3.5" />
          {question.helpText}
        </p>
      )}

      {question.type === "multipleChoice" && (
        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" />
          Select all that apply
        </div>
      )}

      {question.type === "singleChoice" && (
        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" />
          Select one option
        </div>
      )}
    </div>
  );
}
