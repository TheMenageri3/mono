import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock } from "lucide-react";
import React from "react";

export default function ProjectCard({ project }: { project: any }) {
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
