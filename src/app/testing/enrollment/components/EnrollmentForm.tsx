"use client";

import React from "react";
import { useEnrollmentForm } from "../hooks/useEnrollmentForm";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EnrollmentStatus } from "@/generated/prisma";

export default function EnrollmentForm({ onClose }: { onClose: () => void }) {
  const { form, createMutation } = useEnrollmentForm(onClose);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Create Enrollment</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit((data) => createMutation.mutate(data))}>
          <ScrollArea className="h-[70vh] pr-2">
            <div className="space-y-6">
              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(EnrollmentStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Student ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="classId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Class ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="finalGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Final Grade</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="enrollmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enrollment Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="completionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completion Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || createMutation.isPending}>
              {createMutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
