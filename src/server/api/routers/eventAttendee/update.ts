import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateEventAttendeeSchema } from "@/schemas";

export const updateEventAttendee = protectedProcedure
  .input(updateEventAttendeeSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user.id;
    const existingAttendee = await ctx.db.eventAttendee.findUnique({
      where: {
        id: input.id,
        deletedAt: null,
      },
    });

    if (!existingAttendee) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Event attendee not found",
      });
    }

    try {
      return await ctx.db.eventAttendee.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update event attendee",
        cause: error,
      });
    }
  });
