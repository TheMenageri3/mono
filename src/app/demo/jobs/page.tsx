"use client";

import React, { useState } from "react";
import { Search, Filter, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobCard } from "./components/JobCard";
import { JobFiltersSidebar } from "./components/JobFiltersSidebar";
import { mockJobs } from "./data/mockJobs";
import { FilterState, SortOption } from "./types/job.types";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [web3Only, setWeb3Only] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    experienceLevels: [],
    employmentTypes: [],
    remoteOptions: [],
    techStack: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>("date");

  // Filter and sort jobs
  const filteredJobs = mockJobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesWeb3 =
        !web3Only ||
        job.techStack.some((tech) =>
          [
            "Solana",
            "Web3",
            "Blockchain",
            "Solidity",
            "Rust",
            "Cryptography",
          ].includes(tech)
        );

      const matchesExperience =
        filters.experienceLevels.length === 0 ||
        filters.experienceLevels.includes(job.experienceLevel);

      const matchesEmployment =
        filters.employmentTypes.length === 0 ||
        filters.employmentTypes.includes(job.employmentType);

      const matchesRemote =
        filters.remoteOptions.length === 0 ||
        filters.remoteOptions.includes(job.remoteOption);

      const matchesTechStack =
        filters.techStack.length === 0 ||
        filters.techStack.some((tech) =>
          job.techStack.some((jobTech) =>
            jobTech.toLowerCase().includes(tech.toLowerCase())
          )
        );

      return (
        matchesSearch &&
        matchesWeb3 &&
        matchesExperience &&
        matchesEmployment &&
        matchesRemote &&
        matchesTechStack
      );
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        );
      } else if (sortBy === "salary") {
        return b.salaryMax - a.salaryMax;
      }
      return 0;
    });

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Background elements */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-fuchsia-500/20 rounded-full blur-[100px]" />
      </div>
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  Jobs
                </h1>
              </div>
              <p className="text-lg text-gray-300">
                Find your next role in tech and web3
              </p>
            </div>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs, companies, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/30 border-white/10"
              />
            </div>
          </div>
        </header>

        {/* Main Layout with Sidebar */}
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-80 hidden lg:block">
            <JobFiltersSidebar
              filters={filters}
              setFilters={setFilters}
              web3Only={web3Only}
              setWeb3Only={setWeb3Only}
            />
          </div>

          {/* Jobs List */}
          <div className="flex-1">
            {/* Top Controls Bar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="border-white/10 bg-black/30 lg:hidden"
                  onClick={() => {
                    /* Mobile filter toggle */
                  }}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Jobs
                </Button>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-6 h-6 bg-purple-500/20 rounded-md flex items-center justify-center border border-purple-500/30">
                    <div className="w-3 h-3 bg-purple-400 rounded-sm"></div>
                  </div>
                  <span>
                    Found{" "}
                    <span className="text-white font-medium">
                      {filteredJobs.length}
                    </span>{" "}
                    matching jobs
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <Button
                  variant={sortBy === "date" ? "default" : "ghost"}
                  size="sm"
                  className={
                    sortBy === "date"
                      ? "bg-purple-500 hover:bg-purple-600 text-white"
                      : "hover:bg-white/5 text-gray-300"
                  }
                  onClick={() => setSortBy("date")}
                >
                  Date ↓
                </Button>
                <Button
                  variant={sortBy === "salary" ? "default" : "ghost"}
                  size="sm"
                  className={
                    sortBy === "salary"
                      ? "bg-purple-500 hover:bg-purple-600 text-white"
                      : "hover:bg-white/5 text-gray-300"
                  }
                  onClick={() => setSortBy("salary")}
                >
                  Salary
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Empty State */}
            {filteredJobs.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="outline"
                  className="border-white/10 bg-black/30"
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({
                      experienceLevels: [],
                      employmentTypes: [],
                      remoteOptions: [],
                      techStack: [],
                    });
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
