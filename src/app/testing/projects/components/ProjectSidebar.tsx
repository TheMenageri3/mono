import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Star, Users } from "lucide-react";
import React from "react";

export default function ProjectSidebar({ project }: { project: any }) {
  return (
    <div className="space-y-6">
      {/* Team Members */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-md">Project Team</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {project.members.map((member: any) => (
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
  );
}
