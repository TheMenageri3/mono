import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { RoleCategory, RoleLevel } from "@/generated/prisma/client";

export const createRole = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      description: z.string(),
      category: z.nativeEnum(RoleCategory),
      department: z.string().optional(),
      level: z.nativeEnum(RoleLevel),
      isInternal: z.boolean(),
      profileId: z.string(),
      companyId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      const role = await ctx.db.role.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return role;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create role",
        cause: error,
      });
    }
  });
