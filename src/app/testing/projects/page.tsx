"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/primitives/separator";
import {
  Calendar,
  Clock,
  File,
  FolderGit2,
  Plus,
  Star,
  Users,
} from "lucide-react";

export default function ProjectManagementPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Project Management Components
        </h1>
        <p className="text-muted-foreground">
          Components for project creation, viewing, and collaboration management
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Complete Project Management Example
        </h2>
        <div className="w-full mx-auto">
          <ProjectDetailsView />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Individual Components</h2>

        {/* Project Creation Form */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">1. Project Creation Form</h3>
          <div className="w-full max-w-2xl mx-auto border p-6 rounded-lg">
            <ProjectCreationForm />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Form for creating new projects with details.</p>
          </div>
        </div>

        {/* Project Card */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">2. Project Card</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <ProjectCard
              project={{
                id: "1",
                title: "Web3 Marketplace Dashboard",
                description:
                  "Building a dashboard for NFT marketplace analytics with real-time data visualization.",
                tags: ["React", "Web3", "Dashboard"],
                members: [
                  { id: "1", name: "Alex Johnson", avatar: "/avatars/01.png" },
                  { id: "2", name: "Maria Garcia", avatar: "/avatars/02.png" },
                ],
                dueDate: "May 15, 2025",
                status: "In progress",
              }}
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Compact project card for displaying in lists or grids.</p>
          </div>
        </div>

        {/* Collaborator Management */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">
            3. Collaborator Management
          </h3>
          <div className="w-full max-w-2xl mx-auto border p-6 rounded-lg">
            <CollaboratorManagement
              collaborators={[
                {
                  id: "1",
                  name: "Alex Johnson",
                  email: "alex@example.com",
                  role: "Owner",
                  avatar: "/avatars/01.png",
                },
                {
                  id: "2",
                  name: "Maria Garcia",
                  email: "maria@example.com",
                  role: "Editor",
                  avatar: "/avatars/02.png",
                },
                {
                  id: "3",
                  name: "Jamal Wilson",
                  email: "jamal@example.com",
                  role: "Viewer",
                  avatar: "/avatars/03.png",
                },
              ]}
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Interface for managing project collaborators and permissions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectDetailsView() {
  const project = {
    id: "proj-2023-001",
    title: "Decentralized Learning Platform",
    description:
      "A blockchain-powered educational platform with verifiable credentials and peer-to-peer knowledge sharing.",
    status: "In progress",
    createdAt: "March 10, 2025",
    dueDate: "August 30, 2025",
    tags: ["Blockchain", "Education", "Web3", "React"],
    progress: 65,
    owner: {
      id: "1",
      name: "Alex Johnson",
      avatar: "/avatars/01.png",
    },
    members: [
      {
        id: "1",
        name: "Alex Johnson",
        avatar: "/avatars/01.png",
        role: "Owner",
      },
      {
        id: "2",
        name: "Maria Garcia",
        avatar: "/avatars/02.png",
        role: "Editor",
      },
      {
        id: "3",
        name: "Jamal Wilson",
        avatar: "/avatars/03.png",
        role: "Editor",
      },
      {
        id: "4",
        name: "Sarah Chen",
        avatar: "/avatars/04.png",
        role: "Viewer",
      },
    ],
    files: [
      {
        name: "ProjectProposal.pdf",
        size: "2.4 MB",
        updatedAt: "Mar 12, 2025",
      },
      {
        name: "ArchitectureDiagram.png",
        size: "1.7 MB",
        updatedAt: "Apr 05, 2025",
      },
      {
        name: "ProgressReport.docx",
        size: "845 KB",
        updatedAt: "Apr 23, 2025",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content - 2/3 width */}
      <div className="lg:col-span-2 space-y-6">
        {/* Project Header */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{project.title}</CardTitle>
                <CardDescription className="mt-1">
                  Project ID: {project.id}
                </CardDescription>
              </div>
              <Badge
                variant={
                  project.status === "In progress" ? "default" : "outline"
                }
              >
                {project.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{project.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Created on</p>
                  <p>{project.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Due date</p>
                  <p>{project.dueDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Details Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="files" className="w-full">
              <TabsList className="w-full border-b rounded-none justify-start">
                <TabsTrigger value="files" className="rounded-none">
                  Files
                </TabsTrigger>
                <TabsTrigger value="tasks" className="rounded-none">
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="timeline" className="rounded-none">
                  Timeline
                </TabsTrigger>
                <TabsTrigger value="discussions" className="rounded-none">
                  Discussions
                </TabsTrigger>
              </TabsList>
              <TabsContent value="files" className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Project Files</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add File
                  </Button>
                </div>
                <div className="space-y-3">
                  {project.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border rounded-md p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <File className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {file.size} • Updated {file.updatedAt}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="tasks" className="p-6">
                <div className="text-center py-8">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <FolderGit2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-1">No tasks created yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create your first task to track project progress
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar - 1/3 width */}
      <div className="space-y-6">
        {/* Team Members */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-md">Project Team</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {project.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </CardFooter>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-md">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Star className="h-4 w-4 mr-2" />
              Star Project
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Manage Team
            </Button>
            <Button
              className="w-full justify-start text-destructive"
              variant="outline"
            >
              Archive Project
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProjectCreationForm() {
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      visibility: "private",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Project creation form data:", data);
    // Handle project creation logic
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
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Create Project</Button>
        </div>
      </form>
    </Form>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle>{project.title}</CardTitle>
          <Badge
            variant={project.status === "In progress" ? "default" : "outline"}
          >
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 my-3">
          {project.tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-normal text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex -space-x-2">
            {project.members.slice(0, 3).map((member: any) => (
              <Avatar
                key={member.id}
                className="border-2 border-background w-8 h-8"
              >
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
            ))}
            {project.members.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border-2 border-background text-xs font-medium">
                +{project.members.length - 3}
              </div>
            )}
          </div>

          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            Due {project.dueDate}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/30 px-6 py-3">
        <Button variant="ghost" size="sm" className="ml-auto">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

function CollaboratorManagement({ collaborators }: { collaborators: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Project Collaborators</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add People
        </Button>
      </div>

      <div className="border rounded-md">
        <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 border-b text-sm font-medium">
          <div className="col-span-5">User</div>
          <div className="col-span-4">Email</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-1"></div>
        </div>

        <div className="divide-y">
          {collaborators.map((collaborator) => (
            <div
              key={collaborator.id}
              className="grid grid-cols-12 gap-4 p-3 items-center"
            >
              <div className="col-span-5 flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={collaborator.avatar}
                    alt={collaborator.name}
                  />
                  <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm">{collaborator.name}</span>
              </div>
              <div className="col-span-4 text-sm text-muted-foreground">
                {collaborator.email}
              </div>
              <div className="col-span-2">
                <Select defaultValue={collaborator.role.toLowerCase()}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1 text-right">
                {collaborator.role !== "Owner" && (
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Remove</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted/30 rounded-md p-4 text-sm">
        <p className="font-medium mb-1">About permission levels</p>
        <ul className="text-muted-foreground space-y-1">
          <li>
            <strong>Owner:</strong> Full access including adding/removing
            members
          </li>
          <li>
            <strong>Editor:</strong> Can edit content but can&apos;t change
            project settings
          </li>
          <li>
            <strong>Viewer:</strong> Can view content but can&apos;t make
            changes
          </li>
        </ul>
      </div>
    </div>
  );
}
