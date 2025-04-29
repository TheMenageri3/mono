import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

// 01. Get classApplicationQuestion by ID : NON-DELETED
const readClassApplicationQuestionById = protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
        try {
            const classApplicationQuestion = await ctx.db
                .classApplicationQuestion.findUniqueOrThrow({
                    where: {
                        id: input.id,
                        deletedAt: null,
                    },
                });
            return classApplicationQuestion;
        } catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message:
                    `Class Application Question with ID ${input.id} was not found.`,
                cause: error,
            });
        }
    });

// 02. Get classApplicationQuestions by classApplicationId : NON-DELETED
const readClassApplicationQuestionsByClassApplicationId = protectedProcedure
    .input(z.object({ classApplicationId: z.string() }))
    .query(async ({ ctx, input }) => {
        try {
            const classApplicationQuestions = await ctx.db
                .classApplicationQuestion.findMany({
                    where: {
                        classApplicationId: input.classApplicationId,
                        deletedAt: null,
                    },
                });
            return classApplicationQuestions;
        } catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message:
                    `Class Application Question with classApplicationId ${input.classApplicationId} was not found.`,
                cause: error,
            });
        }
    });

// 03. Get DELETED classApplicationQuestions by classApplicationId : DELETED
const readDeletedClassApplicationQuestionsByClassApplicationId =
    protectedProcedure
        .input(z.object({ classApplicationId: z.string() }))
        .query(async ({ ctx, input }) => {
            try {
                const classApplicationQuestions = await ctx.db
                    .classApplicationQuestion.findMany({
                        where: {
                            classApplicationId: input.classApplicationId,
                            deletedAt: { not: null },
                        },
                    });
                return classApplicationQuestions;
            } catch (error) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message:
                        `Class Application Question with classApplicationId ${input.classApplicationId} was not found.`,
                    cause: error,
                });
            }
        });

// 04. Get classApplicationQuestions by questionId : NON-DELETED
const readClassApplicationQuestionsByQuestionId = protectedProcedure
    .input(z.object({ questionId: z.string() }))
    .query(async ({ ctx, input }) => {
        try {
            const classApplicationQuestions = await ctx.db
                .classApplicationQuestion.findMany({
                    where: {
                        questionId: input.questionId,
                        deletedAt: null,
                    },
                });
            return classApplicationQuestions;
        } catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message:
                    `Class Application Question with questionId ${input.questionId} was not found.`,
                cause: error,
            });
        }
    });

export {
    readClassApplicationQuestionById,
    readClassApplicationQuestionsByClassApplicationId,
    readClassApplicationQuestionsByQuestionId,
    readDeletedClassApplicationQuestionsByClassApplicationId,
};
