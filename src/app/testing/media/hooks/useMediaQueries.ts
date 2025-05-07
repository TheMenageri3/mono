import { api, RouterInputs } from "@/trpc/react";

import type { z } from "zod";
import { getMediaByIdSchema } from "@/schemas";

// Type inference from schemas
type GetAllMediaInput = RouterInputs["media"]["read"];
type GetMediaByIdInput = z.infer<typeof getMediaByIdSchema>;

export const useMediaQueries = () => {
  const useAllMedia = (input: GetAllMediaInput = { limit: 10, offset: 0 }) => {
    return api.media.read.useQuery(input);
  };

  const useMediaById = (input: GetMediaByIdInput) => {
    return api.media.getById.useQuery(input);
  };

  return {
    useAllMedia,
    useMediaById,
  };
};
