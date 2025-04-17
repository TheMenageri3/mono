import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updateCompanyContact = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      department: z.string().optional(),
      isPrimary: z.boolean().optional(),
      engagementLevel: z
        .enum(["ACTIVE", "RESPONSIVE", "PASSIVE", "INACTIVE"])
        .optional(),
      lastContactDate: z.date().optional(),
      notes: z.string().optional(),
      companyId: z.string().optional(),
      userId: z.string().optional(),
      profileId: z.string().optional(),
    })
  )
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
