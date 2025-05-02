import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createCompanyContactSchema } from "@/schemas";

export const createCompanyContact = protectedProcedure
  .input(createCompanyContactSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    try {
      return await ctx.db.companyContact.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create company contact",
        cause: error,
      });
    }
  });
