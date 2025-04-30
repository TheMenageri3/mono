import { publicProcedure } from "@/server/api/trpc";
import { createUserSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const createUser = publicProcedure
  .input(createUserSchema)
  .mutation(async ({ ctx, input }) => {
    const existing = await ctx.db.user.findUniqueOrThrow({
      where: { email: input.email },
    });
    if (existing) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User already exists",
      });
    }
    try {
      const user = await ctx.db.user.create({
        data: {
          ...input,
        },
      });
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error creating user",
        cause: error,
      });
    }
  });
