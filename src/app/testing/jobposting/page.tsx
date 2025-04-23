"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useState } from "react";
import { PlusIcon, BriefcaseIcon, Trash2Icon, PencilIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { showToast } from "@/components/ui/toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { baseJobPostingSchema } from "@/server/api/routers/jobPosting/schema";
import { z } from "zod";
import { DatePicker } from "@/components/ui/date-picker";

type BaseJobPosting = z.infer<typeof baseJobPostingSchema>;

const defaultJobPosting: BaseJobPosting = {
  title: "",
  description: "",
  shortDescription: "",
  location: "",
  remoteOption: "ON_SITE",
  employmentType: "FULL_TIME",
  experienceLevel: "ENTRY",
  educationRequirements: undefined,
  salaryMin: undefined,
  salaryMax: undefined,
  benefits: undefined,
  applicationInstructions: undefined,
  externalPostingUrl: undefined,
  internalNotes: undefined,
  status: "DRAFT",
  postedDate: new Date(),
  deadlineDate: undefined,
  // industryIds: [] as string[],
};

export default function JobPostingsPage() {
  const utils = api.useUtils();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<BaseJobPosting>(defaultJobPosting);

  // Query to fetch all job postings
  const { data: jobPostings, isLoading } = api.jobPosting.read.useQuery();

  // Mutation to create a job posting
  const createJobPosting = api.jobPosting.create.useMutation({
    onSuccess: () => {
      void utils.jobPosting.read.invalidate();
      setIsDialogOpen(false);
      showToast.success({
        title: "Job Posted",
        description: `The job "${formData.title}" has been posted successfully.`,
      });
    },
    onError: (error) => {
      showToast.error({
        title: "Error",
        description: error.message || "Failed to create job posting",
      });
    },
  });

  const handleCreateJobPosting = () => {
    createJobPosting.mutate(formData);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Postings</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Create New Job Posting</DialogTitle>
              <DialogDescription>
                Fill in the details for the new job position.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="shortDescription" className="text-right">
                    Short Description
                  </Label>
                  <Textarea
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shortDescription: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Remote Option</Label>
                  <Select
                    onValueChange={(value: "ON_SITE" | "HYBRID" | "REMOTE") =>
                      setFormData({ ...formData, remoteOption: value })
                    }
                    defaultValue={formData.remoteOption}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select remote option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ON_SITE">On Site</SelectItem>
                      <SelectItem value="HYBRID">Hybrid</SelectItem>
                      <SelectItem value="REMOTE">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Employment Type</Label>
                  <Select
                    onValueChange={(
                      value:
                        | "FULL_TIME"
                        | "PART_TIME"
                        | "CONTRACT"
                        | "INTERNSHIP"
                    ) => setFormData({ ...formData, employmentType: value })}
                    defaultValue={formData.employmentType}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FULL_TIME">Full Time</SelectItem>
                      <SelectItem value="PART_TIME">Part Time</SelectItem>
                      <SelectItem value="CONTRACT">Contract</SelectItem>
                      <SelectItem value="INTERNSHIP">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Experience Level</Label>
                  <Select
                    onValueChange={(
                      value: "ENTRY" | "MID" | "SENIOR" | "EXECUTIVE"
                    ) => setFormData({ ...formData, experienceLevel: value })}
                    defaultValue={formData.experienceLevel}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ENTRY">Entry Level</SelectItem>
                      <SelectItem value="MID">Mid Level</SelectItem>
                      <SelectItem value="SENIOR">Senior Level</SelectItem>
                      <SelectItem value="EXECUTIVE">Executive Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Full Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Education Requirements
                  </Label>
                  <Textarea
                    id="educationRequirements"
                    value={formData.educationRequirements as string}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        educationRequirements: e.target.value,
                      })
                    }
                    className="col-span-3"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="salary" className="text-right">
                    Salary Range
                  </Label>
                  <div className="col-span-3 flex gap-4">
                    <Input
                      id="salaryMin"
                      type="number"
                      placeholder="Min"
                      value={formData.salaryMin ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salaryMin: e.target.value
                            ? Number(e.target.value)
                            : null,
                        })
                      }
                    />
                    <Input
                      id="salaryMax"
                      type="number"
                      placeholder="Max"
                      value={formData.salaryMax ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salaryMax: e.target.value
                            ? Number(e.target.value)
                            : null,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="benefits" className="text-right">
                    Benefits
                  </Label>
                  <Textarea
                    id="benefits"
                    value={formData.benefits ?? ""}
                    onChange={(e) =>
                      setFormData({ ...formData, benefits: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="List the benefits package"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="applicationInstructions"
                    className="text-right"
                  >
                    Application Instructions
                  </Label>
                  <Textarea
                    id="applicationInstructions"
                    value={formData.applicationInstructions ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        applicationInstructions: e.target.value,
                      })
                    }
                    className="col-span-3"
                    placeholder="How to apply for this position"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="industries" className="text-right">
                    Industries
                  </Label>
                  <div className="col-span-3">
                    <Select
                      // onValueChange={(value) =>
                      //   setFormData({
                      //     ...formData,
                      //     industryIds: [...(formData.industryIds ?? []), value],
                      //   })
                      // }
                      value=""
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Industries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* <div className="flex flex-wrap gap-2 mt-2">
                    {(formData.industryIds ?? []).map((id) => (
                      <Badge
                        key={id}
                        variant="default"
                        className="flex flex-row items-center justify-start cursor-pointer"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            industryIds: (formData.industryIds ?? []).filter((i) => i !== id),
                          })
                        }
                      >
                        {id}
                        <Button className="p-2 text-2xl " aria-label="Remove">
                          ×
                        </Button>
                      </Badge>
                    ))}
                  </div> */}
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="externalPostingUrl" className="text-right">
                    External URL
                  </Label>
                  <Input
                    id="externalPostingUrl"
                    value={formData.externalPostingUrl ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        externalPostingUrl: e.target.value,
                      })
                    }
                    className="col-span-3"
                    placeholder="Link to external job posting"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deadlineDate" className="text-right">
                    Application Deadline
                  </Label>
                  <DatePicker
                    date={formData.deadlineDate || undefined}
                    onSelect={(e) =>
                      setFormData({
                        ...formData,
                        deadlineDate: e,
                      })
                    }
                  />
                </div>
              </div>
            </ScrollArea>

            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateJobPosting}>
                {createJobPosting.isPending
                  ? "Creating..."
                  : "Create Job Posting"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Postings</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5" />
                <span>Job Listings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : jobPostings && jobPostings.length > 0 ? (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="grid grid-cols-1 gap-3">
                    {jobPostings.map((job) => (
                      <JobPostingCard
                        key={job.id}
                        job={{
                          ...job,
                          deadlineDate: job.deadlineDate ?? undefined,
                          postedDate: job.postedDate ?? undefined,
                          companyId: job.companyId ?? undefined,
                          hiringManagerId: job.hiringManagerId ?? undefined,
                        }}
                      />
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="py-12 text-center border border-dashed rounded-lg">
                  <BriefcaseIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No job postings yet</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Create your first job posting
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function JobPostingCard({
  job,
}: {
  job: BaseJobPosting & {
    id: string;
    postedDate?: Date | undefined;
    deadlineDate?: Date | undefined;
    companyId?: string | undefined;
    hiringManagerId?: string | undefined;
  };
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-sm text-muted-foreground">
              {job.shortDescription}
            </p>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">{job.remoteOption}</Badge>
              <Badge variant="secondary">{job.employmentType}</Badge>
            </div>
          </div>
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive"
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
