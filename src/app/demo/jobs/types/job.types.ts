export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  experienceLevel:
    | "Entry Level"
    | "Mid Level"
    | "Senior Level"
    | "Executive Level";
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  remoteOption: "Remote" | "Hybrid" | "On-site";
  salaryMin: number;
  salaryMax: number;
  techStack: string[];
  postedDate: string;
}

export interface FilterState {
  experienceLevels: string[];
  employmentTypes: string[];
  remoteOptions: string[];
  techStack: string[];
}

export type SortOption = "date" | "salary";
