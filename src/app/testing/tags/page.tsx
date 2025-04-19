"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <h1 className="mb-6 text-2xl font-bold text-white">Tag Management</h1>

      {/* Tag Creation Card */}
      <div className="mb-6 rounded-lg border border-gray-800 bg-[#0f111a] overflow-hidden">
        {!showForm ? (
          <div className="p-6">
            <Button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
              size="lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="mr-2"
              >
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              Add New Tag
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b border-gray-800 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                Create New Tag
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-5">
                <label
                  htmlFor="tagName"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Tag Name
                </label>
                <Input
                  id="tagName"
                  type="text"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  placeholder="Enter tag name"
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`h-10 w-10 rounded-full transition-all duration-200 flex items-center justify-center ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-offset-gray-900 ring-blue-500 scale-105 shadow-md"
                          : "hover:scale-105 shadow-sm"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    >
                      {selectedColor === color && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          width="12"
                          height="12"
                        >
                          <path d="M20.285 5.297L9 16.582l-5.285-5.285-1.415 1.415L9 19.415 21.7 6.717l-1.415-1.42z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag Preview */}
              <div className="mb-5 mt-3">
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Preview
                </label>
                <div className="p-3 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800">
                  <Badge
                    className="px-4 py-1.5 text-sm font-medium shadow-sm"
                    style={{
                      backgroundColor: `${selectedColor}20`,
                      color: selectedColor,
                      borderColor: selectedColor,
                      borderWidth: "1.5px",
                      borderRadius: "9999px",
                    }}
                    variant="outline"
                  >
                    <div className="flex items-center">
                      <span
                        className="h-2.5 w-2.5 rounded-full mr-1.5"
                        style={{ backgroundColor: selectedColor }}
                      ></span>
                      {tagName || "Tag Preview"}
                    </div>
                  </Badge>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  onClick={handleCreateTag}
                  disabled={!tagName.trim() || createTag.isPending}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {createTag.isPending ? "Creating..." : "Create Tag"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tags Display Section */}
      <div className="rounded-lg border border-gray-800 bg-[#0f111a] overflow-hidden">
        <div className="border-b border-gray-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Your Tags</h2>
        </div>
        <div className="p-6">
          {tags && tags.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <Badge
                  key={tag.tagName}
                  className="px-3 py-1.5 text-sm font-medium hover:scale-105 transition-all duration-200 cursor-default shadow-sm"
                  style={{
                    backgroundColor: `${tag.color}20`,
                    color: tag.color,
                    borderColor: tag.color,
                    borderWidth: "1.5px",
                    borderRadius: "9999px",
                  }}
                  variant="outline"
                >
                  <div className="flex items-center">
                    <span
                      className="h-2.5 w-2.5 rounded-full mr-1.5"
                      style={{ backgroundColor: tag.color }}
                    ></span>
                    {tag.tagName}
                  </div>
                </Badge>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center border border-dashed rounded-lg border-gray-700 my-2">
              <p className="text-gray-500">
                No tags created yet. Add your first tag!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
