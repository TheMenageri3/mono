import { z } from "zod";
import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const deleteAssignment = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    try {
      return await ctx.db.assignment.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Assignment with ID ${input.id} could not be deleted.`,
        cause: error,
      });
    }
  });
