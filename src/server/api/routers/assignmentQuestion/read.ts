import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getAssignmentQuestionByIdSchema,
  getAssignmentQuestionsByAssignmentIdSchema,
  getSectionsByAssignmentIdSchema,
  getDeletedAssignmentQuestionsByAssignmentIdSchema,
  getAssignmentQuestionsByFilterSchema,
} from "@/schemas";

const getAssignmentQuestionById = protectedProcedure
  .input(getAssignmentQuestionByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const assignmentQuestion =
        await ctx.db.assignmentQuestion.findUniqueOrThrow({
          where: { id: input.id },
          include: {
            assignment: true,
            question: true,
            createdBy: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            updatedBy: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });

      return assignmentQuestion;
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Assignment question with ID ${input.id} was not found.`,
        cause: error,
      });
    }
  });

const getAssignmentQuestionsByAssignmentId = protectedProcedure
  .input(getAssignmentQuestionsByAssignmentIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.assignmentQuestion.findMany({
        where: {
          assignmentId: input.assignmentId,
          deletedAt: null,
        },
        orderBy: { updatedAt: "desc" },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to retrieve questions for assignment ${input.assignmentId}`,
        cause: error,
      });
    }
  });

const getSectionsByAssignmentId = protectedProcedure
  .input(getSectionsByAssignmentIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const section = await ctx.db.assignmentQuestion.findMany({
        where: {
          assignmentId: input.assignmentId,
          deletedAt: null,
          section: {
            not: null,
          },
        },
        select: {
          section: true,
        },
        distinct: ["section"],
        orderBy: {
          order: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return section.map((item) => item.section).filter(Boolean);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to retrieve sections for assignment ${input.assignmentId}`,
        cause: error,
      });
    }
  });
const getDeletedAssignmentQuestionsByAssignmentId = protectedProcedure
  .input(getDeletedAssignmentQuestionsByAssignmentIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.assignmentQuestion.findMany({
        where: {
          assignmentId: input.assignmentId,
          deletedAt: { not: null },
        },
        orderBy: { updatedAt: "desc" },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to fetch deleted assignment questions for assignment ID ${input.assignmentId}.`,
        cause: error,
      });
    }
  });

const getAssignmentQuestionsByFilter = protectedProcedure
  .input(getAssignmentQuestionsByFilterSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.assignmentQuestion.findMany({
        where: {
          ...(input.assignmentId && { assignmentId: input.assignmentId }),
          ...(input.questionId && { questionId: input.questionId }),
          ...(input.section && { section: input.section }),
          ...(typeof input.required === "boolean" && {
            required: input.required,
          }),
          ...(input.includeDeleted ? {} : { deletedAt: null }),
        },
        include: {
          question: true,
          assignment: true,
        },
        orderBy: {
          order: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch assignment questions by filter.",
        cause: error,
      });
    }
  });

export {
  getAssignmentQuestionById,
  getAssignmentQuestionsByAssignmentId as readAssignmentQuestions,
  getDeletedAssignmentQuestionsByAssignmentId as readDeletedAssignmentQuestions,
  getAssignmentQuestionsByFilter,
  getSectionsByAssignmentId,
};
