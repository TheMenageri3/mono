import { protectedProcedure } from "@/server/api/trpc";
import { updateClassSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const updateClass = protectedProcedure
  .input(updateClassSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingClass = await ctx.db.class.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existingClass.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Class already deleted",
      });
    }

    try {
      const class_ = await ctx.db.class.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          updatedById: userId,
        },
      });
      return class_;
    } catch (error) {
      console.error("Error updating class:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update class",
        cause: error,
      });
    }
  });
