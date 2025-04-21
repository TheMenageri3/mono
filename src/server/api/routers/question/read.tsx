import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

//01. Get question by ID - NON-DELETED
const readQuestionById = protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
        try {
            const question = await ctx.db.question.findUniqueOrThrow({
                where: {
                    id: input.id,
                    deletedAt: null,
                },
            });
            return question;
        } catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `Question with ID ${input.id} was not found.`,
                cause: error,
            });
        }
    });

//02. Get all ACTIVE questions - NON-DELETED
const readAllActiveQuestions = protectedProcedure.query(async ({ ctx }) => {
    try {
        const questions = await ctx.db.question.findMany({
            where: {
                deletedAt: null,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        return questions;
    } catch (error) {
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch questions",
            cause: error,
        });
    }
});

//03. Get All DELETED questions
const readDeletedQuestions = protectedProcedure.query(async ({ ctx }) => {
    try {
        const questions = await ctx.db.question.findMany({
            where: {
                deletedAt: { not: null },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        return questions;
    } catch (error) {
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch deleted questions",
            cause: error,
        });
    }
});

export {
    readQuestionById,
    readAllActiveQuestions,
    readDeletedQuestions,
}