import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";


// 01. Get answer by ID : NON-DELETED
const readAnswerById = protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
        try {
            return await ctx.db.answer.findUniqueOrThrow({
                where: {
                    id: input.id,
                    deletedAt: null,
                },
                include: {
                    question: true,
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `Answer with ID ${input.id} not found.`,
                cause: error,
            });
        }
    });

// 02. Get all ACTIVE answers : NON-DELETED
const readAllAnswers = protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.answer.findMany({
        where: {
            deletedAt: null,
        },
        orderBy: { updatedAt: "desc" },
    });
});

// 03. Get all DELETED answers
const readDeletedAnswers = protectedProcedure.query(async ({ ctx }) => {
    try {
        const answers = await ctx.db.answer.findMany({
            where: {
                deletedAt: { not: null },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        return answers;
    } catch (error) {
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch deleted answers",
            cause: error,
        });
    }
});

export {
    readAnswerById,
    readAllAnswers,
    readDeletedAnswers,
}