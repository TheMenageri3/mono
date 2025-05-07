import { api, RouterInputs } from "@/trpc/react";

import type { z } from "zod";
import {
  readCommentByIdSchema,
  readCommentByAdminCommentIdSchema,
  readCommentByAssignmentIdSchema,
  readCommentByClassApplicationIdSchema,
  readCommentByParentCommentIdSchema,
} from "@/schemas";

// Type inference from schemas
type ReadCommentById = z.infer<typeof readCommentByIdSchema>;
type ReadCommentByAdminCommentId = z.infer<typeof readCommentByAdminCommentIdSchema>;
type ReadCommentByAssignmentId = z.infer<typeof readCommentByAssignmentIdSchema>;
type ReadCommentByClassApplicationId = z.infer<typeof readCommentByClassApplicationIdSchema>;
type ReadCommentByParentCommentId = z.infer<typeof readCommentByParentCommentIdSchema>;

export const useCommentQueries = () => {
  const useCommentById = (input: ReadCommentById) => {
	return api.comment.readById.useQuery(input);
  };

  const useCommentByAdminCommentId = (input: ReadCommentByAdminCommentId) => {
	return api.comment.readByAdminCommentId.useQuery(input);
  };

  const useCommentByAssignmentId = (input: ReadCommentByAssignmentId) => {
	return api.comment.readByAssignmentId.useQuery(input);
  };

  const useCommentByClassApplicationId = (input: ReadCommentByClassApplicationId) => {
	return api.comment.readByClassApplicationId.useQuery(input);
  };

  const useCommentByParentCommentId = (input: ReadCommentByParentCommentId) => {
	return api.comment.readByParentCommentId.useQuery(input);
  };

  return {
	useCommentById,
	useCommentByAdminCommentId,
	useCommentByAssignmentId,
	useCommentByClassApplicationId,
	useCommentByParentCommentId,
  };
};
