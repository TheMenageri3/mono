import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import {
  deleteEmailTemplateSchema,
  restoreEmailTemplateSchema,
} from "@/schemas/emailTemplates";

export const deleteEmailTemplate = protectedProcedure
  .input(deleteEmailTemplateSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      return await ctx.db.emailTemplate.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to soft delete email template with ID ${input.id}.`,
        cause: error,
      });
    }
  });

export const restoreEmailTemplate = protectedProcedure
  .input(restoreEmailTemplateSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      return await ctx.db.emailTemplate.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to restore email template with ID ${input.id}.`,
        cause: error,
      });
    }
  });
