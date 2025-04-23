"use client";

import * as React from "react";
import { ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const [selectedTime, setSelectedTime] = React.useState(value || "");

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };

  const handleTimeClick = (hour: number, minute: number) => {
    const formattedTime = formatTime(hour, minute);
    setSelectedTime(formattedTime);
    onChange?.(formattedTime);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left",
            !selectedTime && "text-muted-foreground"
          )}
        >
          <ClockIcon className="mr-2 h-4 w-4" />
          {selectedTime ? selectedTime : <span>Select time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4">
          <div className="mb-4 text-sm font-medium">Select time</div>
          <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto">
            {hours.map((hour) =>
              minutes.map((minute) => (
                <Button
                  key={`${hour}-${minute}`}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "text-xs",
                    selectedTime === formatTime(hour, minute) &&
                      "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handleTimeClick(hour, minute)}
                >
                  {formatTime(hour, minute)}
                </Button>
              ))
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
