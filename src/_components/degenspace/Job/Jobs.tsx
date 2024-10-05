import React from "react";
import { HorizontalLine } from "../UtilComponents/Horizontalline";
import { jobsData } from "./dummyData";
import { JobCard } from "./JobCard";

export const Jobs = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col w-full items-start gap-[10px]">
        {jobsData.map((job) => (
          <JobCard key={job.jobTitle} job={job} />
        ))}
      </div>
    </React.Fragment>
  );
};
