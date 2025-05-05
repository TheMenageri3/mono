import { z } from "zod";
import { Category, Priority, Visibility } from "@/generated/prisma";

//create
export const createAdminCommentSchema = z.object({
  visibility: z.nativeEnum(Visibility),
  category: z.nativeEnum(Category),
  priority: z.nativeEnum(Priority).default(Priority.NORMAL),
  resolved: z.boolean().default(false),
  commentId: z.string(),
});

//read
export const readAdminCommentsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedAdminCommentsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getAdminCommentByIdSchema = z.object({ id: z.string() });
export const getAdminCommentByDataSchema = z.object({
  visibility: z.nativeEnum(Visibility).optional(),
  category: z.nativeEnum(Category).optional(),
  priority: z.nativeEnum(Priority).optional(),
  resolved: z.boolean().optional(),
  commentId: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateAdminCommentSchema = z.object({
  id: z.string(),
  data: z.object({
    visibility: z.nativeEnum(Visibility).optional(),
    category: z.nativeEnum(Category).optional(),
    priority: z.nativeEnum(Priority).optional(),
    resolved: z.boolean().optional(),
    commentId: z.string().optional(),
  }),
});

//delete
export const deleteAdminCommentSchema = z.object({
  id: z.string(),
});
export const restoreAdminCommentSchema = z.object({
  id: z.string(),
});
