import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const getAssignmentQuestionById = protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
        try {
        const assignmentQuestion = await ctx.db.assignmentQuestion.findUniqueOrThrow({
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
    .input(z.object({ assignmentId: z.string() }))
    .query(async ({ ctx, input}) => {
        return await ctx.db.assignmentQuestion.findMany({
            where: {
                assignmentId: input.assignmentId,
                deletedAt: null,
            },
            orderBy: { updatedAt: "desc" },
        });
    })

const getSectionsByAssignmentId = protectedProcedure
    .input(z.object({ assignmentId: z.string() }))
    .query(async ({ ctx, input }) => {
        const section  = await ctx.db.assignmentQuestion.findMany({
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
              distinct: ['section'],
              orderBy: {
                order: 'desc',
              },
        });
        return section.map(item => item.section).filter(Boolean);
    })

    const getDeletedAssignmentQuestionsByAssignmentId = protectedProcedure
    .input(z.object({ assignmentId: z.string() }))
    .query(async ({ ctx, input }) => {
        try {
            return await ctx.db.assignmentQuestion.findMany({
                where: {
                    assignmentId: input.assignmentId,
                    deletedAt: { not: null },
                },
                orderBy: { updatedAt: "desc" },
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
    .input(
        z.object({
            assignmentId: z.string().optional(),
            questionId: z.string().optional(),
            section: z.string().optional(),
            required: z.boolean().optional(),
            order: z.enum(["order", "points", "createdAt", "updatedAt"]).optional().default("order"),
            includeDeleted: z.boolean().optional(),
        })
    )
    .query(async ({ ctx, input }) => {
        try {
            return await ctx.db.assignmentQuestion.findMany({
                where: {
                    ...(input.assignmentId && { assignmentId: input.assignmentId }),
                    ...(input.questionId && { questionId: input.questionId }),
                    ...(input.section && { section: input.section }),
                    ...(typeof input.required === "boolean" && { required: input.required }),
                    ...(input.includeDeleted ? {} : { deletedAt: null }),
                },
                include: {
                    question: true,
                    assignment: true,
                },
                orderBy: {
                    [input.order]: "desc",
                },
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
        getSectionsByAssignmentId
      };

    