import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateCompanyContactSchema } from "@/schemas";

export const updateCompanyContact = protectedProcedure
  .input(updateCompanyContactSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const userId = ctx.session.user.id;
      const existing = await ctx.db.companyContact.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existing.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Company contact already deleted",
        });
      }

      return await ctx.db.companyContact.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update company contact",
        cause: error,
      });
    }
  });
