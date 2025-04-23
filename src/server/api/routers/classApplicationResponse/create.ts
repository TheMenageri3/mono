import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { ClassApplicationResponseStatus } from "@/generated/prisma/client";

const createClassApplicationResponse = protectedProcedure
    .input(
        z.object({
            status: z.nativeEnum(ClassApplicationResponseStatus),
            submittedAt: z.string().datetime().optional(),
            reviewedAt: z.string().datetime().optional(),
            feedback: z.string().optional(),
            classApplicationId: z.string(),
            applicantId: z.string(),
            reviewedById: z.string().optional(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        try {
            const classApplicationResponse = await ctx.db.classApplicationResponse.create({
                data: {
                    ...input,
                    submittedAt: input.submittedAt ? new Date(input.submittedAt) : undefined,
                    reviewedAt: input.reviewedAt ? new Date(input.reviewedAt) : undefined,
                    createdById: userId,
                    updatedById: userId,
                },
            });
            return classApplicationResponse;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create classApplicationResponse.",
                cause: error,
            });
        }
    });

export {
    createClassApplicationResponse
}
