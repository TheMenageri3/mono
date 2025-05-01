import { api, RouterInputs } from "@/trpc/react";
import type { z } from "zod";
import {
  readTagsSchema,
  getTagByNameSchema,
  readDeletedTagsSchema,
} from "@/schemas"; // adjust import if needed

// Type inference from schemas
type ReadTagsInput = z.infer<typeof readTagsSchema>;
type GetTagByNameInput = z.infer<typeof getTagByNameSchema>;
type ReadDeletedTagsInput = z.infer<typeof readDeletedTagsSchema>;

export const useTagQueries = () => {
  const useAllTags = (input: ReadTagsInput = { limit: 10, offset: 0 }) => {
    return api.tag.read.useQuery(input);
  };

  const useTagByName = (input: GetTagByNameInput) => {
    return api.tag.getByName.useQuery(input);
  };

  const useDeletedTags = (
    input: ReadDeletedTagsInput = { limit: 10, offset: 0 }
  ) => {
    return api.tag.readDeleted.useQuery(input);
  };

  return {
    useAllTags,
    useTagByName,
    useDeletedTags,
  };
};
