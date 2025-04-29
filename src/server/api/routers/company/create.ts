import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createCompanySchema } from "@/schemas";

export const createCompany = protectedProcedure
  .input(createCompanySchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    try {
      return await ctx.db.company.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create company",
        cause: error,
      });
    }
  });
