import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readAdminComments = protectedProcedure.query(async ({ ctx }) => {
  try {
    const adminComments = await ctx.db.adminComment.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        comment: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
          },
        },
      },
    });
    return adminComments;
  } catch (error) {
    console.error("Error reading admin comments:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read admin comments",
      cause: error,
    });
  }
});

export const readDeletedAdminComments = protectedProcedure.query(
  async ({ ctx }) => {
    try {
      const adminComments = await ctx.db.adminComment.findMany({
        where: {
          deletedAt: {
            not: null,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          comment: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
        },
      });
      return adminComments;
    } catch (error) {
      console.error("Error reading deleted admin comments:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted admin comments",
        cause: error,
      });
    }
  }
);

export const getAdminCommentById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    try {
      const adminComment = await ctx.db.adminComment.findUnique({
        where: {
          id: input.id,
        },
        include: {
          comment: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
          updatedBy: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
        },
      });
      return adminComment;
    } catch (error) {
      console.error("Error getting admin comment by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get admin comment",
        cause: error,
      });
    }
  });

export const getAdminCommentByData = protectedProcedure
  .input(
    z.object({
      visibility: z.enum(["ADMIN_ONLY", "INSTRUCTORS_ONLY", "STAFF_AND_INSTRUCTORS", "STAFF_INSTRUCTORS_AND_STUDENT", "PUBLIC"]).optional(),
      category: z.enum(["FEEDBACK", "EVALUATION", "INTERNAL_NOTE", "DECISION_RATIONALE", "FOLLOWUP_REQUIRED"]).optional(),
      priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).optional(),
      resolved: z.boolean().optional(),
      commentId: z.string().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      const adminComments = await ctx.db.adminComment.findMany({
        where: {
          ...input,
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          comment: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
        },
      });
      return adminComments;
    } catch (error) {
      console.error("Error getting admin comments by data:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get admin comments",
        cause: error,
      });
    }
  });