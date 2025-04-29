import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createProfileSchema } from "@/schemas";

export const createProfile = protectedProcedure
  .input(createProfileSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    try {
      return ctx.db.profile.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error creating profile",
        cause: error,
      });
    }
  });
