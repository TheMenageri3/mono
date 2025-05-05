import { protectedProcedure } from "@/server/api/trpc";
import { createEventCompanySchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const createEventCompany = protectedProcedure
  .input(createEventCompanySchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;

      return await ctx.db.eventCompany.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create event company",
        cause: error,
      });
    }
  });
