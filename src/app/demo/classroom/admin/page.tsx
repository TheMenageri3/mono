"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Bell,
  FileText,
  PlusCircle,
  Users,
  Settings,
  Search,
  Edit,
  Trash,
  CheckCircle,
  AlertCircle,
  UserPlus,
  ChevronLeft,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import {
  CreateAnnouncementDialog,
  CreateAssignmentDialog,
  AddStudentDialog,
} from "./components/Dialogs";
import { ConfirmationDialog } from "./components/ConfirmationDialog";

export default function ClassroomAdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  // States for confirmation dialogs
  const [deleteStudentDialog, setDeleteStudentDialog] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });
  const [deleteAssignmentDialog, setDeleteAssignmentDialog] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });
  const [deleteAnnouncementDialog, setDeleteAnnouncementDialog] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  // Mock data for the admin dashboard
  const stats = [
    {
      value: "42",
      label: "Students Enrolled",
      icon: <Users className="h-10 w-10 text-purple-400" />,
    },
    {
      value: "5",
      label: "Pending Assignments",
      icon: <FileText className="h-10 w-10 text-yellow-400" />,
    },
    {
      value: "12",
      label: "Unread Discussions",
      icon: <MessageSquare className="h-10 w-10 text-blue-400" />,
    },
  ];

  // Mock data for students
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      progress: 92,
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      progress: 78,
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      progress: 65,
      status: "At Risk",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      progress: 88,
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      progress: 45,
      status: "At Risk",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  ];

  // Mock data for announcements
  const announcements = [
    {
      id: 1,
      title: "Final Project Guidelines Released",
      content: "Guidelines for the final project have been released.",
      date: "May 10, 2025",
      author: "Prof. Alex Morgan",
    },
    {
      id: 2,
      title: "Guest Lecture: Advanced Smart Contracts",
      content: "Guest lecture by Solana core developer Sarah Chen on Friday.",
      date: "May 8, 2025",
      author: "Prof. Alex Morgan",
    },
  ];

  // Mock data for assignments
  const assignments = [
    {
      id: 1,
      title: "Solana Program Development - Milestone 2",
      dueDate: "May 25, 2025",
      submissions: 18,
      status: "Active",
    },
    {
      id: 2,
      title: "Smart Contract Security Quiz",
      dueDate: "May 17, 2025",
      submissions: 24,
      status: "Active",
    },
    {
      id: 3,
      title: "Weekly Code Review",
      dueDate: "May 18, 2025",
      submissions: 20,
      status: "Active",
    },
    {
      id: 4,
      title: "Solana Program Development - Milestone 1",
      dueDate: "May 1, 2025",
      submissions: 42,
      status: "Completed",
    },
    {
      id: 5,
      title: "Rust Fundamentals Quiz",
      dueDate: "Apr 24, 2025",
      submissions: 40,
      status: "Completed",
    },
  ];

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="mb-8 flex items-start justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="mr-4 p-2 hover:bg-white/5"
              onClick={() => router.push("/fe-tests/classroom")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="mb-1 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Classroom Administration
              </h1>
              <p className="text-white/60">
                Manage your classroom, students, assignments, and announcements
              </p>
            </div>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
        </div>

        {/* Admin Tabs */}
        <Tabs
          defaultValue="dashboard"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-8"
        >
          <TabsList className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-1 mb-8">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
            >
              Students
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
            >
              Assignments
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
            >
              Announcements
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab Content */}
          <TabsContent value="dashboard" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="backdrop-blur-md bg-black/30 border border-white/10 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="p-6 flex items-center">
                    <div className="rounded-full bg-white/5 p-3 mr-4">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-white/60">{stat.label}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="backdrop-blur-md bg-black/30 border border-white/10">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold">Recent Assignments</h2>
                      <Link href="#assignments">
                        <Button
                          variant="ghost"
                          className="text-white/70 hover:text-white hover:bg-white/5"
                          size="sm"
                        >
                          View All
                        </Button>
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {assignments.slice(0, 3).map((assignment) => (
                        <div
                          key={assignment.id}
                          className="flex items-center justify-between pb-4 border-b border-white/10 last:border-0 last:pb-0"
                        >
                          <div>
                            <div className="font-medium">
                              {assignment.title}
                            </div>
                            <div className="text-xs text-white/60">
                              Due: {assignment.dueDate}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-xs px-2 py-1 rounded bg-white/10">
                              {assignment.submissions} submissions
                            </div>
                            <Button variant="ghost" size="sm" className="p-1">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="backdrop-blur-md bg-black/30 border border-white/10">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold">
                        Recent Announcements
                      </h2>
                      <Link href="#announcements">
                        <Button
                          variant="ghost"
                          className="text-white/70 hover:text-white hover:bg-white/5"
                          size="sm"
                        >
                          View All
                        </Button>
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {announcements.map((announcement) => (
                        <div
                          key={announcement.id}
                          className="pb-4 border-b border-white/10 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">
                              {announcement.title}
                            </h3>
                            <span className="text-xs text-white/60 bg-black/40 px-2 py-1 rounded ml-2">
                              {announcement.date}
                            </span>
                          </div>
                          <p className="text-sm text-white/70 mt-2">
                            {announcement.content}
                          </p>
                          <div className="flex justify-end mt-2 gap-2">
                            <Button variant="ghost" size="sm" className="p-1">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-1">
                              <Trash className="h-4 w-4 text-red-400" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="backdrop-blur-md bg-black/30 border border-white/10">
                  <div className="p-6">
                    <h2 className="mb-6 text-lg font-bold">Student Overview</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex justify-between">
                          <span className="text-sm text-white/60">
                            Active Students
                          </span>
                          <span className="text-sm font-medium">38/42</span>
                        </div>
                        <Progress
                          value={90}
                          className="h-2 bg-white/5 [&>div]:bg-green-500"
                        />
                      </div>
                      <div>
                        <div className="mb-2 flex justify-between">
                          <span className="text-sm text-white/60">
                            At-Risk Students
                          </span>
                          <span className="text-sm font-medium">4/42</span>
                        </div>
                        <Progress
                          value={10}
                          className="h-2 bg-white/5 [&>div]:bg-red-500"
                        />
                      </div>
                      <div>
                        <div className="mb-2 flex justify-between">
                          <span className="text-sm text-white/60">
                            Average Completion Rate
                          </span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <Progress
                          value={78}
                          className="h-2 bg-white/5 [&>div]:bg-purple-500"
                        />
                      </div>
                    </div>
                    <Separator className="my-4 bg-white/10" />
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">At-Risk Students</h3>
                      {students
                        .filter((student) => student.status === "At Risk")
                        .map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center space-x-2"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="text-sm font-medium">
                                {student.name}
                              </div>
                              <div className="text-xs text-white/60">
                                {student.progress}% completion
                              </div>
                            </div>
                            <AlertCircle className="h-4 w-4 text-red-400" />
                          </div>
                        ))}
                    </div>
                  </div>
                </Card>

                <Card className="backdrop-blur-md bg-black/30 border border-white/10">
                  <div className="p-6">
                    <h2 className="mb-4 text-lg font-bold">Quick Actions</h2>{" "}
                    <div className="space-y-2">
                      <Button
                        className="w-full justify-start bg-purple-500 hover:bg-purple-600"
                        onClick={() => setActiveTab("assignments")}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Assignment
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-white/10 bg-transparent text-white hover:bg-white/5"
                        onClick={() => setActiveTab("announcements")}
                      >
                        <Bell className="mr-2 h-4 w-4" />
                        Post Announcement
                      </Button>{" "}
                      <Button
                        variant="outline"
                        className="w-full justify-start border-white/10 bg-transparent text-white hover:bg-white/5"
                        onClick={() => setActiveTab("students")}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Invite Student
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-white/10 bg-transparent text-white hover:bg-white/5"
                        onClick={() =>
                          router.push("/fe-tests/classroom/placements")
                        }
                      >
                        <Briefcase className="mr-2 h-4 w-4" />
                        Manage Placements
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Students Tab Content */}
          <TabsContent value="students" className="mt-0">
            <Card className="backdrop-blur-md bg-black/30 border border-white/10">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Manage Students</h2>
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input
                        placeholder="Search students..."
                        className="pl-10 bg-white/5 border-white/10 w-60"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <AddStudentDialog />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead className="bg-white/5 text-left">
                      <tr>
                        <th className="px-4 py-3 text-sm font-medium text-white/70">
                          Student
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-white/70">
                          Email
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-white/70">
                          Progress
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-white/70">
                          Status
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-white/70">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredStudents.map((student) => (
                        <tr
                          key={student.id}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">
                                {student.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-white/70">
                            {student.email}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={student.progress}
                                className="h-2 w-24 bg-white/5 [&>div]:bg-purple-500"
                              />
                              <span className="text-sm">
                                {student.progress}%
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                student.status === "Active"
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-red-500/20 text-red-300"
                              }`}
                            >
                              {student.status === "Active" && (
                                <CheckCircle className="mr-1 h-3 w-3" />
                              )}
                              {student.status === "At Risk" && (
                                <AlertCircle className="mr-1 h-3 w-3" />
                              )}
                              {student.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() =>
                                  router.push(
                                    `/fe-tests/classroom/admin/students/${student.id}`
                                  )
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                onClick={() =>
                                  setDeleteStudentDialog({
                                    isOpen: true,
                                    id: student.id,
                                  })
                                }
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Assignments Tab Content */}
          <TabsContent value="assignments" className="mt-0">
            <Card className="backdrop-blur-md bg-black/30 border border-white/10">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Manage Assignments</h2>
                  <CreateAssignmentDialog />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead className="bg-white/5 text-left">
                      <tr>
                        <th className="px-4 py-3 text-sm font-medium text-white/70">
                          Title
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-white/70">
                          Due Date
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-white/70">
                          Submissions
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-white/70">
                          Status
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
                          <td className="px-4 py-3 text-sm text-white/70">
                            {assignment.dueDate}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {assignment.submissions} students
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                assignment.status === "Active"
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-gray-500/20 text-gray-300"
                              }`}
                            >
                              {assignment.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() =>
                                  router.push(
                                    `/fe-tests/classroom/admin/assignments/${assignment.id}`
                                  )
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>{" "}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                onClick={() =>
                                  setDeleteAssignmentDialog({
                                    isOpen: true,
                                    id: assignment.id,
                                  })
                                }
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Announcements Tab Content */}
          <TabsContent value="announcements" className="mt-0">
            <Card className="backdrop-blur-md bg-black/30 border border-white/10">
              <div className="p-6">
                {" "}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Manage Announcements</h2>
                  <CreateAnnouncementDialog />
                </div>
                <div className="space-y-8">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="bg-white/5 rounded-md p-6 border border-white/10"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium">
                            {announcement.title}
                          </h3>
                          <p className="text-sm text-white/60 mt-1">
                            Posted on {announcement.date} by{" "}
                            {announcement.author}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {" "}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              router.push(
                                `/fe-tests/classroom/admin/announcements/${announcement.id}`
                              )
                            }
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() =>
                              setDeleteAnnouncementDialog({
                                isOpen: true,
                                id: announcement.id,
                              })
                            }
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-white/80">{announcement.content}</p>
                      <div className="mt-4 flex gap-2">
                        {" "}
                        <Button
                          variant="outline"
                          className="text-sm border-white/10 bg-transparent hover:bg-white/5"
                          onClick={() =>
                            router.push(
                              `/fe-tests/classroom/admin/announcements/${announcement.id}`
                            )
                          }
                        >
                          Edit Content
                        </Button>
                        <Button
                          variant="outline"
                          className="text-sm border-white/10 bg-transparent hover:bg-white/5"
                        >
                          Send Notification
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="bg-white/5 rounded-md p-6 border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
                    <PlusCircle className="h-10 w-10 text-white/40 mb-3" />
                    <h3 className="text-lg font-medium mb-1">
                      Create New Announcement
                    </h3>
                    <p className="text-sm text-white/60 mb-4 max-w-md">
                      Keep your students informed about important events,
                      updates or changes to the curriculum.
                    </p>
                    <Button className="bg-purple-500 hover:bg-purple-600">
                      Create Announcement
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab Content */}
          <TabsContent value="settings" className="mt-0">
            <Card className="backdrop-blur-md bg-black/30 border border-white/10">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Classroom Settings</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      General Settings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-medium">
                          Course Title
                        </label>
                        <Input
                          defaultValue="Solana 101: Introduction to Blockchain Development"
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-medium">
                          Instructor Name
                        </label>
                        <Input
                          defaultValue="Prof. Alex Morgan"
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-medium">
                          Course Description
                        </label>
                        <Input
                          defaultValue="Learn the fundamentals of blockchain development on Solana"
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-medium">
                          Course Start Date
                        </label>
                        <Input
                          type="date"
                          defaultValue="2025-04-01"
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Privacy & Access
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">
                            Allow Student Enrollment
                          </h4>
                          <p className="text-sm text-white/60">
                            Enable new students to join the course
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-white/10 bg-transparent hover:bg-white/5"
                        >
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Course Visibility</h4>
                          <p className="text-sm text-white/60">
                            Control who can view this course
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-white/10 bg-transparent hover:bg-white/5"
                        >
                          Public
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">
                            Discussions Moderation
                          </h4>
                          <p className="text-sm text-white/60">
                            Require approval before posts are published
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-white/10 bg-transparent hover:bg-white/5"
                        >
                          Disabled
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="flex justify-end gap-4">
                    <Button
                      variant="outline"
                      className="border-white/10 bg-transparent hover:bg-white/5"
                    >
                      Cancel
                    </Button>
                    <Button className="bg-purple-500 hover:bg-purple-600">
                      Save Changes{" "}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Confirmation Dialogs */}
        <ConfirmationDialog
          isOpen={deleteStudentDialog.isOpen}
          onClose={() => setDeleteStudentDialog({ isOpen: false, id: null })}
          onConfirm={() => {
            console.log(`Student ${deleteStudentDialog.id} deleted`);
            setDeleteStudentDialog({ isOpen: false, id: null });
          }}
          title="Remove Student"
          description="Are you sure you want to remove this student from the classroom? This action cannot be undone."
          confirmLabel="Remove Student"
          cancelLabel="Cancel"
          isDestructive={true}
        />

        <ConfirmationDialog
          isOpen={deleteAssignmentDialog.isOpen}
          onClose={() => setDeleteAssignmentDialog({ isOpen: false, id: null })}
          onConfirm={() => {
            console.log(`Assignment ${deleteAssignmentDialog.id} deleted`);
            setDeleteAssignmentDialog({ isOpen: false, id: null });
          }}
          title="Delete Assignment"
          description="Are you sure you want to delete this assignment? All associated submissions and grades will be permanently removed."
          confirmLabel="Delete Assignment"
          cancelLabel="Cancel"
          isDestructive={true}
        />

        <ConfirmationDialog
          isOpen={deleteAnnouncementDialog.isOpen}
          onClose={() =>
            setDeleteAnnouncementDialog({ isOpen: false, id: null })
          }
          onConfirm={() => {
            console.log(`Announcement ${deleteAnnouncementDialog.id} deleted`);
            setDeleteAnnouncementDialog({ isOpen: false, id: null });
          }}
          title="Delete Announcement"
          description="Are you sure you want to delete this announcement? Students will no longer be able to see it."
          confirmLabel="Delete Announcement"
          cancelLabel="Cancel"
          isDestructive={true}
        />
      </div>
    </div>
  );
}
