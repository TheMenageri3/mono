"use client";

import React from "react";
import { MapPin, Calendar, DollarSign, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "../types/job.types";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const formatSalary = (min: number, max: number) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getRemoteOptionColor = (option: string) => {
    switch (option) {
      case "Remote":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Hybrid":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "On-site":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getApplyButtonVariant = (option: string) => {
    switch (option) {
      case "Remote":
        return "bg-gradient-to-r from-green-400 to-yellow-500 hover:from-green-500 hover:to-yellow-600 text-black font-medium shadow-lg shadow-green-500/25";
      case "Hybrid":
        return "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/25";
      case "On-site":
        return "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/25";
      default:
        return "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/25";
    }
  };

  return (
    <Card className="border-white/10 bg-black/30 backdrop-blur-md hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/5 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="font-medium">{job.company}</span>
                <span className="text-gray-500">•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="text-sm">{job.location}</span>
                </div>
              </div>
            </div>

            {/* Remote Option Badge */}
            <Badge
              variant="outline"
              className={`${getRemoteOptionColor(job.remoteOption)} px-3 py-1`}
            >
              {job.remoteOption}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
            {job.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {job.techStack.slice(0, 5).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="border-purple-400/30 text-purple-300 bg-purple-500/10 text-xs px-2 py-1"
              >
                {tech}
              </Badge>
            ))}
            {job.techStack.length > 5 && (
              <Badge
                variant="outline"
                className="border-gray-400/30 text-gray-400 bg-gray-500/10 text-xs px-2 py-1"
              >
                +{job.techStack.length - 5} more
              </Badge>
            )}
          </div>

          {/* Job Details */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-green-400" />
              <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-purple-400" />
              <span>Posted {formatDate(job.postedDate)}</span>
            </div>
            <Badge
              variant="outline"
              className="border-white/20 text-white bg-white/5 text-xs"
            >
              {job.experienceLevel}
            </Badge>
            <Badge
              variant="outline"
              className="border-white/20 text-white bg-white/5 text-xs"
            >
              {job.employmentType}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-32">
          <Button
            className={`${getApplyButtonVariant(
              job.remoteOption
            )} transition-all`}
            size="sm"
          >
            Apply Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 bg-black/30 hover:bg-white/5 text-white"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
