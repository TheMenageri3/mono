"use client";

import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { AVAILABLE_TEMPLATE_VARIABLES } from "@/lib/extractVariables";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function HtmlTextBox({ value, onChange, placeholder }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [query, setQuery] = useState("");

  const getCursorCoordinates = () => {
    const textarea = textareaRef.current;
    if (!textarea) return { top: 0, left: 0 };

    const rect = textarea.getBoundingClientRect();
    return {
      top: rect.top + 40,
      left: rect.left + 20,
    };
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    onChange(text);

    const match = text.slice(0, e.target.selectionStart).match(/{{([\w.]*)$/);
    if (match) {
      const q = match[1];
      setQuery(q);
      const filtered = AVAILABLE_TEMPLATE_VARIABLES.filter((v) =>
        v.startsWith(q)
      );
      setFilteredSuggestions(filtered);
      setSelectedIndex(0);
      setPosition(getCursorCoordinates());
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev + 1 < filteredSuggestions.length ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev - 1 >= 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    }

    if (e.key === "Enter") {
      const selected = filteredSuggestions[selectedIndex];
      if (selected) {
        e.preventDefault();
        insertVariable(selected);
      }
    }
  };

  const insertVariable = (variable: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart } = textarea;
    const before = value.slice(0, selectionStart).replace(/{{[\w.]*$/, "");
    const after = value.slice(selectionStart);
    const updated = `${before}{{${variable}}}${after}`;

    onChange(updated);
    setShowSuggestions(false);

    setTimeout(() => {
      const pos = before.length + variable.length + 4;
      textarea.setSelectionRange(pos, pos);
      textarea.focus();
    }, 0);
  };

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="min-h-[150px]"
      />

      {showSuggestions && filteredSuggestions.length > 0 && (
        <Popover open={true}>
          <PopoverContent
            style={{
              top: position.top,
              left: position.left,
              position: "absolute",
            }}
            className="z-50 w-[220px] p-1 shadow-lg border bg-black text-white rounded-md"
          >
            <ScrollArea className="max-h-[200px] overflow-y-auto">
              <div className="flex flex-col gap-1">
                {filteredSuggestions.map((v, i) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => insertVariable(v)}
                    className={cn(
                      "text-left px-2 py-1 rounded cursor-pointer text-sm",
                      i === selectedIndex
                        ? "bg-muted text-black dark:text-white"
                        : "hover:bg-muted"
                    )}
                  >
                    {`{{${v}}}`}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
