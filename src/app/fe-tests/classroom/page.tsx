import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TabsContainer } from "./tabs/TabsContainer";
export default function ClassroomPage() {
  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-fuchsia-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />
      <div className="container max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="mb-1 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Solana 101: Introduction to Blockchain Development
            </h1>
            <p className="text-white/60">
              Learn the fundamentals of blockchain development on Solana
            </p>
          </div>
          <div className="flex items-center">
            <div className="mr-3">
              <h3 className="text-sm font-medium text-right">
                Prof. Alex Morgan
              </h3>
              <p className="text-xs text-white/60 text-right">
                Lead Instructor
              </p>
            </div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <TabsContainer />
      </div>
    </div>
  );
}
