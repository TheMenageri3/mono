import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const deleteEvent = protectedProcedure
  .input(z.object({ id: z.string() }))
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
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete event",
        cause: error,
      });
    }
  });

export const restoreEvent = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user.id;
    const existing = await ctx.db.event.findUniqueOrThrow({
      where: {
        id: input.id,
      },
    });

    if (existing.deletedAt === null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Event has not been deleted.",
      });
    }

    try {
      return await ctx.db.event.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore event",
        cause: error,
      });
    }
  });
