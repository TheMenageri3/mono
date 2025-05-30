import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import React from "react";

export default function ProjectHeader({ project }: { project: any }) {
  return (
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl">{project.title}</CardTitle>
          <CardDescription className="mt-1">
            Project ID: {project.id}
          </CardDescription>
        </div>
        <Badge
          variant={project.status === "In progress" ? "default" : "outline"}
        >
          {project.status}
        </Badge>
      </div>
      <p className="text-muted-foreground mt-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag: string) => (
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
    </CardHeader>
  );
}
