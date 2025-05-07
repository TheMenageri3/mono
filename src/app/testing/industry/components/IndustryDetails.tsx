// components/industry/IndustryDetails.tsx
import React from "react";
import { useRouter } from "next/router";
import { useIndustryQueries } from "../hooks/useIndustryQueries";
import { Card, CardContent } from "@/components/ui/card";

const IndustryDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { useIndustryById } = useIndustryQueries();

  const {
    data: industry,
    isLoading,
    error,
  } = useIndustryById({ id: id as string });

  if (isLoading) return <p>Loading industry details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!industry) return <p>Industry not found.</p>;

  return (
    <Card className="max-w-xl mx-auto p-4 mt-4">
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">Industry Details</h2>
        <p>
          <strong>Name:</strong> {industry.name}
        </p>
        <p>
          <strong>Description:</strong> {industry.description}
        </p>
        <p>
          <strong>Parent Industry:</strong>{" "}
          {industry.parentIndustryId || "None"}
        </p>
      </CardContent>
    </Card>
  );
};

export default IndustryDetails;
