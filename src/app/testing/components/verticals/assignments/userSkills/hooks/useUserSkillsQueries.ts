import { api } from "@/trpc/react";
import type { z } from "zod";

import {
  readUserSkillsByProfileIdSchema,
  readDeletedUserSkillsByProfileIdSchema,
  readUserSkillByIdSchema,
  readUserSkillsSchema,
  readDeletedUserSkillsSchema,
} from "@/schemas";

// Infer types from schemas
type ReadUserSkillsInput = z.infer<typeof readUserSkillsSchema>;
type ReadUserSkillsByProfileIdInput = z.infer<
  typeof readUserSkillsByProfileIdSchema
>;
type ReadDeletedUserSkillsByProfileIdInput = z.infer<
  typeof readDeletedUserSkillsByProfileIdSchema
>;
type ReadUserSkillByIdInput = z.infer<typeof readUserSkillByIdSchema>;
type ReadDeletedUserSkillsInput = z.infer<typeof readDeletedUserSkillsSchema>;

export const useUserSkillsQueries = () => {
  // All user skills (optionally paginated)
  const useAllUserSkills = (
    input: ReadUserSkillsInput = { limit: 10, offset: 0 }
  ) => {
    return api.userSkill.read.useQuery(input);
  };

  // User skills by profile ID
  const useUserSkillsByProfileId = (input: ReadUserSkillsByProfileIdInput) => {
    return api.userSkill.readByProfileId.useQuery(input);
  };

  // Deleted user skills by profile ID
  const useDeletedUserSkillsByProfileId = (
    input: ReadDeletedUserSkillsByProfileIdInput
  ) => {
    return api.userSkill.readDeletedByProfileId.useQuery(input);
  };

  // Deleted user skills (global)
  const useDeletedUserSkills = (
    input: ReadDeletedUserSkillsInput = { limit: 10, offset: 0 }
  ) => {
    return api.userSkill.readDeleted.useQuery(input);
  };

  // Single user skill by ID
  const useUserSkillById = (input: ReadUserSkillByIdInput) => {
    return api.userSkill.readById.useQuery(input);
  };

  return {
    useAllUserSkills,
    useUserSkillsByProfileId,
    useDeletedUserSkillsByProfileId,
    useDeletedUserSkills,
    useUserSkillById,
  };
};
