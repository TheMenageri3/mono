import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createEventSchema } from "@/schemas";

export const createEvent = protectedProcedure
  .input(createEventSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;

    try {
      return await ctx.db.event.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create event",
        cause: error,
      });
    }
  });
