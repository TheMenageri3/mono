"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Add useParams
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Save } from "lucide-react";

export default function EditAnnouncementPage() {
  const router = useRouter();
  const params = useParams(); // Use hook to access URL parameters
  const id = params?.id; // Access the id parameter if needed

  const [announcement, setAnnouncement] = useState({
    title: "Final Project Guidelines Released",
    content:
      "I've just uploaded the guidelines for the final project. Please review them and start planning your submissions. The final project will be due at the end of the semester and will count for 30% of your grade. Please make sure to follow the guidelines carefully and reach out if you have any questions.",
    date: "2025-05-10",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save this data
    console.log("Saving announcement:", announcement);
    router.push("/fe-tests/classroom/admin");
  };

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Background elements from the classroom page */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-fuchsia-500/20 rounded-full blur-[100px]" />
      </div>
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      <div className="container max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header with back button */}
        <div className="mb-8 flex items-center">
          <Button
            variant="ghost"
            className="mr-4 p-2 hover:bg-white/5"
            onClick={() => router.push("/fe-tests/classroom/admin")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Edit Announcement
          </h1>
        </div>

        <Card className="backdrop-blur-md bg-black/30 border border-white/10">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Announcement Title</Label>
              <Input
                id="title"
                value={announcement.title}
                onChange={(e) =>
                  setAnnouncement({ ...announcement, title: e.target.value })
                }
                className="bg-white/5 border-white/10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Publish Date</Label>
              <Input
                id="date"
                type="date"
                value={announcement.date}
                onChange={(e) =>
                  setAnnouncement({ ...announcement, date: e.target.value })
                }
                className="bg-white/5 border-white/10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={announcement.content}
                onChange={(e) =>
                  setAnnouncement({ ...announcement, content: e.target.value })
                }
                className="min-h-[200px] bg-white/5 border-white/10"
                required
              />
            </div>

            <Separator className="my-6 bg-white/10" />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                className="border-white/10 bg-transparent hover:bg-white/5"
                onClick={() => router.push("/fe-tests/classroom/admin")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
