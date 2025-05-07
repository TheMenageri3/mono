import { Card, CardContent } from "@/components/ui/card";
import { QuestionDisplay } from "./QuestionDisplay";
import { AnswerInput } from "./AnswerInput";
import { Eye } from "lucide-react";

interface QuestionPreviewProps {
  question: {
    id: string;
    text: string;
    type: string;
    required: boolean;
    helpText?: string;
    options?: string[];
  };
}

export function QuestionPreview({ question }: QuestionPreviewProps) {
  return (
    <div>
      <h3 className="text-base font-medium mb-3 flex items-center gap-2">
        <Eye className="h-4 w-4" />
        Question Preview
      </h3>
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="pb-3 border-b">
            <QuestionDisplay question={question} />
          </div>

          {question.type && (
            <div>
              <AnswerInput question={question} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
