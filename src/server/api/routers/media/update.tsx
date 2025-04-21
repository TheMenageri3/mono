import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { MediaType, StorageType } from "@/generated/prisma/client";

export const updateMedia = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      type: z.nativeEnum(MediaType).optional(),
      storageType: z.nativeEnum(StorageType).optional(),
      url: z.string().optional(),
      originalFilename: z.string().optional(),
      sizeInBytes: z.number().optional(),
      mimeType: z.string().optional(),
      metadata: z.record(z.any()).optional(),
      profileId: z.string().optional(),
      companyId: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existing = await ctx.db.media.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Media already deleted",
      });
    }

    try {
      const media = await ctx.db.media.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });

      return media;
    } catch (error) {
      console.error("Error updating media:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update media",
        cause: error,
      });
    }
  });
