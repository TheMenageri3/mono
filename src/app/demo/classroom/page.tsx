import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TabsContainer } from "./tabs/TabsContainer";

export default function ClassroomPage() {
  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Enhanced background with more dynamic gradients */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse-slower" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-fuchsia-500/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-[30%] left-[20%] w-[250px] h-[250px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slower" />
      </div>

      {/* Grid overlay with subtle animation */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Subtle floating particles effect */}
      <div className="fixed inset-0 z-[-1] opacity-30">
        <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-white rounded-full animate-float-slow"></div>
        <div className="absolute top-[35%] left-[80%] w-1 h-1 bg-white rounded-full animate-float-medium"></div>
        <div className="absolute top-[65%] left-[30%] w-1 h-1 bg-white rounded-full animate-float-fast"></div>
        <div className="absolute top-[85%] left-[70%] w-1 h-1 bg-white rounded-full animate-float-slow"></div>
        <div className="absolute top-[25%] left-[40%] w-1 h-1 bg-white rounded-full animate-float-fast"></div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8 flex flex-col md:flex-row justify-between md:items-start gap-6">
          {/* Course header with enhanced styling */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-[60%] bg-gradient-to-b from-purple-500 to-transparent rounded-full"></div>
            <h1 className="mb-2 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 leading-tight">
              Solana 101: Introduction to Blockchain Development
            </h1>
            <p className="text-white/60 max-w-2xl">
              Learn the fundamentals of blockchain development on Solana through
              hands-on projects and expert instruction
            </p>
          </div>

          <div className="flex items-center gap-4 self-end md:self-start">
            {/* Keep your existing button - it's already excellent */}
            <Link href="/fe-tests/classroom/admin">
              <Button className="relative group overflow-hidden backdrop-blur-md bg-purple-500/20 border border-white/10 text-white hover:bg-purple-500/30 hover:border-white/20 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-fuchsia-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute -inset-x-1 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300"></span>
                <span className="relative flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-200"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 7h10v2H7zM7 11h10v2H7zM7 15h4v2H7z" />
                  </svg>
                  Admin Panel
                </span>
              </Button>
            </Link>

            {/* Enhanced instructor profile */}
            <div className="flex items-center bg-white/5 backdrop-blur-md p-2 pr-3 rounded-xl border border-white/10 transition-all hover:bg-white/10 hover:border-white/20">
              <Avatar className="h-10 w-10 border-2 border-purple-500/30 ring-2 ring-white/10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-fuchsia-600">
                  AM
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h3 className="text-sm font-medium">Prof. Alex Morgan</h3>
                <p className="text-xs text-white/60 flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                  Lead Instructor
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add a subtle separator before tabs */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

        {/* Keep your existing TabsContainer */}
        <div className="backdrop-blur-sm bg-black/20 rounded-xl border border-white/5 p-4">
          <TabsContainer />
        </div>

        {/* Course status indicators */}
        <div className="mt-6 py-2 px-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg flex justify-between items-center text-sm">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            <span>Live Session: Wednesdays 7:00 PM</span>
          </div>
          <div className="text-white/60">26 Students Enrolled</div>
        </div>
      </div>
    </div>
  );
}
