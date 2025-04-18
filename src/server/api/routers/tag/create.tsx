import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const createTag = protectedProcedure
  .input(
    z.object({
      tagName: z.string(),
      color: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const { tagName, color } = input;
      // Use session user ID if available, otherwise use a temporary ID
      const userId = ctx.session?.user?.id;

      // First check if a tag with this name already exists
      const existingTag = await ctx.db.tag.findUnique({
        where: { tagName },
      });

      if (existingTag) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A tag with this name already exists",
        });
      }

      const tag = await ctx.db.tag.create({
        data: {
          tagName,
          color,
          createdById: userId,
          updatedById: userId,
        },
      });

      return tag;
    } catch (error) {
      console.error("Error creating tag:", error);
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create tag",
        cause: error,
      });
    }
  });
