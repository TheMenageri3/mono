import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { updateEmailTemplateSchema } from "@/schemas/emailTemplates";

export const updateEmailTemplate = protectedProcedure
  .input(updateEmailTemplateSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      return await ctx.db.emailTemplate.update({
        where: { id: input.id },
        data: {
          ...input.data,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to update email template with ID ${input.id}.`,
        cause: error,
      });
    }
  });