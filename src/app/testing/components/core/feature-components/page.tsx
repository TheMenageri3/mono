"use client";

import { ContactCard } from "@/components/features/ContactCard";
import { OrganizationCard } from "@/components/features/OrganizationCard";
import { ContactForm } from "@/components/features/ContactForm";
import { useState } from "react";

export default function FeatureComponentsPage() {
  const [formData, setFormData] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "555-123-4567",
  });

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data);
    setFormData(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Feature Components</h1>

      {/* Contact Card Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Contact Cards</h2>
        <div className="grid gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Default Contact Card</h3>
            <ContactCard
              name="John Doe"
              email="john@example.com"
              status="Active"
              phone="(555) 123-4567"
              onEdit={() => console.log("Edit clicked")}
              onContact={() => console.log("Contact clicked")}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Contact Card with Avatar</h3>
            <ContactCard
              name="Sarah Johnson"
              email="sarah@example.com"
              status="Busy"
              phone="(555) 987-6543"
              avatarUrl="https://github.com/shadcn.png"
              onEdit={() => console.log("Edit clicked")}
            />
          </div>
        </div>
      </section>

      {/* Organization Card Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Organization Cards</h2>
        <div className="grid gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Default Organization Card</h3>
            <OrganizationCard
              name="Acme Inc."
              industry="Technology"
              status="Client"
              employeeCount={250}
              onEdit={() => console.log("Edit clicked")}
              onView={() => console.log("View clicked")}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Organization Card with Logo</h3>
            <OrganizationCard
              name="Globex Corporation"
              industry="Manufacturing"
              status="Prospect"
              employeeCount={1200}
              logoUrl="https://github.com/shadcn.png"
              onView={() => console.log("View clicked")}
            />
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Forms</h2>
        <div className="grid gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Contact Form</h3>
            <div className="border rounded-lg p-6 max-w-2xl">
              <ContactForm onSubmit={handleSubmit} defaultValues={formData} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
