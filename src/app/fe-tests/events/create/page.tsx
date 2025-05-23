"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Save,
  Plus,
  Calendar,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

// Mock event types based on your prisma schema
const eventTypes = [
  { value: "CONFERENCE", label: "Conference" },
  { value: "WORKSHOP", label: "Workshop" },
  { value: "NETWORKING", label: "Networking" },
  { value: "HACKATHON", label: "Hackathon" },
  { value: "CAREER_FAIR", label: "Career Fair" },
  { value: "INFO_SESSION", label: "Info Session" },
];

// Mock event statuses based on your prisma schema
const eventStatuses = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
];

// Mock tags for selection
const availableTags = [
  "web3",
  "solana",
  "blockchain",
  "defi",
  "nft",
  "development",
  "dao",
  "gaming",
  "metaverse",
  "cryptocurrency",
  "finance",
  "technology",
];

interface EventFormData {
  title: string;
  shortDescription: string;
  description: string;
  type: string;
  isVirtual: boolean;
  virtualMeetingUrl: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  timezone: string;
  location: string;
  registrationRequired: boolean;
  registrationUrl: string;
  registrationDeadline: string;
  capacity: string;
  cost: string;
  status: string;
  featured: boolean;
  tags: string[];
}

export default function CreateEventPage() {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    shortDescription: "",
    description: "",
    type: "CONFERENCE",
    isVirtual: false,
    virtualMeetingUrl: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    timezone: "America/Los_Angeles",
    location: "",
    registrationRequired: true,
    registrationUrl: "",
    registrationDeadline: "",
    capacity: "",
    cost: "0",
    status: "DRAFT",
    featured: false,
    tags: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
      setFormData((prev) => ({ ...prev, tags: updatedTags }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    const updatedTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(updatedTags);
    setFormData((prev) => ({ ...prev, tags: updatedTags }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would save this to your backend
    console.log("Form data to submit:", formData);

    // For demo, just navigate back to events page
    router.push("/fe-tests/events");
  };

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Background elements */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-fuchsia-500/20 rounded-full blur-[100px]" />
      </div>
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 p-2 hover:bg-white/5 -ml-3 flex items-center"
          onClick={() => router.push("/fe-tests/events")}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Events
        </Button>

        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 mb-8">
          Create New Event
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="border-white/10 bg-black/30 backdrop-blur-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Basic Information
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title*</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description*</Label>
                    <Input
                      id="shortDescription"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10"
                      required
                      placeholder="A brief description displayed in event listings"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Full Description*</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="min-h-[150px] bg-white/5 border-white/10"
                      required
                      placeholder="Detailed event description with all relevant information"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Event Type*</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) =>
                          handleSelectChange("type", value)
                        }
                      >
                        <SelectTrigger
                          id="type"
                          className="bg-white/5 border-white/10"
                        >
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/80 backdrop-blur-md border-white/10">
                          {eventTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Event Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) =>
                          handleSelectChange("status", value)
                        }
                      >
                        <SelectTrigger
                          id="status"
                          className="bg-white/5 border-white/10"
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/80 backdrop-blur-md border-white/10">
                          {eventStatuses.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="featured">Featured Event</Label>
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) =>
                          handleSwitchChange("featured", checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Date and Location */}
            <Card className="border-white/10 bg-black/30 backdrop-blur-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Date & Location</h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-purple-400" />
                        <h3 className="text-md font-medium">Start</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Date*</Label>
                          <Input
                            id="startDate"
                            name="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            className="bg-white/5 border-white/10"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="startTime">Time*</Label>
                          <Input
                            id="startTime"
                            name="startTime"
                            type="time"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            className="bg-white/5 border-white/10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-purple-400" />
                        <h3 className="text-md font-medium">End</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="endDate">Date*</Label>
                          <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            className="bg-white/5 border-white/10"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endTime">Time*</Label>
                          <Input
                            id="endTime"
                            name="endTime"
                            type="time"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            className="bg-white/5 border-white/10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone*</Label>
                    <Select
                      value={formData.timezone}
                      onValueChange={(value) =>
                        handleSelectChange("timezone", value)
                      }
                    >
                      <SelectTrigger
                        id="timezone"
                        className="bg-white/5 border-white/10"
                      >
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/80 backdrop-blur-md border-white/10">
                        <SelectItem value="America/Los_Angeles">
                          Pacific Time (PT)
                        </SelectItem>
                        <SelectItem value="America/Denver">
                          Mountain Time (MT)
                        </SelectItem>
                        <SelectItem value="America/Chicago">
                          Central Time (CT)
                        </SelectItem>
                        <SelectItem value="America/New_York">
                          Eastern Time (ET)
                        </SelectItem>
                        <SelectItem value="UTC">
                          Coordinated Universal Time (UTC)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-purple-400" />
                      <h3 className="text-md font-medium">Location</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Physical Location*</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/10"
                        required
                        placeholder="Address or venue name"
                      />
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="isVirtual">Has Virtual Option</Label>
                        <Switch
                          id="isVirtual"
                          checked={formData.isVirtual}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("isVirtual", checked)
                          }
                        />
                      </div>
                    </div>

                    {formData.isVirtual && (
                      <div className="space-y-2">
                        <Label htmlFor="virtualMeetingUrl">
                          Virtual Meeting URL
                        </Label>
                        <Input
                          id="virtualMeetingUrl"
                          name="virtualMeetingUrl"
                          value={formData.virtualMeetingUrl}
                          onChange={handleInputChange}
                          className="bg-white/5 border-white/10"
                          placeholder="https://"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Registration Settings */}
            <Card className="border-white/10 bg-black/30 backdrop-blur-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Registration Settings
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="registrationRequired">
                        Registration Required
                      </Label>
                      <Switch
                        id="registrationRequired"
                        checked={formData.registrationRequired}
                        onCheckedChange={(checked) =>
                          handleSwitchChange("registrationRequired", checked)
                        }
                      />
                    </div>
                  </div>

                  {formData.registrationRequired && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="registrationUrl">
                            Registration URL
                          </Label>
                          <Input
                            id="registrationUrl"
                            name="registrationUrl"
                            value={formData.registrationUrl}
                            onChange={handleInputChange}
                            className="bg-white/5 border-white/10"
                            placeholder="https://"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="registrationDeadline">
                            Registration Deadline
                          </Label>
                          <Input
                            id="registrationDeadline"
                            name="registrationDeadline"
                            type="date"
                            value={formData.registrationDeadline}
                            onChange={handleInputChange}
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="capacity">
                            Capacity{" "}
                            <span className="text-gray-400 text-xs">
                              (optional)
                            </span>
                          </Label>
                          <Input
                            id="capacity"
                            name="capacity"
                            type="number"
                            value={formData.capacity}
                            onChange={handleInputChange}
                            className="bg-white/5 border-white/10"
                            placeholder="Maximum number of attendees"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cost">
                            Cost ($){" "}
                            <span className="text-gray-400 text-xs">
                              (0 for free)
                            </span>
                          </Label>
                          <Input
                            id="cost"
                            name="cost"
                            type="number"
                            value={formData.cost}
                            onChange={handleInputChange}
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>

            {/* Tags */}
            <Card className="border-white/10 bg-black/30 backdrop-blur-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Event Tags</h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      id="newTag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="bg-white/5 border-white/10"
                      placeholder="Add a tag"
                    />
                    <Button
                      type="button"
                      onClick={() => addTag(newTag)}
                      variant="outline"
                      className="border-white/10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-purple-500/20 hover:bg-purple-500/30 py-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-xs"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}

                    {selectedTags.length === 0 && (
                      <div className="text-sm text-gray-400">
                        No tags selected
                      </div>
                    )}
                  </div>

                  <Separator className="bg-white/10" />

                  <div>
                    <Label className="mb-2 block">Popular Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags
                        .filter((tag) => !selectedTags.includes(tag))
                        .map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="cursor-pointer border-white/10 hover:border-purple-500/50 hover:bg-white/5"
                            onClick={() => addTag(tag)}
                          >
                            + {tag}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Submission Buttons */}
            <div className="flex justify-end space-x-4 mt-8">
              <Button
                type="button"
                variant="outline"
                className="border-white/10"
                onClick={() => router.push("/fe-tests/events")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
