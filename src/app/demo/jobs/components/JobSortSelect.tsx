"use client";

import React from "react";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption } from "../types/job.types";

interface JobSortSelectProps {
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
}

const sortOptions = [
  { value: "date" as const, label: "Date (Newest)" },
  { value: "salary" as const, label: "Salary (Highest)" },
];

export function JobSortSelect({ sortBy, setSortBy }: JobSortSelectProps) {
  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-[180px] border-white/10 bg-black/30">
        <div className="flex items-center">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          <span>Sort by</span>
        </div>
      </SelectTrigger>
      <SelectContent className="bg-black/80 backdrop-blur-md border-white/10">
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
