import { TRPCError } from "@trpc/server";
import { createEmailTemplateSchema } from "@/schemas/emailTemplates";
import { protectedProcedure } from "@/server/api/trpc";

export const createEmailTemplate = protectedProcedure
  .input(createEmailTemplateSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      return await ctx.db.emailTemplate.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create email template.",
        cause: error,
      });
    }
  });