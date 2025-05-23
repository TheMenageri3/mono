"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EmailTemplateForm from "./components/EmailTemplateForm";
import { EmailTemplateList } from "./components/EmailTemplateList";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";

export default function EmailTemplatePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Email Templates</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Create Template
            </Button>
          </DialogTrigger>
          <EmailTemplateForm onClose={() => setIsDialogOpen(false)} />
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <EmailTemplateList />
        </TabsContent>
        <TabsContent value="archived">
          <div className="text-muted-foreground text-center py-12">
            Archived templates coming soon…
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
