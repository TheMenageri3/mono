import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  deleteProjectCollaboratorSchema,
  restoreProjectCollaboratorSchema,
} from "@/schemas";

export const deleteProjectCollaborator = protectedProcedure
  .input(deleteProjectCollaboratorSchema)
  .mutation(async ({ ctx, input }) => {
    try {
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
      const projectCollaborator = await ctx.db.projectCollaborator.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: new Date(),
          updatedById: currentUserId,
        },
      });
      return projectCollaborator;
    } catch (error) {
      console.error("Error deleting project collaborator by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete project collaborator",
        cause: error,
      });
    }
  });

export const restoreProjectCollaborator = protectedProcedure
  .input(restoreProjectCollaboratorSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const currentUserId = ctx.session.user.id;
      const existingProjectCollaborator =
        await ctx.db.projectCollaborator.findUniqueOrThrow({
          where: { id: input.id },
        });
      if (existingProjectCollaborator.deletedAt === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Project collaborator is not deleted",
        });
      }
      const projectCollaborator = await ctx.db.projectCollaborator.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: null,
          updatedById: currentUserId,
        },
      });
      return projectCollaborator;
    } catch (error) {
      console.error("Error restoring project collaborator by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore project collaborator",
        cause: error,
      });
    }
  });
