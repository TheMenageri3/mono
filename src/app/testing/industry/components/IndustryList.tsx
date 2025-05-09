// components/industry/IndustryList.tsx
import React from "react";
import { useRouter } from "next/router";
import { useIndustryQueries } from "../hooks/useIndustryQueries";
import { useIndustryMutations } from "../hooks/useIndustryMutations";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";

type IndustryListProps = {
  onEdit?: (industry: {
    id: string;
    name: string;
    description: string;
    parentIndustryId?: string;
  }) => void;
};

const IndustryList: React.FC<IndustryListProps> = ({ onEdit }) => {
  const router = useRouter();
  const { useAllIndustries } = useIndustryQueries();
  const { useDeleteIndustry } = useIndustryMutations();

  const {
    data: industries,
    isLoading,
    error,
  } = useAllIndustries({ limit: 10, offset: 0 });
  const { deleteIndustry } = useDeleteIndustry();

  const handleEdit = (id: string) => router.push(`/industries/edit/${id}`);
  const handleDelete = async (id: string) => {
    try {
      await deleteIndustry({ id });
      showToast.success({
        title: "Deleted",
        description: "Industry deleted successfully.",
      });
    } catch (error: any) {
      showToast.error({ title: "Error", description: error.message });
    }
  };

  if (isLoading) return <p>Loading industries...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-2xl font-bold">Industries</h2>
      <ul className="space-y-2">
        {industries?.map((industry) => (
          <li
            key={industry.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{industry.name}</p>
              <p className="text-sm text-gray-600">{industry.description}</p>
            </div>
            <div className="space-x-2">
              <Button onClick={() => handleEdit(industry.id)}>Edit</Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(industry.id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndustryList;
