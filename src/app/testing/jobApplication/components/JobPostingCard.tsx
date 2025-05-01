"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { JobPosting } from "@/generated/prisma";
import { createJobApplicationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, PlusIcon, Trash2Icon, Upload, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useJobApplicationMutations } from "../hooks/useJobApplicationMutations";

type FileType = {
  name: string;
  type: string;
  size: number;
  url?: string;
};

type CreateJobApplicationInput = z.infer<typeof createJobApplicationSchema>;

export default function JobPostingCard({ job }: { job: JobPosting }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const { useCreateJobApplication } = useJobApplicationMutations();
  const { createJobApplication, isPending } = useCreateJobApplication();

  const form = useForm<CreateJobApplicationInput>({
    resolver: zodResolver(createJobApplicationSchema),
    defaultValues: {
      coverLetter: "",
      internalNotes: "",
      submissionDate: new Date(),
      status: "DRAFT",
      jobPostingId: "",
      referralProfileId: "",
      referralSource: "",
      resumeId: "",
      additionalMaterialsIds: []
    },
  });

  const onSubmit = (data: CreateJobApplicationInput) => {
    createJobApplication(data);
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
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <div className="grid gap-4 py-4">
                          <FormField
                          control={form.control}
                          name="coverLetter"
                          render={({ field }) => (
                            <FormItem>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                              htmlFor="coverLetter"
                              className="text-right"
                              >
                              Cover Letter
                              </Label>
                              <FormControl>
                              <Textarea
                                id="coverLetter"
                                {...field}
                                className="col-span-3"
                                rows={4}
                              />{" "}
                              </FormControl>
                              <FormMessage />
                            </div>
                            </FormItem>
                          )}
                          />

                          <FormField
                          control={form.control}
                          name="referralSource"
                          render={({ field }) => (
                            <FormItem>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                              htmlFor="referralSource"
                              className="text-right"
                              >
                              Referral Source
                              </Label>
                              <FormControl>
                              <Input id="referralSource" {...field} />
                              </FormControl>
                              <FormMessage />
                            </div>
                            </FormItem>
                          )}
                          />

                          <FormField
                          control={form.control}
                          name="resumeId"
                          render={({ field }) => (
                            <FormItem>
                            <Card>
                              <CardHeader>
                              <CardTitle>Resume</CardTitle>
                              <CardDescription>
                                Upload your resume for this job application.
                                Only PDF and DOC files are accepted. Maximum
                                file size is 5MB.
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
                                <FormControl>
                                  <Input
                                  id="file-upload"
                                  type="file"
                                  onChange={(e) => {
                                    handleFileChange(e);
                                    field.onChange(e);
                                  }}
                                  className="hidden"
                                  multiple
                                  />
                                </FormControl>
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
                              <FormMessage />
                              </CardContent>
                            </Card>
                            </FormItem>
                          )}
                          />
                        </div>
                        <Button type="submit" disabled={isPending}>
                          {isPending ? "Applying..." : "Apply"}
                        </Button>
                      </form>
                    </Form>
                  </ScrollArea>
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
