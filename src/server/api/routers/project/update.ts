import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateProjectSchema } from "@/schemas";

export const updateProject = protectedProcedure
  .input(updateProjectSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingProject = await ctx.db.project.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existingProject.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Project already deleted",
      });
    }
    try {
      const project = await ctx.db.project.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          updatedById: userId,
        },
      });
      return project;
    } catch (error) {
      console.error("Error updating project:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update project",
        cause: error,
      });
    }
  });
