import { protectedProcedure } from "@/server/api/trpc";
import { createProjectCollaboratorSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const createProjectCollaborator = protectedProcedure
  .input(createProjectCollaboratorSchema)
  .mutation(async ({ ctx, input }) => {
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
  });
