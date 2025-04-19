import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const deleteEventCompany = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      const eventCompany = await ctx.db.eventCompany.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (eventCompany.deletedAt !== null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Event company already deleted",
        });
      }

      return await ctx.db.eventCompany.update({
        where: { id: input.id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete event company",
        cause: error,
      });
    }
  });

export const restoreEventCompany = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      const eventCompany = await ctx.db.eventCompany.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (eventCompany.deletedAt === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Event company not deleted",
        });
      }

      return await ctx.db.eventCompany.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          // updatedById: userId
        },
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore event company",
        cause: error,
      });
    }
  });
