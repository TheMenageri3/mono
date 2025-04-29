import { protectedProcedure } from "@/server/api/trpc";
import { updateProjectCollaboratorSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const updateProjectCollaborator = protectedProcedure
  .input(updateProjectCollaboratorSchema)
  .mutation(async ({ ctx, input }) => {
    const currentUserId = ctx.session.user.id;
    const existingProjectCollaborator =
      await ctx.db.projectCollaborator.findUniqueOrThrow({
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
      });
      return projectCollaborator;
    } catch (error) {
      console.error("Error updating project collaborator:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update project collaborator",
        cause: error,
      });
    }
  });
