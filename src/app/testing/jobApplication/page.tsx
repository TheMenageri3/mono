"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/components/ui/toast";
import { api } from "@/trpc/react";
import { BriefcaseIcon, PencilIcon, PlusIcon, Trash2Icon, Upload, X } from "lucide-react";
import { useState } from "react";

export interface JobApplication {
  id: string;
  coverLetter: string | null;
  additionalMaterialsIds?: string[] | null;
  status?:
    | "DRAFT"
    | "SUBMITTED"
    | "UNDER_REVIEW"
    | "INTERVIEWING"
    | "OFFERED"
    | "ACCEPTED"
    | "DECLINED"
    | "REJECTED";
  referralSource?: string | null;
  submissionDate?: Date | null;
  withdrawnDate?: Date | null;
  withdrawnReason?: string | null;
  internalNotes?: string | null;
  referralProfileId?: string | null;
  jobPostingId: string;
  resumeId: string;
}

export interface BaseJobPosting {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  location: string;
  remoteOption: "ON_SITE" | "HYBRID" | "REMOTE";
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
  experienceLevel: "ENTRY" | "MID" | "SENIOR" | "EXECUTIVE";
  educationRequirements?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  benefits?: string | null;
  applicationInstructions?: string | null;
  externalPostingUrl?: string | null;
  internalNotes?: string | null;
  status?: "DRAFT" | "OPEN" | "FILLED" | "CLOSED";
  postedDate?: Date;
  deadlineDate?: Date;
  hiringManagerId: string;
  companyId: string;
  //   industryIds: string[];
}

const defaultJobApplication: JobApplication = {
  id: "",
  jobPostingId: "",
  resumeId: "",
  coverLetter: "",
  additionalMaterialsIds: [],
  status: "DRAFT",
  referralSource: "",
  submissionDate: undefined,
  internalNotes: "",
  referralProfileId: "",
};

export default function JobPostingsPage() {
  // Query to fetch all job posting
  const { data: jobPostings, isLoading: postingLoading } =
    api.jobPosting.read.useQuery();
  // Query to fetch all job application
  const { data: jobApplications, isLoading: applicationLoading } =
    api.jobApplication.readAll.useQuery();

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Application</h1>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Postings</TabsTrigger>
          <TabsTrigger value="application">Applications</TabsTrigger>
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
              {postingLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : jobPostings && jobPostings.length > 0 ? (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="grid grid-cols-1 gap-3">
                    {jobPostings?.map((job) => (
                      <JobPostingCard
                        key={job.id}
                        job={{
                          ...job,
                          deadlineDate: job.deadlineDate ?? undefined,
                          postedDate: job.postedDate ?? undefined,
                          status: job.status ?? "",
                          hiringManagerId: job.hiringManagerId ?? "",
                          companyId: job.companyId ?? "",
                        }}
                      />
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="py-12 text-center border border-dashed rounded-lg">
                  <BriefcaseIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No job postings yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="application">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5" />
                <span>Job Applications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {postingLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : jobApplications && jobApplications.length > 0 ? (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="grid grid-cols-1 gap-3">
                    {jobApplications?.map((job) => (
                      <JobApplicationCard key={job.id} job={job} />
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="py-12 text-center border border-dashed rounded-lg">
                  <BriefcaseIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No application yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

type FileType = {
  name: string;
  type: string;
  size: number;
  url?: string;
};

function JobPostingCard({ job }: { job: BaseJobPosting }) {
  const utils = api.useUtils();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<JobApplication>(
    defaultJobApplication
  );

  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);

  // Mutation to create a job application
  const createJobApplication = api.jobApplication.create.useMutation({
    onSuccess: () => {
      void utils.jobApplication.readAll.invalidate();
      setIsDialogOpen(false);
      showToast.success({
        title: "Application submitted",
        description: "Your job application has been submitted successfully.",
      });
    },
    onError: (error) => {
      showToast.error({
        title: "Error",
        description: error.message || "Failed to create job application",
      });
    },
  });

  const handleCreateJobPosting = () => {
    const sanitizedData = {
      ...formData,
      jobPostingId: job.id,
      coverLetter: formData.coverLetter ?? "",
      additionalMaterialsIds: formData.additionalMaterialsIds ?? undefined,
      referralSource: formData.referralSource ?? undefined,
      referralProfileId: formData.referralProfileId ?? undefined,
      submissionDate: formData.submissionDate ?? undefined,
      withdrawnDate: formData.withdrawnDate ?? undefined,
      internalNotes: formData.internalNotes ?? undefined,
      withdrawnReason: formData.withdrawnReason ?? undefined,
    };
    createJobApplication.mutate(sanitizedData);
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      }));

      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    if (newFiles[index].url) URL.revokeObjectURL(newFiles[index].url);
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };


  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-sm text-muted-foreground">
              {job.shortDescription}
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{job.remoteOption}</Badge>
                <Badge variant="secondary">{job.employmentType}</Badge>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="flex items-center gap-2"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Apply
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>{job.title}</DialogTitle>
                    <DialogDescription>
                      Fill in the details for the new job position.
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="max-h-[60vh]">
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="coverLetter" className="text-right">
                          Cover Letter
                        </Label>
                        <Textarea
                          id="coverLetter"
                          value={formData.coverLetter ?? ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              coverLetter: e.target.value,
                            })
                          }
                          className="col-span-3"
                          rows={4}
                        />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="referralSource" className="text-right">
                          Referral Source
                        </Label>
                        <Input
                          id="referralSource"
                          value={formData.referralSource ?? ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              referralSource: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>Resume</CardTitle>
                          <CardDescription>
                            Upload your resume for this job application. Only PDF and DOC files are accepted. Maximum file size is 5MB.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="file">Upload Documents</Label>
                            <div className="flex items-center gap-2">
                              <Label
                                htmlFor="file-upload"
                                className="cursor-pointer border-2 border-dashed rounded-md px-3 py-2 flex items-center gap-2 hover:bg-accent"
                              >
                                <Upload className="h-4 w-4" />
                                <span>Choose files</span>
                              </Label>
                              <Input
                                id="file-upload"
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                multiple
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Upload relevant documents (PDF, DOC, JPG)
                            </p>
                          </div>

                          {uploadedFiles.length > 0 && (
                            <div className="border rounded-md p-3">
                              <p className="text-sm font-medium mb-2">
                                Uploaded files:
                              </p>
                              <div className="space-y-2">
                                {uploadedFiles.map((file, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between items-center bg-accent/30 rounded-md p-2"
                                  >
                                    <div className="flex flex-col">
                                      <p className="text-sm font-medium">
                                        {file.name}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {(file.size / 1024).toFixed(1)} KB
                                      </p>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeFile(index)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
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
                      {createJobApplication.isPending ? "Applying..." : "Apply"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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

function JobApplicationCard({ job }: { job: JobApplication }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">
              Application Status: {job.status}
            </h3>
            <p className="text-sm text-muted-foreground">
              {job?.coverLetter?.substring(0, 150)}...
            </p>
            <div className="flex gap-2 mt-2">
              <div className="flex flex-col gap-2">
                <Badge variant="secondary">
                  Referral Source: {job.referralSource || "N/A"}
                </Badge>
                <Badge variant="outline">
                  Submitted:{" "}
                  {job.submissionDate
                    ? new Date(job.submissionDate).toLocaleDateString()
                    : "Not submitted"}
                </Badge>
              </div>
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
