"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useState } from "react";
import {
  PlusIcon,
  CheckIcon,
  TagIcon,
  Trash2Icon,
  PencilIcon,
} from "lucide-react";
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
import { Separator } from "@/components/primitives/separator";
import { showToast } from "@/components/ui/toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ApplicationStatus,
  Class,
  ClassApplication,
  Profile,
} from "@/generated/prisma";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

export default function ClassApplicationsPage() {
  const utils = api.useUtils();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [classId, setClassId] = useState<string>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Query to fetch all classApplications
  const { data: classApplications, isLoading } =
    api.classApplication.read.useQuery({});

  console.log(classApplications);

  const { data: classes } = api.class.read.useQuery({});

  // Mutation to create a classApplication
  const createClassApplication = api.classApplication.create.useMutation({
    onSuccess: () => {
      void utils.classApplication.read.invalidate();
      setTitle("");
      setDescription("");
      setStatus("");
      setStartDate(undefined);
      setEndDate(undefined);
      setClassId("");
      showToast.success({
        title: "Class Application created",
        description: `The class application "${title}" has been created successfully.`,
      });
    },
    onError: (error) => {
      showToast.error({
        title: "Error",
        description: error.message || "Failed to create class application",
      });
    },
  });

  const handleCreateClassApplication = () => {
    if (!title.trim()) return;
    if (!description.trim()) return;
    if (!status) return;
    if (!startDate) return;
    if (!endDate) return;
    if (!classId) return;

    console.log({
      title: title.trim(),
      description: description.trim(),
      status: status as ApplicationStatus,
      startDate: startDate,
      endDate: endDate,
      classId: classId,
      // publisherId: publisherId
    });

    createClassApplication.mutate({
      title: title.trim(),
      description: description.trim(),
      status: status as ApplicationStatus,
      startDate: startDate,
      endDate: endDate,
      classId: classId,
      // publisherId: publisherId
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Class Application Management</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add New Class Application
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Class Application</DialogTitle>
              <DialogDescription>
                Create a new class application.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select onValueChange={setStatus} defaultValue={status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ApplicationStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Start Date
                </Label>
                <DatePicker date={startDate} onSelect={setStartDate} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  End Date
                </Label>
                <DatePicker date={endDate} onSelect={setEndDate} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-right">
                  Class
                </Label>
                <Select onValueChange={setClassId} defaultValue={classId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes &&
                      classes.length > 0 &&
                      classes.map((class_) => (
                        <SelectItem key={class_.id} value={class_.id}>
                          {class_.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Add publisher from profile */}
            </div>

            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateClassApplication}
                disabled={!title.trim() || createClassApplication.isPending}
              >
                {createClassApplication.isPending
                  ? "Creating..."
                  : "Create ClassApplication"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TagIcon className="h-5 w-5" />
            <span>Class Applications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            classApplications &&
            classApplications.length > 0 && (
              <ScrollArea className="h-[400px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {classApplications.map((classApplication) => (
                    <ClassApplicationCard
                      key={classApplication.id}
                      classApplication={classApplication}
                    />
                  ))}
                </div>
              </ScrollArea>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface ExtendedClassApplication extends ClassApplication {
  class: Class;
  publisher: Profile | null;
}

function ClassApplicationCard({
  classApplication,
}: {
  classApplication: ExtendedClassApplication;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-xs text-muted-foreground ml-3">Title:</span>
            <span className="text-xs text-muted-foreground ml-3">
              {classApplication.title}
            </span>
          </div>
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <span className="text-xs text-muted-foreground">Description:</span>
            <span className="text-xs text-muted-foreground ml-3">
              {classApplication.description}
            </span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Status:</span>
            <span className="text-xs text-muted-foreground ml-3">
              {classApplication.status}
            </span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Start Date:</span>
            <span className="text-xs text-muted-foreground ml-3">
              {classApplication.startDate.toString()}
            </span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">End Date:</span>
            <span className="text-xs text-muted-foreground ml-3">
              {classApplication.endDate.toString()}
            </span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Class:</span>
            <span className="text-xs text-muted-foreground ml-3">
              {classApplication.class.title}
            </span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Publisher:</span>
            <span className="text-xs text-muted-foreground ml-3">
              {classApplication.publisher
                ? classApplication.publisher.username
                : "N/A"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
