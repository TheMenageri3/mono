"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ListEventCompany from "./ListEventCompany";

export type ViewType = "byEvent" | "byStatus" | "byType" | "deleted";

interface ListByButtonProps {
  eventId?: string;
}

const viewTypes: ViewType[] = ["byEvent", "byStatus", "byType", "deleted"];

const getButtonLabel = (type: ViewType) => {
  switch (type) {
    case "byEvent":
      return "By Event";
    case "byStatus":
      return "By Status";
    case "byType":
      return "By Type";
    case "deleted":
      return "Deleted";
  }
};

export default function ListByButton({ eventId }: ListByButtonProps) {
  const [activeView, setActiveView] = useState<ViewType>("byEvent");

  return (
    <div className="space-y-4">
      {/* View Toggle Buttons */}
      <div className="flex gap-2">
        {viewTypes.map((type) => (
          <Button
            key={type}
            variant={activeView === type ? "default" : "outline"}
            onClick={() => setActiveView(type)}
            className={cn(
              "transition-colors",
              activeView === type && "bg-primary text-primary-foreground"
            )}
          >
            {getButtonLabel(type)}
          </Button>
        ))}
      </div>

      {/* Display ListEventCompany based on active view */}
      <ListEventCompany viewType={activeView} eventId={eventId} />
    </div>
  );
}
