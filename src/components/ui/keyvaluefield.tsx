"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Trash2 } from "lucide-react";

type KeyValue = { key: string; value: string };

export const KeyValueField = ({
  label,
  description,
  onChange,
}: {
  label: string;
  description?: string;
  onChange: (jsonObj: Record<string, string>) => void;
}) => {
  const [pairs, setPairs] = useState<KeyValue[]>([{ key: "", value: "" }]);

  const updatePairs = (index: number, field: keyof KeyValue, value: string) => {
    const newPairs = [...pairs];
    newPairs[index][field] = value;
    setPairs(newPairs);
    emitChange(newPairs);
  };

  const addPair = () => {
    setPairs([...pairs, { key: "", value: "" }]);
  };

  const removePair = (index: number) => {
    const newPairs = pairs.filter((_, i) => i !== index);
    setPairs(newPairs.length ? newPairs : [{ key: "", value: "" }]);
    emitChange(newPairs);
  };

  const emitChange = (pairs: KeyValue[]) => {
    const obj: Record<string, string> = {};
    for (const pair of pairs) {
      if (pair.key) obj[pair.key] = pair.value;
    }
    onChange(obj);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      {description && <FormDescription>{description}</FormDescription>}
      <div className="space-y-2 mt-2">
        {pairs.map((pair, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Input
              placeholder="Key"
              value={pair.key}
              onChange={(e) => updatePairs(i, "key", e.target.value)}
            />
            <Input
              placeholder="Value"
              value={pair.value}
              onChange={(e) => updatePairs(i, "value", e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removePair(i)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addPair}>
          + Add Field
        </Button>
      </div>
    </FormItem>
  );
};
