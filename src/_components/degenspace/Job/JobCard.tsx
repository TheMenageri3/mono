import React from "react";
import { HorizontalLine } from "../UtilComponents/Horizontalline";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import P from "../P";

export type JobData = {
  companyName: string;
  jobTitle: string;
  location: string;
  jobDescription: string;
  skills: string;
  compensation: string;
  longDescription: string;
};

type JobCardProps = {
  job: JobData;
};

const ReadMore = ({ job }: { job: JobData }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Read More</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-primary font-bold">
          <div className="flex flex-col">
            <P className="text-[20px] font-bold">{job.companyName}</P>
            <P className="text-[16px] font-bold text-primary/90">
              {job.location}
            </P>
            <P className="text-[16px] text-primary font-bold">{job.skills}</P>
          </div>
        </DialogTitle>
        <div className="flex flex-col gap-[15px] justify-between">
          <P className="text-[18px]">{job.longDescription}</P>
          <Button>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <React.Fragment>
      <div
        key={job.jobTitle}
        className="flex flex-col gap-[10px] w-full items-start p-[10px]"
      >
        <div className="flex flex-row gap-[10px] w-full items-start p-[10px]">
          <div className="flex flex-col gap-[5px]">
            <div className="flex flex-row gap-[5px] items-center">
              <P className="text-[20px] font-bold">{job.companyName}</P>
              <P className="text-[16px] font-bold text-primary/90">
                {job.location}
              </P>
            </div>
            <div>
              <P className="text-[22px] text-primary font-bold">
                {job.jobTitle}
              </P>
            </div>
            <div>
              <P className="text-[18px] font-[500]">{job.skills}</P>
            </div>
            <div>
              <P className="text-[18px] font-[500]">{job.jobDescription}</P>
            </div>

            <div>
              <P className="text-[18px] font-[500]">{job.compensation}</P>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-[10px] w-full p-[10px]">
          <ReadMore job={job} />
          <Button>Apply</Button>
        </div>
      </div>
      <HorizontalLine />
    </React.Fragment>
  );
};
