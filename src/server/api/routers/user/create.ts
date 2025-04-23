import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { UserRole, UserStatus } from "@/generated/prisma/client";

export const createUser = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      hashedPassword: z.string(),
      name: z.string().optional(),
      image: z.string().optional(),
      role: z.nativeEnum(UserRole),
      status: z.nativeEnum(UserStatus),
    })
  )
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
