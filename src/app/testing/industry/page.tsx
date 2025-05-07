// pages/testing/industry/page.tsx
import React, { useState } from "react";
import { IndustryForm } from "./components/IndustryForm";
import IndustryList from "./components/IndustryList";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const IndustryPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<null | {
    id: string;
    name: string;
    description: string;
    parentIndustryId?: string;
  }>(null);
  const router = useRouter();

  const handleEdit = (industry: {
    id: string;
    name: string;
    description: string;
    parentIndustryId?: string;
  }) => {
    setSelectedIndustry(industry);
    router.push(`/industries/edit/${industry.id}`);
  };

  const handleCreate = () => {
    router.push("/industries/create");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Industry Management</h1>
        <Button onClick={handleCreate}>Add Industry</Button>
      </div>
      <h1>Industry Management</h1>
      {selectedIndustry ? (
        <IndustryForm
          initialData={selectedIndustry}
          onSubmit={() => setSelectedIndustry(null)}
        />
      ) : (
        <IndustryList onEdit={handleEdit} />
      )}
    </div>
  );
};

export default IndustryPage;
