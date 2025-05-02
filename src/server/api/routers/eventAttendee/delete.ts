import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  deleteEventAttendeeSchema,
  restoreEventAttendeeSchema,
} from "@/schemas";

export const deleteEventAttendee = protectedProcedure
  .input(deleteEventAttendeeSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user.id;
    const existingAttendee = await ctx.db.eventAttendee.findUniqueOrThrow({
      where: {
        id: input.id,
      },
    });

    if (existingAttendee.deletedAt !== null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Event attendee already deleted",
      });
    }

    try {
      return await ctx.db.eventAttendee.update({
        where: {
          id: input.id,
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete event attendee",
        cause: error,
      });
    }
  });

export const restoreEventAttendee = protectedProcedure
  .input(restoreEventAttendeeSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user.id;
    const existingAttendee = await ctx.db.eventAttendee.findUniqueOrThrow({
      where: {
        id: input.id,
      },
    });

    if (existingAttendee.deletedAt === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Event attendee not deleted",
      });
    }

    try {
      return await ctx.db.eventAttendee.update({
        where: {
          id: input.id,
          deletedAt: {
            not: null,
          },
        },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore event attendee",
        cause: error,
      });
    }
  });
