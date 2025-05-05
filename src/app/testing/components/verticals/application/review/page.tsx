"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/primitives/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle2,
  Clock,
  Edit,
  Tag,
  User,
  X,
  Plus,
  Calendar,
  ChevronDown,
  FileText,
  CheckCircle,
  XCircle,
  CalendarClock,
  Users,
  Eye,
} from "lucide-react";

export default function ApplicationReviewPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Application Review Components
        </h1>
        <p className="text-muted-foreground">
          Components for reviewing Turbin3 web3 developer program applications,
          assigning cohorts, and managing candidates
        </p>
      </div>

      {/* Complete Application Review Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          Complete Application Review
        </h2>
        <div className="w-full mx-auto">
          <CompleteApplicationReview />
        </div>
      </section>

      {/* Individual Components */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Individual Components</h2>

        {/* Application Status Badge */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">
            1. Application Status Badges
          </h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg space-y-4">
            <div className="flex flex-wrap gap-3">
              <ApplicationStatusBadge status="pending" />
              <ApplicationStatusBadge status="approved" />
              <ApplicationStatusBadge status="deferred" />
              <ApplicationStatusBadge status="rejected" />
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Visual indicators for different application statuses.</p>
          </div>
        </div>

        {/* Applicant Profile Summary */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">
            2. Applicant Profile Summary
          </h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <ApplicantProfileSummary
              name="Jane Cooper"
              email="jane.cooper@example.com"
              appliedFor="Software Engineering Program"
              avatarUrl="/avatars/03.png"
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Compact summary of an applicant&apos;s basic information.</p>
          </div>
        </div>

        {/* Application Progress */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">
            3. Application Progress Tracker
          </h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <ApplicationProgressTracker
              steps={[
                { label: "Application Submitted", completed: true },
                { label: "Document Review", completed: true },
                { label: "Interview", completed: false },
                { label: "Decision", completed: false },
              ]}
              currentStep={2}
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Visual indicator showing the application&apos;s progression
              through different stages.
            </p>
          </div>
        </div>

        {/* Review Action Buttons */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">4. Review Action Buttons</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <ReviewActionButtons
              onApprove={() => console.log("Approved")}
              onDefer={() => console.log("Deferred")}
              onReject={() => console.log("Rejected")}
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Action buttons for making decisions on applications.</p>
          </div>
        </div>

        {/* Cohort Assignment */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">5. Cohort Assignment</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <CohortAssignment
              availableCohorts={[
                {
                  id: "c1",
                  name: "Summer 2025",
                  startDatetime: "June 1, 2025",
                  seats: 30,
                  remaining: 12,
                },
                {
                  id: "c2",
                  name: "Fall 2025",
                  startDatetime: "September 15, 2025",
                  seats: 45,
                  remaining: 45,
                },
                {
                  id: "c3",
                  name: "Winter 2026",
                  startDatetime: "January 10, 2026",
                  seats: 25,
                  remaining: 25,
                },
              ]}
              onAssign={(cohortId) =>
                console.log("Assigned to cohort:", cohortId)
              }
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Interface for assigning applicants to specific cohorts.</p>
          </div>
        </div>

        {/* Tag Management */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">6. Application Tagging</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <TagManager
              initialTags={["Needs Follow-up", "High Potential"]}
              availableTags={[
                "High Potential",
                "Needs Follow-up",
                "International",
                "Scholarship",
                "Referred",
                "Alumni Connection",
                "Incomplete Documents",
              ]}
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Component for managing tags assigned to applications.</p>
          </div>
        </div>

        {/* Reviewer Notes */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">7. Reviewer Notes</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <ReviewerNotes />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Interface for adding and viewing notes from application reviewers.
            </p>
          </div>
        </div>

        {/* Email Template Selector */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">8. Response Template</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <ResponseTemplateSelector
              templates={[
                {
                  id: "t1",
                  name: "Acceptance",
                  subject: "Good news regarding your application",
                },
                {
                  id: "t2",
                  name: "Deferral",
                  subject: "An update on your application",
                },
                {
                  id: "t3",
                  name: "Rejection",
                  subject: "Regarding your recent application",
                },
                {
                  id: "t4",
                  name: "Additional Information",
                  subject: "We need more information",
                },
              ]}
              selectedTemplateId={null}
              onTemplateSelect={(templateId) =>
                console.log("Selected Template:", templateId)
              }
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Component for selecting email templates to send to applicants.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Complete Application Review Component
function CompleteApplicationReview() {
  const [status, setStatus] = useState<
    "pending" | "approved" | "deferred" | "rejected"
  >("pending");
  const [selectedCohort, setSelectedCohort] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Web3 Experience",
    "Frontend Developer",
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const availableCohorts = [
    {
      id: "c1",
      name: "Summer 2025 - Web3 Builders",
      startDatetime: "June 1, 2025",
      seats: 30,
      remaining: 12,
    },
    {
      id: "c2",
      name: "Fall 2025 - dApp Developers",
      startDatetime: "September 15, 2025",
      seats: 45,
      remaining: 45,
    },
    {
      id: "c3",
      name: "Winter 2026 - Blockchain Engineers",
      startDatetime: "January 10, 2026",
      seats: 25,
      remaining: 25,
    },
  ];

  const responseTemplates = [
    {
      id: "t1",
      name: "Acceptance",
      subject: "Welcome to Turbin3 Web3 Developer Program",
    },
    {
      id: "t2",
      name: "Deferral",
      subject: "Update on your Turbin3 application",
    },
    {
      id: "t3",
      name: "Rejection",
      subject: "Regarding your Turbin3 program application",
    },
    {
      id: "t4",
      name: "Additional Information",
      subject: "We need more information for your Turbin3 application",
    },
  ];

  const handleStatusChange = (
    newStatus: "pending" | "approved" | "deferred" | "rejected"
  ) => {
    setStatus(newStatus);

    // Auto-select appropriate response template based on decision
    switch (newStatus) {
      case "approved":
        setSelectedTemplate("t1"); // Acceptance template
        break;
      case "deferred":
        setSelectedTemplate("t2"); // Deferral template
        break;
      case "rejected":
        setSelectedTemplate("t3"); // Rejection template
        break;
      default:
        setSelectedTemplate(null);
    }

    // Auto-open cohort selection if approved
    if (newStatus === "approved" && !selectedCohort) {
      // Logic to show cohort selection
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Applicant Information */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Applicant</CardTitle>
              <ApplicationStatusBadge status={status} />
            </div>
          </CardHeader>
          <CardContent>
            <ApplicantProfileSummary
              name="Sofia Rodriguez"
              email="sofia.rodriguez@example.com"
              appliedFor="Data Science Master's Program"
              avatarUrl="/avatars/04.png"
            />

            <Separator className="my-4" />

            <div className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">
                  Application ID
                </Label>
                <p className="font-mono text-sm">APP-2025-04873</p>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">
                  Submitted
                </Label>
                <p className="text-sm">April 12, 2025, 15:24 PM</p>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">
                  Current Stage
                </Label>
                <div className="mt-1">
                  <ApplicationProgressTracker
                    steps={[
                      { label: "Submitted", completed: true },
                      { label: "In Review", completed: true },
                      { label: "Decision", completed: false },
                      { label: "Finalized", completed: false },
                    ]}
                    currentStep={2}
                  />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Tags</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <button
                      className="ml-1 h-3 w-3 rounded-full"
                      onClick={() =>
                        setSelectedTags(selectedTags.filter((t) => t !== tag))
                      }
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <TagSelector
                  availableTags={[
                    "International",
                    "Scholarship",
                    "High Potential",
                    "Needs Follow-up",
                    "Referred",
                    "Alumni Connection",
                    "Incomplete Documents",
                  ]}
                  selectedTags={selectedTags}
                  onChange={setSelectedTags}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-md border flex justify-between items-center">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                <span className="truncate">Resume.pdf</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 whitespace-nowrap"
              >
                <Eye className="h-4 w-4 mr-1" /> View
              </Button>
            </div>
            <div className="p-3 rounded-md border flex justify-between items-center">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                <span className="truncate">CoverLetter.pdf</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 whitespace-nowrap"
              >
                <Eye className="h-4 w-4 mr-1" /> View
              </Button>
            </div>
            <div className="p-3 rounded-md border flex justify-between items-center">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                <span className="truncate">Transcripts.pdf</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 whitespace-nowrap"
              >
                <Eye className="h-4 w-4 mr-1" /> View
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Center & Right Column - Application Details & Review Actions */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Full Name
                    </Label>
                    <p>Sofia Maria Rodriguez</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Date of Birth
                    </Label>
                    <p>March 15, 1997</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Timezone
                    </Label>
                    <p>GMT+1 (Central European Time)</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Current Location
                    </Label>
                    <p>Barcelona, Spain</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">
                    Personal Statement
                  </Label>
                  <p className="mt-1 text-sm">
                    As a frontend developer with 4 years of experience, I&apos;m
                    passionate about web3 technologies and blockchain
                    development. I&apos;ve been exploring Solidity and smart
                    contract development in my free time and I&apos;m seeking to
                    advance my expertise through your Turbin3 web3 developer
                    program to create decentralized applications that can
                    democratize financial access globally.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <div className="border rounded-md p-4 space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">University of Barcelona</p>
                      <p className="text-sm text-muted-foreground">
                        Bachelor of Science in Computer Science
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">2015 - 2019</p>
                  </div>
                  <p className="text-sm">GPA: 3.85/4.0</p>
                  <p className="text-sm">
                    Thesis: &quot;Distributed Systems and Peer-to-Peer
                    Networks&quot;
                  </p>
                </div>

                <div className="border rounded-md p-4 space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Blockchain Academy</p>
                      <p className="text-sm text-muted-foreground">
                        Professional Certificate in Blockchain Development
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">2020</p>
                  </div>
                  <p className="text-sm">
                    Specialization in Solidity and smart contract development
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <div className="border rounded-md p-4 space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">DeFi Solutions</p>
                      <p className="text-sm text-muted-foreground">
                        Senior Frontend Developer
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      2021 - Present
                    </p>
                  </div>
                  <p className="text-sm">
                    Developed React-based dApp interfaces for decentralized
                    finance protocols. Implemented Web3.js integration with
                    multiple wallets. Created interactive dashboards for
                    protocol analytics and governance features.
                  </p>
                </div>

                <div className="border rounded-md p-4 space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Web Design Studio</p>
                      <p className="text-sm text-muted-foreground">
                        Frontend Developer
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">2019 - 2021</p>
                  </div>
                  <p className="text-sm">
                    Built responsive web applications using React and Next.js.
                    Integrated payment systems and third-party APIs. Improved
                    site performance through optimized rendering and caching
                    strategies.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-md p-4 space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/avatars/01.png" alt="Reviewer" />
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-sm">Michael Gough</p>
                </div>
                <p className="text-xs text-muted-foreground">Apr 14, 2025</p>
              </div>
              <p className="text-sm">
                Strong frontend skills with some web3 exposure. Her personal
                statement shows clear motivation to transition into blockchain
                development. Recommend approval for the Fall 2025 cohort where
                we&apos;ll be focusing more on frontend integration with web3.
              </p>
            </div>

            <div className="border rounded-md p-4 space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/avatars/02.png" alt="Reviewer" />
                    <AvatarFallback>DW</AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-sm">Daisuke Williams</p>
                </div>
                <p className="text-xs text-muted-foreground">Apr 13, 2025</p>
              </div>
              <p className="text-sm">
                Interviewed Sofia yesterday. Good understanding of React and
                frontend principles. Her Solidity knowledge is basic but
                she&apos;s eager to learn. She&apos;d be a good fit for the
                program. She mentioned interest in NFT projects - could be a
                good match for the creative track.
              </p>
            </div>

            <div className="pt-3 border-t">
              <Textarea
                placeholder="Add your review notes..."
                className="min-h-[100px]"
              />
              <div className="flex justify-end mt-2">
                <Button size="sm">Add Note</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Decision</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {status === "approved" && (
                <div className="border rounded-md p-4 bg-green-50/50 dark:bg-green-950/20 space-y-3">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Application Approved</span>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Assigned Cohort</Label>
                    {selectedCohort ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {
                              availableCohorts.find(
                                (c) => c.id === selectedCohort
                              )?.name
                            }
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Starts{" "}
                            {
                              availableCohorts.find(
                                (c) => c.id === selectedCohort
                              )?.startDatetime
                            }
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCohort(null)}
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <CohortAssignment
                        availableCohorts={availableCohorts}
                        onAssign={(cohortId) => setSelectedCohort(cohortId)}
                      />
                    )}
                  </div>
                </div>
              )}

              {status === "deferred" && (
                <div className="border rounded-md p-4 bg-amber-50/50 dark:bg-amber-950/20 space-y-3">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
                    <Clock className="h-5 w-5" />
                    <span>Application Deferred</span>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Defer to</Label>
                    <Select defaultValue="c2">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a future cohort" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCohorts.map((cohort) => (
                          <SelectItem key={cohort.id} value={cohort.id}>
                            {cohort.name} (Starts {cohort.startDatetime})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Reason for deferral</Label>
                    <Select defaultValue="incomplete">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="incomplete">
                          Incomplete Application
                        </SelectItem>
                        <SelectItem value="qualification">
                          Additional Qualification Needed
                        </SelectItem>
                        <SelectItem value="timing">
                          Timing/Scheduling Conflicts
                        </SelectItem>
                        <SelectItem value="capacity">
                          Current Cohort at Capacity
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {status === "rejected" && (
                <div className="border rounded-md p-4 bg-red-50/50 dark:bg-red-950/20 space-y-3">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium">
                    <XCircle className="h-5 w-5" />
                    <span>Application Rejected</span>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Reason for rejection</Label>
                    <Select defaultValue="qualifications">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="qualifications">
                          Does Not Meet Qualifications
                        </SelectItem>
                        <SelectItem value="experience">
                          Insufficient Experience
                        </SelectItem>
                        <SelectItem value="fit">
                          Not a Good Program Fit
                        </SelectItem>
                        <SelectItem value="incomplete">
                          Incomplete Application
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">
                        Detailed feedback (optional)
                      </Label>
                      <span className="text-xs text-muted-foreground">
                        Not shared with applicant
                      </span>
                    </div>
                    <Textarea
                      placeholder="Enter detailed feedback for internal records..."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {status === "pending" && (
                <p className="text-muted-foreground text-sm text-center py-2">
                  Make a decision on this application using the buttons below
                </p>
              )}

              <div className="pt-4">
                <ResponseTemplateSelector
                  templates={responseTemplates}
                  selectedTemplateId={selectedTemplate}
                  onTemplateSelect={setSelectedTemplate}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between pt-6 border-t">
            <Button variant="outline" className="sm:w-auto w-full">
              Save Draft
            </Button>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="hidden sm:flex sm:gap-2">
                <ReviewActionButtons
                  status={status}
                  onApprove={() => handleStatusChange("approved")}
                  onDefer={() => handleStatusChange("deferred")}
                  onReject={() => handleStatusChange("rejected")}
                />
              </div>
              <div className="sm:hidden grid grid-cols-3 gap-2 mb-2 w-full">
                {/* Mobile-specific action buttons with only icons */}
                <Button
                  variant={status === "approved" ? "default" : "outline"}
                  className={
                    status === "approved"
                      ? "bg-green-600 hover:bg-green-700 w-full px-2"
                      : "w-full px-2"
                  }
                  onClick={() => handleStatusChange("approved")}
                  size="sm"
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant={status === "deferred" ? "default" : "outline"}
                  className={
                    status === "deferred"
                      ? "bg-amber-600 hover:bg-amber-700 w-full px-2"
                      : "w-full px-2"
                  }
                  onClick={() => handleStatusChange("deferred")}
                  size="sm"
                >
                  <Clock className="h-4 w-4" />
                </Button>
                <Button
                  variant={status === "rejected" ? "default" : "outline"}
                  className={
                    status === "rejected"
                      ? "bg-red-600 hover:bg-red-700 w-full px-2"
                      : "w-full px-2"
                  }
                  onClick={() => handleStatusChange("rejected")}
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Button
                disabled={status === "pending"}
                className="sm:w-auto w-full whitespace-nowrap text-sm"
              >
                Finalize
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// Individual Components
function ApplicationStatusBadge({
  status,
}: {
  status: "pending" | "approved" | "deferred" | "rejected";
}) {
  const statusConfig = {
    pending: {
      label: "Pending Review",
      icon: <Clock className="h-3 w-3 mr-1" />,
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    },
    approved: {
      label: "Approved",
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
      className:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    },
    deferred: {
      label: "Deferred",
      icon: <CalendarClock className="h-3 w-3 mr-1" />,
      className:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    },
    rejected: {
      label: "Rejected",
      icon: <XCircle className="h-3 w-3 mr-1" />,
      className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    },
  };

  const { label, icon, className } = statusConfig[status];

  return (
    <div
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${className}`}
    >
      {icon}
      {label}
    </div>
  );
}

function ApplicantProfileSummary({
  name,
  email,
  appliedFor,
  avatarUrl,
}: {
  name: string;
  email: string;
  appliedFor: string;
  avatarUrl?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-12 w-12 border shrink-0">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt={name} />
        ) : (
          <AvatarFallback>{initials}</AvatarFallback>
        )}
      </Avatar>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold truncate">{name}</h3>
        <p className="text-sm text-muted-foreground truncate" title={email}>
          {email}
        </p>
        <p className="text-xs mt-1 text-muted-foreground truncate">
          Applied for: {appliedFor}
        </p>
      </div>
    </div>
  );
}

function ApplicationProgressTracker({
  steps,
  currentStep,
}: {
  steps: { label: string; completed: boolean }[];
  currentStep: number;
}) {
  const percentage = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="space-y-2">
      <Progress value={percentage} className="h-2" />
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className={`text-xs ${
              index <= currentStep ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewActionButtons({
  status = "pending",
  onApprove,
  onDefer,
  onReject,
}: {
  status?: "pending" | "approved" | "deferred" | "rejected";
  onApprove: () => void;
  onDefer: () => void;
  onReject: () => void;
}) {
  return (
    <div className="flex gap-1 sm:gap-2">
      <Button
        variant={status === "approved" ? "default" : "outline"}
        className={
          status === "approved" ? "bg-green-600 hover:bg-green-700" : ""
        }
        onClick={onApprove}
        size="sm"
      >
        <CheckCircle className="h-4 w-4 mr-1 sm:mr-2" />
        <span>Approve</span>
      </Button>
      <Button
        variant={status === "deferred" ? "default" : "outline"}
        className={
          status === "deferred" ? "bg-amber-600 hover:bg-amber-700" : ""
        }
        onClick={onDefer}
        size="sm"
      >
        <Clock className="h-4 w-4 mr-1 sm:mr-2" />
        <span>Defer</span>
      </Button>
      <Button
        variant={status === "rejected" ? "default" : "outline"}
        className={status === "rejected" ? "bg-red-600 hover:bg-red-700" : ""}
        onClick={onReject}
        size="sm"
      >
        <X className="h-4 w-4 mr-1 sm:mr-2" />
        <span>Reject</span>
      </Button>
    </div>
  );
}

function CohortAssignment({
  availableCohorts,
  onAssign,
}: {
  availableCohorts: {
    id: string;
    name: string;
    startDatetime: string;
    seats: number;
    remaining: number;
  }[];
  onAssign: (cohortId: string) => void;
}) {
  return (
    <div className="space-y-3">
      {availableCohorts.map((cohort) => (
        <div
          key={cohort.id}
          className="border rounded-md p-3 hover:border-primary transition-colors cursor-pointer"
          onClick={() => onAssign(cohort.id)}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{cohort.name}</p>
              <p className="text-sm text-muted-foreground">
                Starts {cohort.startDatetime}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm">{cohort.remaining} spots left</p>
              <p className="text-xs text-muted-foreground">
                of {cohort.seats} total
              </p>
            </div>
          </div>
          <div className="mt-2">
            <Progress
              value={(cohort.remaining / cohort.seats) * 100}
              className="h-1"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TagSelector({
  availableTags,
  selectedTags,
  onChange,
}: {
  availableTags: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1">
          <Plus className="h-3.5 w-3.5" />
          <span className="text-xs">Add Tag</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {availableTags
          .filter((tag) => !selectedTags.includes(tag))
          .map((tag) => (
            <DropdownMenuItem
              key={tag}
              onClick={() => onChange([...selectedTags, tag])}
              className="cursor-pointer"
            >
              {tag}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TagManager({
  initialTags = [],
  availableTags,
}: {
  initialTags?: string[];
  availableTags: string[];
}) {
  const [tags, setTags] = useState<string[]>(initialTags);

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Application Tags</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Tag className="h-3.5 w-3.5" />
              <span className="text-xs">Add Tag</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {availableTags
              .filter((tag) => !tags.includes(tag))
              .map((tag) => (
                <DropdownMenuItem
                  key={tag}
                  onClick={() => addTag(tag)}
                  className="cursor-pointer"
                >
                  {tag}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="flex items-center gap-1"
          >
            {tag}
            <button
              className="ml-1 rounded-full opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {tags.length === 0 && (
          <div className="text-sm text-muted-foreground py-1">
            No tags added
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewerNotes() {
  const [notes, setNotes] = useState<
    { id: string; text: string; date: string }[]
  >([
    {
      id: "1",
      text: "Applicant has strong technical skills but limited management experience. Would be a good fit for the technical track.",
      date: "April 10, 2025",
    },
  ]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now().toString(),
          text: newNote,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        },
      ]);
      setNewNote("");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        {notes.map((note) => (
          <div key={note.id} className="p-3 border rounded-md mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium">Reviewer Note</span>
              <span className="text-xs text-muted-foreground">{note.date}</span>
            </div>
            <p className="text-sm">{note.text}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label>Add Note</Label>
        <Textarea
          placeholder="Add your reviewer notes here..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <div className="flex justify-end">
          <Button onClick={addNote} disabled={!newNote.trim()}>
            Add Note
          </Button>
        </div>
      </div>
    </div>
  );
}

function ResponseTemplateSelector({
  templates,
  selectedTemplateId,
  onTemplateSelect,
}: {
  templates: { id: string; name: string; subject: string }[];
  selectedTemplateId: string | null;
  onTemplateSelect: (templateId: string) => void;
}) {
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [emailContent, setEmailContent] =
    useState<string>(`Dear [Applicant Name],

Thank you for your interest in the Turbin3 Web3 Developer Program. We are pleased to provide you with an update on your application.

[Template Message Content]

Regards,
Turbin3 Admissions Team`);

  // Update email subject when template changes
  useEffect(() => {
    if (selectedTemplateId) {
      const template = templates.find((t) => t.id === selectedTemplateId);
      if (template) {
        setEmailSubject(template.subject);

        // Also update the email content based on template
        if (template.id === "t1") {
          // Acceptance
          setEmailContent(`Dear [Applicant Name],

Congratulations! We are thrilled to inform you that your application to the Turbin3 Web3 Developer Program has been accepted. Your experience and passion for blockchain technology stood out to our review committee.

Next steps:
1. Complete your enrollment by [Date]
2. Join our Discord community
3. Prepare for orientation on [Date]

We&apos;re excited to have you join our community of web3 builders!

Regards,
Turbin3 Admissions Team`);
        } else if (template.id === "t2") {
          // Deferral
          setEmailContent(`Dear [Applicant Name],

Thank you for your application to the Turbin3 Web3 Developer Program. After careful review, we would like to defer your application to our next cohort.

We believe you have potential but would recommend gaining more experience with [Specific Technology] before joining. We encourage you to apply again for our next cohort starting [Date].

Regards,
Turbin3 Admissions Team`);
        } else if (template.id === "t3") {
          // Rejection
          setEmailContent(`Dear [Applicant Name],

Thank you for your interest in the Turbin3 Web3 Developer Program. After careful consideration of your application, we regret to inform you that we are unable to offer you a place in our current program.

We encourage you to continue developing your skills and consider applying again in the future.

Regards,
Turbin3 Admissions Team`);
        }
      }
    } else {
      setEmailSubject("");
    }
  }, [selectedTemplateId, templates]);

  return (
    <div className="space-y-3">
      <div>
        <Label>Response to Applicant</Label>
        <Select
          value={selectedTemplateId || ""}
          onValueChange={onTemplateSelect}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select response template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedTemplateId && (
        <div className="space-y-3 border rounded-md p-4 mt-2">
          <div>
            <Label className="text-sm">Email Subject</Label>
            <Input
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm">Message</Label>
            <Textarea
              className="mt-1 min-h-[120px]"
              placeholder="Template content will appear here..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              Preview Email
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
