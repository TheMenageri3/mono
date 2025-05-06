import { Badge } from "@/components/ui/badge";

interface QuestionStatusBadgeProps {
  required: boolean;
  type: string;
  section?: string;
}

export function QuestionStatusBadge({
  required,
  type,
  section,
}: QuestionStatusBadgeProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge variant={required ? "default" : "outline"} className="font-normal">
        {required ? "Required" : "Optional"}
      </Badge>

      {section && (
        <Badge variant="secondary" className="font-normal">
          {section}
        </Badge>
      )}

      <Badge variant="outline" className="font-normal capitalize">
        {type}
      </Badge>
    </div>
  );
}
