import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { updateJobApplicationSchema } from "./schema";

export const updateJobApplication = protectedProcedure
  .input(updateJobApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not authenticated",
      });
    }

    try {
      const updatedJobApplication = await ctx.db.jobApplication.update({
        where: { id: input.jobApplicationId },
        data: {
          ...input,
          updatedById: userId,

        },
      });
        return updatedJobApplication;
    } catch (error: unknown) {
      throw error;
    }
  });
