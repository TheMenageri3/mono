"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/primitives/separator";
import { cn } from "@/lib/utils";

export default function LayoutComponentsPage() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Layout Components</h1>

      {/* Grid System */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Grid System</h2>
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-3">Basic Grid</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-primary/10 p-4 rounded-md flex items-center justify-center font-medium"
              >
                Column {i}
              </div>
            ))}
          </div>

          <h3 className="text-lg font-medium mb-3">Different Column Sizes</h3>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 bg-primary/10 p-4 rounded-md flex items-center justify-center font-medium">
              col-span-4
            </div>
            <div className="col-span-12 md:col-span-8 bg-primary/10 p-4 rounded-md flex items-center justify-center font-medium">
              col-span-8
            </div>
          </div>
        </Card>
      </section>

      {/* Containers */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Containers</h2>
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-3">Standard Container</h3>
            <div className="max-w-5xl mx-auto border border-dashed border-primary/50 p-8 rounded-md">
              <p className="text-center">Content is constrained to max-width</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-3">Fluid Container</h3>
            <div className="w-full border border-dashed border-primary/50 p-8 rounded-md">
              <p className="text-center">Content takes full available width</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Dividers */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Dividers</h2>
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-3">Horizontal Divider</h3>
          <div>
            <p>Content above the divider</p>
            <Separator className="my-4" />
            <p>Content below the divider</p>
          </div>

          <h3 className="text-lg font-medium mt-6 mb-3">Vertical Divider</h3>
          <div className="flex h-16 items-center">
            <div className="w-1/2 text-center">Left content</div>
            <Separator orientation="vertical" className="h-full" />
            <div className="w-1/2 text-center">Right content</div>
          </div>
        </Card>
      </section>

      {/* Panels */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Panels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                A standard panel component with header and content sections.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Styled Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <p>A panel with custom styling applied.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tabs */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Tabs</h2>
        <Card className="p-6">
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="tab1">First Tab</TabsTrigger>
              <TabsTrigger value="tab2">Second Tab</TabsTrigger>
              <TabsTrigger value="tab3">Third Tab</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Tab 1 Content</h3>
              <p>This is the content for the first tab.</p>
            </TabsContent>
            <TabsContent value="tab2" className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Tab 2 Content</h3>
              <p>This is the content for the second tab.</p>
            </TabsContent>
            <TabsContent value="tab3" className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Tab 3 Content</h3>
              <p>This is the content for the third tab.</p>
            </TabsContent>
          </Tabs>
        </Card>
      </section>

      {/* Accordions */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Accordions</h2>
        <Card className="p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Section 1</AccordionTrigger>
              <AccordionContent>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Section 2</AccordionTrigger>
              <AccordionContent>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Section 3</AccordionTrigger>
              <AccordionContent>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </section>

      {/* Responsive Layout Example */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Responsive Layout Example
        </h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="border border-primary/20 rounded-md p-6 h-full">
                <h3 className="text-lg font-medium mb-2">Main Content Area</h3>
                <p>
                  This area takes up 2/3 of the width on medium screens and
                  above, but becomes full width on smaller screens.
                </p>
              </div>
            </div>
            <div>
              <div className="border border-primary/20 rounded-md p-6 h-full">
                <h3 className="text-lg font-medium mb-2">Sidebar Area</h3>
                <p>
                  This area takes up 1/3 of the width on medium screens and
                  above, but becomes full width on smaller screens.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
