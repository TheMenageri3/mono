"use client";

import {
  Button,
  ButtonGroup,
  IconButton,
  LinkButton,
} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import { CalendarIcon, CheckIcon, MenuIcon, PlusIcon } from "lucide-react";

export default function BasicInputsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Basic Input Components</h1>

      {/* Buttons Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="grid gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Button Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Button Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Button Group</h3>
            <ButtonGroup>
              <Button variant="outline">Button 1</Button>
              <Button variant="outline">Button 2</Button>
              <Button variant="outline">Button 3</Button>
            </ButtonGroup>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Icon Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <IconButton
                icon={<PlusIcon className="h-4 w-4" />}
                aria-label="Add"
              />
              <IconButton
                icon={<CheckIcon className="h-4 w-4" />}
                variant="outline"
                aria-label="Check"
              />
              <IconButton
                icon={<MenuIcon className="h-4 w-4" />}
                variant="ghost"
                aria-label="Menu"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Link Button</h3>
            <LinkButton href="#">Link Button</LinkButton>
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Input</h2>
        <div className="grid gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Default Input</h3>
            <Input placeholder="Enter text here..." />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Disabled Input</h3>
            <Input placeholder="Disabled input" disabled />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">With Label</h3>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" placeholder="Email address" type="email" />
            </div>
          </div>
        </div>
      </section>

      {/* Date Components Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Date Components</h2>
        <div className="grid gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Date Picker</h3>
            <DatePicker date={date} onSelect={setDate} />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Calendar</h3>
            <div className="border rounded-md p-4 w-fit">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
