import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { readEmailTemplateByIdSchema, readAllEmailTemplatesSchema } from "@/schemas/emailTemplates";
export const readEmailTemplateById = protectedProcedure
  .input(readEmailTemplateByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.emailTemplate.findUniqueOrThrow({
        where: { id: input.id },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Email template with ID ${input.id} not found.`,
        cause: error,
      });
    }
  });

export const readAllEmailTemplates = protectedProcedure
  .input(readAllEmailTemplatesSchema)
  .query(async ({ ctx, input }) => {
    return await ctx.db.emailTemplate.findMany({
      orderBy: { updatedAt: "desc" },
      take: input.limit,
      skip: input.offset,
    });
  });
