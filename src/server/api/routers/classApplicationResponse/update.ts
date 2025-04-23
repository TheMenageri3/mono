import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { ClassApplicationResponseStatus } from "@/generated/prisma/client";

const updateClassApplicationResponse = protectedProcedure
    .input(
        z.object({
            id: z.string(),
            data: z.object({
                status: z.nativeEnum(ClassApplicationResponseStatus).optional(),
                submittedAt: z.string().datetime().optional(),
                reviewedAt: z.string().datetime().optional(),
                feedback: z.string().optional(),
                reviewedById: z.string().optional(),
            })
        }))
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        try {
            const existingClassApplicationResponse = await ctx.db.classApplicationResponse.findUniqueOrThrow({
                where: {
                    id: input.id
                },
            });
            if (existingClassApplicationResponse.deletedAt !== null) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: `Class Application Response with ID ${input.id} has been deleted.`,
                });
            }
        } catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `Class Application Response with ID ${input.id} was not found.`,
                cause: error,
            });
        }
        try {
            const classApplicationResponse = await ctx.db.classApplicationResponse.update({
                where: {
                    id: input.id,
                },
                data: {
                    ...input.data,
                    submittedAt: input.data.submittedAt ? new Date(input.data.submittedAt) : undefined,
                    reviewedAt: input.data.reviewedAt ? new Date(input.data.reviewedAt) : undefined,
                    updatedById: userId,
                },
            });
            return classApplicationResponse;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to update classApplicationResponse.",
                cause: error,
            });
        }
    });

export {
    updateClassApplicationResponse
}
