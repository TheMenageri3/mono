"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useState } from "react";

// Predefined color options
const colorOptions = [
  "#FF5733", // Orange-red
  "#33FF57", // Green
  "#3357FF", // Blue
  "#F033FF", // Purple
  "#FF33A8", // Pink
  "#FFD700", // Gold
];

export default function TestingPage() {
  const utils = api.useUtils();
  const [tagName, setTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [showForm, setShowForm] = useState(false);

  // Query to fetch all tags
  const { data: tags } = api.tag.read.useQuery();

  // Mutation to create a tag
  const createTag = api.tag.create.useMutation({
    onSuccess: () => {
      // Refresh the tags list after creating a new tag
      void utils.tag.read.invalidate();
      // Reset form
      setTagName("");
      setShowForm(false);
    },
  });

  const handleCreateTag = () => {
    if (!tagName.trim()) return;

    createTag.mutate({
      tagName: tagName.trim(),
      color: selectedColor,
    });
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Tag Management</h1>

      {!showForm ? (
        <Button onClick={() => setShowForm(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
          Add New Tag
        </Button>
      ) : (
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4">
            <label htmlFor="tagName" className="mb-2 block text-sm font-medium">
              Tag Name
            </label>
            <input
              id="tagName"
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Enter tag name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Color</label>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`h-8 w-8 rounded-full ${
                    selectedColor === color
                      ? "ring-2 ring-offset-2 ring-blue-500"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleCreateTag}
              disabled={!tagName.trim() || createTag.isPending}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {createTag.isPending ? "Creating..." : "Create Tag"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <h2 className="mb-4 text-xl font-semibold">Your Tags</h2>
      {tags && tags.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => (
            <div
              key={tag.tagName}
              className="flex items-center rounded-full px-4 py-2 shadow-sm transition-transform hover:scale-105"
              style={{
                border: `2px solid ${tag.color}`,
                color: tag.color,
                backgroundColor: `${tag.color}15`, // Very light background based on tag color
              }}
            >
              {tag.tagName}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No tags created yet. Add your first tag!
        </p>
      )}
    </div>
  );
}
