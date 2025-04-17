"use client";

import { api } from "@/trpc/react";

export default function TestingPage() {
  const utils = api.useUtils();

  // Query to fetch all tags
  const { data: tags } = api.tag.read.useQuery();

  // Mutation to create a tag
  const createTag = api.tag.create.useMutation({
    onSuccess: () => {
      // Refresh the tags list after creating a new tag
      void utils.tag.read.invalidate();
    },
  });

  const handleCreateTag = () => {
    createTag.mutate({
      tagName: "Test Tag",
      color: "#FF5733",
    });
  };

  return (
    <div className="p-8">
      <button
        onClick={handleCreateTag}
        className="mb-8 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Create Test Tag
      </button>

      <div className="flex flex-wrap gap-4">
        {tags?.map((tag) => (
          <div
            key={tag.tagName}
            className="flex items-center rounded px-3 py-1"
            style={{
              border: `2px solid ${tag.color}`,
              color: tag.color,
            }}
          >
            {tag.tagName}
          </div>
        ))}
      </div>
    </div>
  );
}
