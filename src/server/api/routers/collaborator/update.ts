import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updateProjectCollaborator = protectedProcedure
    .input(
        z.object({
            id: z.string().optional(),
            role: z.string().optional(),
            contributions: z.string().optional(),
            userId: z.string().optional(),
            projectId: z.string().optional(),
            profileId: z.string().optional(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const currentUserId = ctx.session.user.id;
        const existingProjectCollaborator = await ctx.db.projectCollaborator.findUniqueOrThrow({
            where: { id: input.id },
        });

        if (existingProjectCollaborator.deletedAt !== null) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Project collaborator already deleted",
            });
        }
        try {
            const projectCollaborator = await ctx.db.projectCollaborator.update({
                where: {
                    id: input.id,
                },
                data: {
                    ...input,
                    updatedById: currentUserId,
                },
            })
            return projectCollaborator;
        } catch (error) {
            console.error("Error updating project collaborator:", error);
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to update project collaborator",
                cause: error,
            });
        }
    })