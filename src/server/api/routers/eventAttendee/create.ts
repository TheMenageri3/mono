import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createEventAttendeeSchema } from "@/schemas";

export const createEventAttendee = protectedProcedure
  .input(createEventAttendeeSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user.id;

    try {
      return await ctx.db.eventAttendee.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create event attendee",
      });
    }
  });
