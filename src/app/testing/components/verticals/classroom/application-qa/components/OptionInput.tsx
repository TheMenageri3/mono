import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface OptionInputProps {
  options: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, value: string) => void;
}

export function OptionInput({
  options,
  onAdd,
  onRemove,
  onUpdate,
}: OptionInputProps) {
  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={option}
            onChange={(e) => onUpdate(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(index)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove option</span>
          </Button>
        </div>
      ))}

      {options.length === 0 && (
        <p className="text-sm text-muted-foreground py-2">
          No options added yet.
        </p>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAdd}
        className="mt-2"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Option
      </Button>
    </div>
  );
}
