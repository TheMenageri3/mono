import { protectedProcedure } from "@/server/api/trpc";
import { any, z } from "zod";
import { TRPCError } from "@trpc/server";
import { MediaType, StorageType } from "@/generated/prisma/client";

export const createMedia = protectedProcedure
  .input(
    z.object({
      title: z.string(),
      type: z.nativeEnum(MediaType),
      storageType: z.nativeEnum(StorageType),
      url: z.string(),
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
    try {
      const media = await ctx.db.media.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return media;
    } catch (error) {
      console.error("Error creating media:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create media",
        cause: error,
      });
    }
  });
