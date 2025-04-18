import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "@/server/api/trpc";

export const createClassApplication = protectedProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      status: z.enum(["ACTIVE", "DRAFT", "ARCHIVED"]),
      startDate: z.string().datetime(),
      endDate: z.string().datetime(),
      classId: z.string(),
      publisherId: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const classApplication = await ctx.db.classApplication.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return classApplication;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create classApplication",
        cause: error,
      });
    }
  });
