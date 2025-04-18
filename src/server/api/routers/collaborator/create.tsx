import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const createProjectCollaborator = protectedProcedure
    .input(
        z.object({
            role: z.string(),
            contributions: z.string(),
            userId: z.string(),
            projectId: z.string(),
            profileId: z.string(),
        })
    )
    .mutation(async ({ ctx, input}) => {
        const currentUserId = ctx.session.user.id;

        try {
            const projectCollaborator = await ctx.db.projectCollaborator.create({
                data: {
                    role: input.role,
                    contributions: input.contributions,
                    userId: input.userId,
                    projectId: input.projectId,
                    profileId: input.profileId,
                    createdById: currentUserId,
                    updatedById: currentUserId,
                },
            });
            return projectCollaborator;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create collaborator",
                cause: error,
            });
        }
    })