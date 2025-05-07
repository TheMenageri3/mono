import { Card, CardContent } from "@/components/ui/card";
import {
  AlignLeft,
  Check,
  CheckSquare,
  ListChecks,
  MessageSquare,
  ToggleLeft,
} from "lucide-react";

interface QuestionTypeSelectorProps {
  value: string;
  onChange: (type: string) => void;
}

export function QuestionTypeSelector({
  value,
  onChange,
}: QuestionTypeSelectorProps) {
  const questionTypes = [
    {
      id: "shortText",
      name: "Short Text",
      description: "For brief responses like names, emails, or short answers",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: "longText",
      name: "Long Text",
      description: "For detailed responses, explanations, or paragraphs",
      icon: <AlignLeft className="h-4 w-4" />,
    },
    {
      id: "singleChoice",
      name: "Single Choice",
      description: "For selecting one option from a list of choices",
      icon: <Check className="h-4 w-4" />,
    },
    {
      id: "multipleChoice",
      name: "Multiple Choice",
      description: "For selecting multiple options from a list",
      icon: <ListChecks className="h-4 w-4" />,
    },
    {
      id: "boolean",
      name: "Yes/No",
      description: "For simple binary choice questions",
      icon: <ToggleLeft className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-2">
      {questionTypes.map((type) => (
        <Card
          key={type.id}
          className={`cursor-pointer transition-all ${
            value === type.id ? "ring-2 ring-primary" : "hover:bg-muted/50"
          }`}
          onClick={() => onChange(type.id)}
        >
          <CardContent className="p-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-md ${
                  value === type.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {type.icon}
              </div>
              <div>
                <h4 className="font-medium text-sm">{type.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {type.description}
                </p>
              </div>
            </div>
            {value === type.id && (
              <CheckSquare className="h-4 w-4 text-primary" />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
