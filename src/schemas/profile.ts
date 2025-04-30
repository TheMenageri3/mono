import { z } from "zod";

//create
export const createProfileSchema = z.object({
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
});

//read
export const readProfileByIdSchema = z.object({ id: z.string() });
export const readProfilesSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedProfilesSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateProfileSchema = z.object({
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
});

//delete
export const deleteProfileSchema = z.object({ id: z.string() });
export const restoreProfileSchema = z.object({ id: z.string() });
