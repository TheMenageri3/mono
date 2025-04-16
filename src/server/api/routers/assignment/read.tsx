import { z } from "zod";
import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const readAssignments = protectedProcedure
  .input(z.object({ classId: z.string() }))
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.assignment.findMany({
        where: {
          deletedAt: null,
          ...(input.classId && { classId: input.classId }),
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch assignments.",
        cause: error,
      });
    }
  });
