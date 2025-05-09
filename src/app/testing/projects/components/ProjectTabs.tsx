import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { File, FolderGit2, Plus } from "lucide-react";
import React from "react";

export default function ProjectTabs({ project }: { project: any }) {
  return (
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
              {project.files && project.files.length > 0 ? (
                project.files.map((file: any, index: number) => (
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
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No files uploaded yet.</p>
              )}
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
          <TabsContent value="timeline" className="p-6">
            <div className="text-center text-muted-foreground">Timeline feature coming soon.</div>
          </TabsContent>
          <TabsContent value="discussions" className="p-6">
            <div className="text-center text-muted-foreground">Discussions feature coming soon.</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
