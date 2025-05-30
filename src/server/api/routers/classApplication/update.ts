import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateClassApplicationSchema } from "@/schemas";

export const updateClassApplication = protectedProcedure
  .input(updateClassApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    let classApplication;
    try {
      classApplication = await ctx.db.classApplication.findUniqueOrThrow({
        where: { id: input.id },
      });
      if (classApplication.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Class Application with ID ${input.id} has been deleted.`,
        });
      }
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Class Application with ID ${input.id} was not found.`,
        cause: error,
      });
    }

    try {
      const classApplication = await ctx.db.classApplication.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });
      return classApplication;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update class application",
        cause: error,
      });
    }
  });
