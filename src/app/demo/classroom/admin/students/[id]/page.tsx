"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  Save,
  Mail,
  UserCog,
  FileText,
  Shield,
  Book,
} from "lucide-react";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";

// Change the page component to use useParams instead of receiving params as props
export default function StudentProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [activeTab, setActiveTab] = useState("profile");
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  // Mock student data
  const [student, setStudent] = useState({
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    status: "Active",
    joinDate: "2025-01-15",
    progress: 92,
    notes:
      "Alex is a highly engaged student who consistently submits assignments on time and participates actively in discussions.",
  });

  // Mock assignments data
  const assignments = [
    {
      id: 1,
      title: "Solana Program Development - Milestone 2",
      status: "Not Started",
      dueDate: "May 25, 2025",
      grade: null,
    },
    {
      id: 2,
      title: "Smart Contract Security Quiz",
      status: "Not Started",
      dueDate: "May 17, 2025",
      grade: null,
    },
    {
      id: 3,
      title: "Weekly Code Review",
      status: "In Progress",
      dueDate: "May 18, 2025",
      grade: null,
    },
    {
      id: 4,
      title: "Solana Program Development - Milestone 1",
      status: "Completed",
      dueDate: "May 1, 2025",
      grade: "95/100",
    },
    {
      id: 5,
      title: "Rust Fundamentals Quiz",
      status: "Completed",
      dueDate: "Apr 24, 2025",
      grade: "88/100",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save this data
    console.log("Saving student profile:", student);
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

      <div className="container max-w-6xl mx-auto px-4 py-8 sm:py-12">
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
            Student Profile
          </h1>
        </div>

        <div className="mb-8">
          <Card className="backdrop-blur-md bg-black/30 border border-white/10">
            <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={student.avatar} />
                <AvatarFallback className="text-xl">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{student.name}</h2>
                <div className="flex items-center text-white/60 mb-3">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{student.email}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-white/60">Status</div>
                    <div className="font-medium">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          student.status === "Active"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Joined</div>
                    <div className="font-medium">Jan 15, 2025</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Completion</div>
                    <div className="font-medium flex items-center gap-2">
                      <Progress
                        value={student.progress}
                        className="h-2 w-24 bg-white/5 [&>div]:bg-purple-500"
                      />
                      <span>{student.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="bg-purple-500 hover:bg-purple-600 whitespace-nowrap"
                onClick={() => setActiveTab("profile")}
              >
                <UserCog className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </Card>
        </div>

        <Tabs
          defaultValue="profile"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-1 mb-8">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
            >
              <UserCog className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
            >
              <FileText className="h-4 w-4 mr-2" />
              Assignments
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
            >
              <Book className="h-4 w-4 mr-2" />
              Academic Progress
            </TabsTrigger>
            <TabsTrigger
              value="access"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
            >
              <Shield className="h-4 w-4 mr-2" />
              Access Control
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab Content */}
          <TabsContent value="profile" className="mt-0">
            <Card className="backdrop-blur-md bg-black/30 border border-white/10">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={student.name}
                      onChange={(e) =>
                        setStudent({ ...student, name: e.target.value })
                      }
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={student.email}
                      onChange={(e) =>
                        setStudent({ ...student, email: e.target.value })
                      }
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={student.status}
                      onChange={(e) =>
                        setStudent({ ...student, status: e.target.value })
                      }
                      className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-sm"
                    >
                      <option value="Active">Active</option>
                      <option value="At Risk">At Risk</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Join Date</Label>
                    <Input
                      id="joinDate"
                      type="date"
                      value={student.joinDate}
                      onChange={(e) =>
                        setStudent({ ...student, joinDate: e.target.value })
                      }
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Instructor Notes</Label>
                  <Textarea
                    id="notes"
                    value={student.notes}
                    onChange={(e) =>
                      setStudent({ ...student, notes: e.target.value })
                    }
                    className="min-h-[150px] bg-white/5 border-white/10"
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
          </TabsContent>

          {/* Assignments Tab Content */}
          <TabsContent value="assignments" className="mt-0">
            <Card className="backdrop-blur-md bg-black/30 border border-white/10">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Assignment Progress</h2>

                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead className="bg-white/5 text-left">
                      <tr>
                        <th className="px-4 py-3 text-sm font-medium text-white/70">
                          Assignment
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-white/70">
                          Status
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-white/70">
                          Due Date
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-white/70">
                          Grade
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-white/70">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {assignments.map((assignment) => (
                        <tr
                          key={assignment.id}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium">
                            {assignment.title}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                assignment.status === "Completed"
                                  ? "bg-green-500/20 text-green-300"
                                  : assignment.status === "In Progress"
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : "bg-gray-500/20 text-gray-300"
                              }`}
                            >
                              {assignment.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-white/70">
                            {assignment.dueDate}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {assignment.grade ? (
                              assignment.grade
                            ) : (
                              <span className="text-white/40">Not graded</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white/10 bg-transparent hover:bg-white/5"
                            >
                              {assignment.status === "Completed"
                                ? "Review"
                                : "Edit"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Academic Progress Tab Content */}
          <TabsContent value="progress" className="mt-0">
            <Card className="backdrop-blur-md bg-black/30 border border-white/10">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Academic Progress</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Overall Progress</span>
                        <span>{student.progress}%</span>
                      </div>
                      <Progress
                        value={student.progress}
                        className="h-2 bg-white/5 [&>div]:bg-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">
                          Assignments Completed
                        </span>
                        <span>2/5</span>
                      </div>
                      <Progress
                        value={40}
                        className="h-2 bg-white/5 [&>div]:bg-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Current Grade</span>
                        <span>92% (A-)</span>
                      </div>
                      <Progress
                        value={92}
                        className="h-2 bg-white/5 [&>div]:bg-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">
                          Discussion Participation
                        </span>
                        <span>85%</span>
                      </div>
                      <Progress
                        value={85}
                        className="h-2 bg-white/5 [&>div]:bg-yellow-500"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Performance Summary</h3>
                    <div className="space-y-4 text-white/80">
                      <p>
                        Alex has consistently demonstrated excellent
                        understanding of the course material. Current
                        performance indicates an A- grade with 92% overall
                        completion.
                      </p>
                      <p>Strengths:</p>
                      <ul className="list-disc list-inside space-y-1 pl-2">
                        <li>
                          Strong technical understanding of Solana concepts
                        </li>
                        <li>Regular participation in discussions</li>
                        <li>Timely assignment submissions</li>
                      </ul>
                      <p className="mt-4">Areas for improvement:</p>
                      <ul className="list-disc list-inside space-y-1 pl-2">
                        <li>
                          Could provide more peer feedback in code reviews
                        </li>
                        <li>
                          Additional practice with complex smart contract
                          patterns recommended
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Access Control Tab Content */}
          <TabsContent value="access" className="mt-0">
            <Card className="backdrop-blur-md bg-black/30 border border-white/10">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Access Control</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-md">
                    <div>
                      <h3 className="font-medium">Reset Password</h3>
                      <p className="text-sm text-white/60">
                        Send a password reset link to the student&apos;s email
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-white/10 bg-transparent hover:bg-white/5"
                    >
                      Send Reset Link
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-md">
                    <div>
                      <h3 className="font-medium">Account Status</h3>
                      <p className="text-sm text-white/60">
                        Temporarily disable account access if needed
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-white/10 bg-transparent hover:bg-white/5"
                    >
                      {student.status === "Active"
                        ? "Deactivate Account"
                        : "Activate Account"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-md">
                    <div>
                      <h3 className="font-medium">Special Permissions</h3>
                      <p className="text-sm text-white/60">
                        Grant additional classroom privileges
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-white/10 bg-transparent hover:bg-white/5"
                    >
                      Manage Permissions
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-md">
                    <div>
                      <h3 className="font-medium text-red-400">
                        Remove From Classroom
                      </h3>
                      <p className="text-sm text-white/60">
                        Unenroll student from this classroom
                      </p>
                    </div>{" "}
                    <Button
                      variant="outline"
                      className="border-red-500/30 text-red-400 bg-transparent hover:bg-red-500/10"
                      onClick={() => setShowRemoveDialog(true)}
                    >
                      Remove Student
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Confirmation Dialog for Student Removal */}
        <ConfirmationDialog
          isOpen={showRemoveDialog}
          onClose={() => setShowRemoveDialog(false)}
          onConfirm={() => {
            console.log("Student removed from classroom");
            router.push("/fe-tests/classroom/admin");
          }}
          title="Remove Student from Classroom"
          description="Are you sure you want to remove this student from your classroom? This action cannot be undone and the student will lose access to all course materials."
          confirmLabel="Remove Student"
          cancelLabel="Cancel"
          isDestructive={true}
        />
      </div>
    </div>
  );
}
