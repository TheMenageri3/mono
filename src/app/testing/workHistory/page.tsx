"use client";

import React, { useState } from "react";
import { WorkHistoryForm } from "./components/WorkHistoryForm";
import { WorkHistoryList } from "./components/WorkHistoryList";
import { WorkHistoryDetails } from "./components/WorkHistoryDetails";
import { DeletedWorkHistoryList } from "./components/DeletedWorkHistoryList";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

const WorkHistoryPage: React.FC = () => {
  const { profileId } = useParams();
  const [selectedWorkHistoryId, setSelectedWorkHistoryId] = useState<
    string | null
  >(null);

  const handleEditWorkHistory = (id: string) => {
    setSelectedWorkHistoryId(id);
  };

  const handleSuccess = () => {
    setSelectedWorkHistoryId(null); // Reset after successful form submission
  };

  return (
    <div className="space-y-8">
      {/* Add/Edit Work History Form */}
      {!selectedWorkHistoryId && profileId && (
        <WorkHistoryForm
          profileId={Array.isArray(profileId) ? profileId[0] : profileId}
          onSuccess={handleSuccess}
        />
      )}

      {/* Work History List */}
      {!selectedWorkHistoryId && profileId && (
        <WorkHistoryList
          profileId={Array.isArray(profileId) ? profileId[0] : profileId}
          onEdit={handleEditWorkHistory}
        />
      )}

      {/* Work History Details */}
      {selectedWorkHistoryId && (
        <div>
          <Button
            onClick={() => setSelectedWorkHistoryId(null)}
            variant="outline"
          >
            Back to Work History List
          </Button>
          <WorkHistoryDetails id={selectedWorkHistoryId} />
        </div>
      )}

      {/* Deleted Work History */}
      <div>
        <h3 className="text-xl font-semibold">Deleted Work History</h3>
        <DeletedWorkHistoryList />
      </div>
    </div>
  );
};

export default WorkHistoryPage;
