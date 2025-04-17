import { protectedProcedure } from "@/server/api/trpc";
import { any, z } from "zod";
import { TRPCError } from "@trpc/server";

export const MediaTypeEnum = z.enum([
  "VIDEO",
  "IMAGE",
  "PDF",
  "AUDIO",
  "DOCUMENT",
  "OTHER",
]);
export const StorageTypeEnum = z.enum([
  "LOCAL",
  "YOUTUBE",
  "S3",
  "CLOUDINARY",
  "EXTERNAL",
]);

export const createMedia = protectedProcedure
  .input(
    z.object({
      title: z.string(),
      type: MediaTypeEnum,
      storageType: StorageTypeEnum,
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
          title: input.title,
          type: input.type,
          storageType: input.storageType,
          url: input.url,
          originalFilename: input.originalFilename,
          sizeInBytes: input.sizeInBytes,
          mimeType: input.mimeType,
          metadata: input.metadata,
          profileId: input.profileId,
          companyId: input.companyId,
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
