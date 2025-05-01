import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateEventCompanySchema } from "@/schemas";

export const updateEventCompany = protectedProcedure
  .input(updateEventCompanySchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      const existingEventCompany = await ctx.db.eventCompany.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existingEventCompany.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event company delted",
        });
      }

      return await ctx.db.eventCompany.update({
        where: { id: input.id },
        data: {
          ...input,
          // updatedById: userId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update event company",
      });
    }
  });
