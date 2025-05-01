"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useTagMutations } from "../hooks/useTagMutations";
import { createTagSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

type CreateTagInput = z.infer<typeof createTagSchema>;

const colorOptions = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F033FF",
  "#FF33A8",
  "#FFD700",
  "#00CED1",
  "#FF8C00",
];

export function CreateTag() {
  const { useCreateTag } = useTagMutations();
  const { createTag, isPending } = useCreateTag();

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const form = useForm<CreateTagInput>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      tagName: "",
      color: selectedColor,
    },
  });

  const onSubmit = (data: CreateTagInput) => {
    createTag(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg mx-auto py-8"
      >
        {/* Tag Name */}
        <FormField
          control={form.control}
          name="tagName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter tag name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Color Picker */}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag Color</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2 mt-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color);
                        field.onChange(color);
                      }}
                      className={`h-8 w-8 rounded-full transition-transform ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-primary scale-110"
                          : "hover:scale-110"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    >
                      {selectedColor === color && (
                        <CheckIcon className="h-4 w-4 text-white m-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preview */}
        <div>
          <FormLabel>Preview</FormLabel>
          <div className="mt-2">
            <Badge
              style={{
                backgroundColor: `${selectedColor}15`,
                color: selectedColor,
                borderColor: selectedColor,
                borderWidth: "1.5px",
              }}
              className="px-3 py-1.5 text-sm font-medium"
              variant="outline"
            >
              <div className="flex items-center">
                <span
                  className="h-2 w-2 rounded-full mr-1.5"
                  style={{ backgroundColor: selectedColor }}
                ></span>
                {form.watch("tagName") || "Preview"}
              </div>
            </Badge>
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Tag"}
        </Button>
      </form>
    </Form>
  );
}
