"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Code,
  Filter,
  Briefcase,
  Clock,
  Globe,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterState } from "../types/job.types";
import { filterOptions } from "../data/filterOptions";

interface JobFiltersSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  web3Only: boolean;
  setWeb3Only: React.Dispatch<React.SetStateAction<boolean>>;
}

export function JobFiltersSidebar({
  filters,
  setFilters,
  web3Only,
  setWeb3Only,
}: JobFiltersSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    techStack: false,
    experience: true,
    employment: true,
    remoteOptions: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (
    category: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter((item) => item !== value),
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      experienceLevels: [],
      employmentTypes: [],
      remoteOptions: [],
      techStack: [],
    });
    setWeb3Only(false);
  };

  const hasActiveFilters =
    Object.values(filters).some((arr) => arr.length > 0) || web3Only;

  return (
    <Card className="border-white/10 bg-black/30 backdrop-blur-md p-6 sticky top-6">
      <div className="space-y-6">
        {/* Filter Jobs Header */}
        <div className="flex items-center gap-2 text-white">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filter Jobs</span>
        </div>

        {/* Web3/Solana Only Toggle */}
        <div className="p-3 border border-purple-500/30 bg-purple-500/10 rounded-lg">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="web3-only"
              checked={web3Only}
              onCheckedChange={(checked) => setWeb3Only(checked === true)}
              className="border-purple-400/50 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
            />
            <label
              htmlFor="web3-only"
              className="text-sm text-purple-300 cursor-pointer hover:text-purple-200 transition-colors flex items-center gap-2"
            >
              <Code className="w-4 h-4" />
              Web3/Solana only
            </label>
          </div>
        </div>

        {/* Tech Stack Filter */}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto hover:bg-transparent text-white mb-3"
            onClick={() => toggleSection("techStack")}
          >
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="text-sm font-medium">Tech Stack</span>
            </div>
            {expandedSections.techStack ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>

          {expandedSections.techStack && (
            <div className="space-y-2 max-h-48 overflow-y-auto ml-6">
              {filterOptions.techStack.map((tech) => (
                <div key={tech} className="flex items-center space-x-3">
                  <Checkbox
                    id={`tech-${tech}`}
                    checked={filters.techStack.includes(tech)}
                    onCheckedChange={(checked) =>
                      handleFilterChange("techStack", tech, checked as boolean)
                    }
                    className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <label
                    htmlFor={`tech-${tech}`}
                    className="text-sm text-gray-300 cursor-pointer hover:text-white transition-colors"
                  >
                    {tech}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Experience Level */}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto hover:bg-transparent text-white mb-3"
            onClick={() => toggleSection("experience")}
          >
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="text-sm font-medium">Experience Level</span>
            </div>
            {expandedSections.experience ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>

          {expandedSections.experience && (
            <div className="space-y-3 ml-6">
              {filterOptions.experienceLevels.map((level) => (
                <div key={level} className="flex items-center space-x-3">
                  <Checkbox
                    id={`exp-${level}`}
                    checked={filters.experienceLevels.includes(level)}
                    onCheckedChange={(checked) =>
                      handleFilterChange(
                        "experienceLevels",
                        level,
                        checked as boolean
                      )
                    }
                    className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <label
                    htmlFor={`exp-${level}`}
                    className="text-sm text-gray-300 cursor-pointer hover:text-white transition-colors"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Employment Type */}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto hover:bg-transparent text-white mb-3"
            onClick={() => toggleSection("employment")}
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Employment Type</span>
            </div>
            {expandedSections.employment ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>

          {expandedSections.employment && (
            <div className="space-y-3 ml-6">
              {filterOptions.employmentTypes.map((type) => (
                <div key={type} className="flex items-center space-x-3">
                  <Checkbox
                    id={`emp-${type}`}
                    checked={filters.employmentTypes.includes(type)}
                    onCheckedChange={(checked) =>
                      handleFilterChange(
                        "employmentTypes",
                        type,
                        checked as boolean
                      )
                    }
                    className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <label
                    htmlFor={`emp-${type}`}
                    className="text-sm text-gray-300 cursor-pointer hover:text-white transition-colors"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Remote Options */}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto hover:bg-transparent text-white mb-3"
            onClick={() => toggleSection("remoteOptions")}
          >
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">Remote Options</span>
            </div>
            {expandedSections.remoteOptions ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>

          {expandedSections.remoteOptions && (
            <div className="space-y-3 ml-6">
              {filterOptions.remoteOptions.map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <Checkbox
                    id={`remote-${option}`}
                    checked={filters.remoteOptions.includes(option)}
                    onCheckedChange={(checked) =>
                      handleFilterChange(
                        "remoteOptions",
                        option,
                        checked as boolean
                      )
                    }
                    className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <label
                    htmlFor={`remote-${option}`}
                    className="text-sm text-gray-300 cursor-pointer hover:text-white transition-colors flex items-center gap-2"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        option === "Remote"
                          ? "bg-green-400"
                          : option === "Hybrid"
                          ? "bg-blue-400"
                          : "bg-orange-400"
                      }`}
                    />
                    <span>{option}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters ? (
          <Button
            variant="outline"
            className="w-full border-white/20 bg-black/20 hover:bg-white/5 text-white"
            onClick={clearAllFilters}
          >
            Clear All Filters
          </Button>
        ) : (
          <Button
            disabled
            className="w-full bg-gray-600 text-gray-400 cursor-not-allowed"
          >
            No Active Filters
          </Button>
        )}
      </div>
    </Card>
  );
}
