import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateEventSchema } from "@/schemas";

export const updateEvent = protectedProcedure
  .input(updateEventSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user.id;

    const existing = await ctx.db.event.findUniqueOrThrow({
      where: {
        id: input.id,
      },
    });

    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Event has been deleted.",
      });
    }

    try {
      return await ctx.db.event.update({
        where: {
          id: input.id,
          deletedAt: null,
        },
        data: {
          ...input,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update event",
        cause: error,
      });
    }
  });
