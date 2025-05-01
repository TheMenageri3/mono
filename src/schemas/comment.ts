import { z } from "zod";
import { CommentStatus } from "@/generated/prisma";

//create
export const createCommentSchema = z.object({
  text: z.string(),
  status: z.nativeEnum(CommentStatus),
  commenterId: z.string(),
  assignmentId: z.string().optional(),
  classApplicationId: z.string().optional(),
  adminCommentId: z.string().optional(),
  parentCommentId: z.string().optional(),
});

//read
export const readCommentByIdSchema = z.object({ id: z.string() });
export const readCommentByClassApplicationIdSchema = z.object({
  classApplicationId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readCommentByAssignmentIdSchema = z.object({
  assignmentId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readCommentByAdminCommentIdSchema = z.object({
  adminCommentId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readCommentByParentCommentIdSchema = z.object({
  parentCommentId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateCommentSchema = z.object({
  id: z.string(),
  data: z.object({
    text: z.string().optional(),
    status: z.nativeEnum(CommentStatus).optional(),
    assignmentId: z.string().optional(),
    classApplicationId: z.string().optional(),
    adminCommentId: z.string().optional(),
    parentCommentId: z.string().optional(),
  }),
});

//delete
export const deleteCommentSchema = z.object({ id: z.string() });
export const restoreCommentSchema = z.object({ id: z.string() });
