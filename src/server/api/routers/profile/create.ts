import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const createProfile = protectedProcedure
  .input(
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      username: z.string().optional(),
      jobTitle: z.string().optional(),
      department: z.string().optional(),
      bio: z.string().optional(),
      email: z.string().email(),
      phoneNumber: z.string(),
      timezone: z.string().optional(),
      languagePreference: z.string().optional(),
      notificationPreferences: z.any().optional(),
      walletAddress: z.string().optional(),
      onboardingCompleted: z.boolean().optional(),
      userId: z.string(),
      locationId: z.string().optional(),
      companyId: z.string().optional(),
      profilePictureId: z.string().optional(),
      socialMediaLinks: z.any().optional(),
      customFields: z.any().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    try {
      return ctx.db.profile.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error creating profile",
        cause: error,
      });
    }
  });
