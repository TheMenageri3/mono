"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjectMutations } from "../hooks/useProjectMutations";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(50, { message: "Title cannot exceed 50 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description cannot exceed 500 characters" }),
  category: z.string({
    required_error: "Please select a project category",
  }),
  dueDate: z.string().optional(),
  visibility: z.enum(["public", "private"], {
    required_error: "Please select project visibility",
  }),
});

export default function ProjectCreationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      visibility: "private",
    },
  });

  const { useCreateProject } = useProjectMutations();
  const { createProject, isPending } = useCreateProject();

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Map form data to API shape
    createProject({
      title: data.title,
      description: data.description,
      shortDescription: data.description.slice(0, 100), // or add a field for this
      status: "IN_PROGRESS", // or let user pick
      visibility: data.visibility === "public" ? "PUBLIC" : "PRIVATE",
      githubUrl: "https://example.com", // must be a valid URL
      demoUrl: "https://example.com",   // must be a valid URL
      outcome: "No outcome yet", // must be a non-empty string
      challenges: "No challenges yet", // must be a non-empty string
      isFeatured: false, // or add field if needed
      startDatetime: new Date().toISOString(),
      endDatetime: data.dueDate ? new Date(data.dueDate).toISOString() : new Date().toISOString(),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
              </FormControl>
              <FormDescription>
                A clear, descriptive name for your project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your project's goals, scope, and deliverables"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Help team members understand what this project is about
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web3">Web3 Development</SelectItem>
                      <SelectItem value="frontend">
                        Frontend Development
                      </SelectItem>
                      <SelectItem value="backend">
                        Backend Development
                      </SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="research">Research Project</SelectItem>
                      <SelectItem value="design">Design Project</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date (Optional)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>
                  When should this project be completed?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Visibility</FormLabel>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div
                  className={`border rounded-md p-4 cursor-pointer ${
                    field.value === "public"
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() => form.setValue("visibility", "public")}
                >
                  <div className="font-medium mb-1">Public</div>
                  <div className="text-sm text-muted-foreground">
                    Visible to all members of the classroom
                  </div>
                </div>
                <div
                  className={`border rounded-md p-4 cursor-pointer ${
                    field.value === "private"
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() => form.setValue("visibility", "private")}
                >
                  <div className="font-medium mb-1">Private</div>
                  <div className="text-sm text-muted-foreground">
                    Only visible to invited members
                  </div>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>Create Project</Button>
        </div>
      </form>
    </Form>
  );
}
