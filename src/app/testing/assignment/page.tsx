"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { showToast } from "@/components/ui/toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PencilIcon, Trash2Icon, PlusIcon, FileTextIcon } from "lucide-react";
import {
  createAssignmentSchema,
  AssignmentTypeEnum,
  AssignmentStatusEnum,
  SubmissionTypeEnum,
} from "@/schemas/assignment";
import type { AssignmentType, AssignmentStatus, SubmissionType } from "@/generated/prisma";

// Infer TS type from Zod schema
type CreateAssignmentInput = z.infer<typeof createAssignmentSchema>;

// Default form values
const defaultValues: CreateAssignmentInput = {
  title: "",
  description: "",
  type: AssignmentTypeEnum.INDIVIDUAL,
  status: AssignmentStatusEnum.DRAFT,
  submissionType: SubmissionTypeEnum.TEXT,
  submissionInstructions: "",
  classId: "",
  pointsPossible: undefined,
  gradingRubric: undefined,
  releaseDate: undefined,
  dueDate: undefined,
  allowLateSubmissions: false,
  latePenalty: undefined,
};

export default function AssignmentPage() {
  const { data: session, status } = useSession();
  const utils = api.useUtils();

  const form = useForm<CreateAssignmentInput>({
    resolver: zodResolver(createAssignmentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const createMutation = api.assignment.create.useMutation({
    onSuccess: () => {
      void utils.assignment.read.invalidate();
      showToast.success({ title: "Assignment Created" });
      reset();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      showToast.error({ title: "Error", description: error.message });
    },
  });

  const updateMutation = api.assignment.update.useMutation({
    onSuccess: () => void utils.assignment.read.invalidate(),
  });

  const deleteMutation = api.assignment.delete.useMutation({
    onSuccess: () => void utils.assignment.read.invalidate(),
  });

  const { data: assignments, isLoading } = api.assignment.read.useQuery({ classId: "" });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [gradingRubricInput, setGradingRubricInput] = useState("");
  const [latePenaltyInput, setLatePenaltyInput] = useState("");
  const [gradingRubricError, setGradingRubricError] = useState(false);
  const [latePenaltyError, setLatePenaltyError] = useState(false);

  // Sync JSON fields
  useEffect(() => {
    try {
      const parsed = JSON.parse(gradingRubricInput);
      form.setValue("gradingRubric", parsed);
      setGradingRubricError(false);
    } catch {
      setGradingRubricError(true);
    }
  }, [gradingRubricInput]);

  useEffect(() => {
    try {
      const parsed = JSON.parse(latePenaltyInput);
      form.setValue("latePenalty", parsed);
      setLatePenaltyError(false);
    } catch {
      setLatePenaltyError(true);
    }
  }, [latePenaltyInput]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
        <h1 className="text-2xl font-bold mb-4">You must be signed in to access assignments.</h1>
        <Button onClick={() => (window.location.href = "/auth/login")}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Assignment Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={handleSubmit((data) => createMutation.mutate(data))}>
                <ScrollArea className="h-[70vh] pr-2">
                  <div className="space-y-6">
                    {/* Title */}
                    <FormField control={control} name="title" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Assignment Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {/* Description */}
                    <FormField control={control} name="description" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Assignment Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {/* Class ID */}
                    <FormField control={control} name="classId" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class ID</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., CLASS123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {/* Type */}
                    <FormField control={control} name="type" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger><SelectValue placeholder="Select type"/></SelectTrigger>
                            <SelectContent>
                              {Object.values(AssignmentTypeEnum).map(opt => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {/* Status */}
                    <FormField control={control} name="status" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger><SelectValue placeholder="Select status"/></SelectTrigger>
                            <SelectContent>
                              {Object.values(AssignmentStatusEnum).map(opt => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {/* Submission Type */}
                    <FormField control={control} name="submissionType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Submission Type</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger><SelectValue placeholder="Select submission type"/></SelectTrigger>
                            <SelectContent>
                              {Object.values(SubmissionTypeEnum).map(opt => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {/* Submission Instructions */}
                    <FormField control={control} name="submissionInstructions" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Submission Instructions</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {/* Points Possible */}
                    <FormField control={control} name="pointsPossible" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Points Possible</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {/* Grading Rubric */}
                    <FormItem>
                      <FormLabel>Grading Rubric (JSON)</FormLabel>
                      <FormControl>
                        <Input placeholder='{"criteria":...}' value={gradingRubricInput} onChange={e => setGradingRubricInput(e.target.value)} />
                      </FormControl>
                      {gradingRubricError && <p className="text-xs text-red-500">Invalid JSON</p>}
                    </FormItem>

                    {/* Release Date */}
                    <FormField control={control} name="releaseDate" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Release Date</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {/* Due Date */}
                    <FormField control={control} name="dueDate" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {/* Allow Late Submissions */}
                    <FormField control={control} name="allowLateSubmissions" render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Allow Late Submissions</FormLabel>
                      </FormItem>
                    )} />

                    {/* Late Penalty */}
                    <FormItem>
                      <FormLabel>Late Penalty (JSON)</FormLabel>
                      <FormControl>
                        <Input placeholder='{"penalty":0.1}' value={latePenaltyInput} onChange={e => setLatePenaltyInput(e.target.value)} />
                      </FormControl>
                      {latePenaltyError && <p className="text-xs text-red-500">Invalid JSON</p>}
                    </FormItem>
                  </div>
                </ScrollArea>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting || createMutation.isPending}>
                    {createMutation.isPending ? "Creating..." : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader><CardTitle><FileTextIcon className="h-5 w-5 inline-block" /> Assignments Library</CardTitle></CardHeader>
            <CardContent>
              {isLoading ? (
                <div>Loading…</div>
              ) : assignments && assignments.length ? (
                <ScrollArea className="h-[400px] pr-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {assignments.map(a => (
                      <Card key={a.id} className="p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{a.title}</h3>
                          <p className="text-xs text-muted-foreground">{a.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" onClick={() => updateMutation.mutate({ id: a.id, data: {} })}>
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteMutation.mutate({ id: a.id })}>
                            <Trash2Icon className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="py-12 text-center border border-dashed rounded-lg">
                  <FileTextIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No assignments yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="archived">
          <Card className="py-8 text-center">
            <p className="text-muted-foreground">Archived assignments coming soon…</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
