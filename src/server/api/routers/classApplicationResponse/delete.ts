import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";


const deleteClassApplicationResponse = protectedProcedure
    .input(z.object({ id: z.string() }))
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
                    deletedAt: new Date(),
                    updatedById: userId,
                },
            });
            return classApplicationResponse;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to delete classApplicationResponse.",
                cause: error,
            });
        }
    });

//Restoration
const restoreClassApplicationResponse = protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        try {
            const existingClassApplicationResponse = await ctx.db.classApplicationResponse.findUniqueOrThrow({
                where: {
                    id: input.id
                },
            });
            if (existingClassApplicationResponse.deletedAt === null) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Class Application Response is not deleted",
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
                    deletedAt: null,
                    updatedById: userId,
                },
            });
            return classApplicationResponse;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to restore classApplicationResponse.",
                cause: error,
            });
        }
    });

export {
    deleteClassApplicationResponse,
    restoreClassApplicationResponse
}
