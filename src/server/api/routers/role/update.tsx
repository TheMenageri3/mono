import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updateRole = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      description: z.string().optional(),
      category: z
        .enum([
          "EXECUTIVE",
          "MANAGEMENT",
          "TECHNICAL",
          "BUSINESS",
          "OPERATIONS",
          "OTHER",
        ])
        .optional(),
      department: z.string().optional(),
      level: z
        .enum(["ENTRY", "MID", "SENIOR", "DIRECTOR", "EXECUTIVE", "C_SUITE"])
        .optional(),
      isInternal: z.boolean().optional(),
      profileId: z.string().optional(),
      companyId: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    try {
      const userId = ctx.session.user.id;
      return await ctx.db.role.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedAt: new Date(),
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update role",
        cause: error,
      });
    }
  });
