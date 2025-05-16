import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { deleteEmailTemplateSchema, restoreEmailTemplateSchema } from "@/schemas/emailTemplates";

export const deleteEmailTemplate = protectedProcedure
  .input(deleteEmailTemplateSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      return await ctx.db.emailTemplate.delete({
        where: { id: input.id },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to delete email template with ID ${input.id}.`,
        cause: error,
      });
    }
  });

  export const restoreEmailTemplate = protectedProcedure
  .input(restoreEmailTemplateSchema)
  .mutation(async () => {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
      message: "Restore not implemented for email templates.",
    });
  });
