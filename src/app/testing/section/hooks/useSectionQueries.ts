import { api, RouterInputs } from "@/trpc/react";

import type { z } from "zod";
import { getSectionByIdSchema, readSectionsSchema } from "@/schemas";

// Type inference from schemas
type ReadSectionsInput = RouterInputs["section"]["read"];
type ReadSectionByIdInput = z.infer<typeof getSectionByIdSchema>;

export const useSectionQueries = () => {
  const useAllSections = (
    input: ReadSectionsInput = { limit: 10, offset: 0 }
  ) => {
    return api.section.read.useQuery(input);
  };

  const useSectionById = (input: ReadSectionByIdInput) => {
    return api.section.getById.useQuery(input);
  };

  return {
    useAllSections,
    useSectionById,
  };
};
