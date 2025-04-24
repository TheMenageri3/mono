"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// Predefined color options
const colorOptions = [
  "#FF5733", // Orange-red
  "#33FF57", // Green
  "#3357FF", // Blue
  "#F033FF", // Purple
  "#FF33A8", // Pink
  "#FFD700", // Gold
  "#00CED1", // Turquoise
  "#FF8C00", // Dark Orange
];

export default function TagsPage() {
  const utils = api.useUtils();
  const [tagName, setTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Query to fetch all tags
  const { data: tags, isLoading } = api.tag.read.useQuery();

  // Mutation to create a tag
  const createTag = api.tag.create.useMutation({
    onSuccess: () => {
      void utils.tag.read.invalidate();
      setTagName("");
      setIsDialogOpen(false);
      showToast.success({
        title: "Tag created",
        description: `The tag "${tagName}" has been created successfully.`,
      });
    },
    onError: (error) => {
      showToast.error({
        title: "Error",
        description: error.message || "Failed to create tag",
      });
    },
  });

  const handleCreateTag = () => {
    if (!tagName.trim()) return;

    createTag.mutate({
      tagName: tagName.trim(),
      color: selectedColor,
    });
	console.log("done")
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tag Management</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add New Tag
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Tag</DialogTitle>
              <DialogDescription>
                Create a new tag to categorize content across the platform.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tagName" className="text-right">
                  Name
                </Label>
                <Input
                  id="tagName"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  placeholder="Enter tag name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Color</Label>
                <div className="flex flex-wrap gap-2 col-span-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`h-8 w-8 rounded-full transition-transform ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-primary scale-110"
                          : "hover:scale-110"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    >
                      {selectedColor === color && (
                        <CheckIcon className="h-4 w-4 text-white m-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Preview</Label>
                <div className="col-span-3 p-3 bg-background/50 rounded-md flex items-center justify-center border">
                  <TagPreview
                    color={selectedColor}
                    name={tagName || "Preview"}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateTag}
                disabled={!tagName.trim() || createTag.isPending}
              >
                {createTag.isPending ? "Creating..." : "Create Tag"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Tags</TabsTrigger>
          <TabsTrigger value="recent">Recently Used</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TagIcon className="h-5 w-5" />
                <span>Tags Library</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : tags && tags.length > 0 ? (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tags.map((tag) => (
                      <TagCard key={tag.tagName} tag={tag} />
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="py-12 text-center border border-dashed rounded-lg">
                  <TagIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No tags created yet</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Create your first tag
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                Recently used tags maybe we can use this later
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                Archived thingy also for future maybe
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TagPreview({ color, name }: { color: string; name: string }) {
  return (
    <Badge
      className="px-3 py-1.5 text-sm font-medium"
      style={{
        backgroundColor: `${color}15`,
        color: color,
        borderColor: color,
        borderWidth: "1.5px",
      }}
      variant="outline"
    >
      <div className="flex items-center">
        <span
          className="h-2 w-2 rounded-full mr-1.5"
          style={{ backgroundColor: color }}
        ></span>
        {name}
      </div>
    </Badge>
  );
}

function TagCard({ tag }: { tag: { tagName: string; color: string } }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <TagPreview color={tag.color} name={tag.tagName} />
          <span className="text-xs text-muted-foreground ml-3">
            {/* Example count - could be fetched in real implementation */}
            Used in 3 places
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
      </CardContent>
    </Card>
  );
}
