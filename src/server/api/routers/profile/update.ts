import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updateProfile = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      username: z.string().optional(),
      jobTitle: z.string().optional(),
      department: z.string().optional(),
      bio: z.string().optional(),
      email: z.string().email().optional(),
      phoneNumber: z.string().optional(),
      timezone: z.string().optional(),
      languagePreference: z.string().optional(),
      notificationPreferences: z.any().optional(),
      walletAddress: z.string().optional(),
      onboardingCompleted: z.boolean().optional(),
      locationId: z.string().optional(),
      companyId: z.string().optional(),
      profilePictureId: z.string().optional(),
      socialMediaLinks: z.any().optional(),
      customFields: z.any().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existing = await ctx.db.profile.findUniqueOrThrow({
      where: { id: input.id },
    });
    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Profile already deleted",
      });
    }
    try {
      const profile = await ctx.db.profile.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });
      return profile;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update profile",
        cause: error,
      });
    }
  });
