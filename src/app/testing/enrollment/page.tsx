"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EnrollmentForm from "./components/EnrollmentForm";
import { EnrollmentList } from "./components/EnrollmentList";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";

export default function EnrollmentPage() {
  const { data: session, status } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
        <h1 className="text-2xl font-bold mb-4">
          You must be signed in to access enrollments.
        </h1>
        <Button onClick={() => (window.location.href = "/auth/login")}>
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Enrollment Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Create Enrollment
            </Button>
          </DialogTrigger>
          <EnrollmentForm onClose={() => setIsDialogOpen(false)} />
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Enrollments</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <EnrollmentList />
        </TabsContent>
        <TabsContent value="archived">
          <div className="py-8 text-center text-muted-foreground">
            Archived enrollments coming soon…
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
