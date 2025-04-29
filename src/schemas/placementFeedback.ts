import { z } from "zod";
import { FeedbackType, SatisfactionLevel } from "@/generated/prisma";

//create
export const createPlacementFeedbackSchema = z.object({
  feedbackType: z.nativeEnum(FeedbackType),
  satisfactionLevel: z.nativeEnum(SatisfactionLevel),
  preparednessRating: z.number().min(1).max(5),
  skillsMatchRating: z.number().min(1).max(5),
  cultureFitRating: z.number().min(1).max(5),
  feedbackText: z.string(),
  improvementSuggestions: z.string().optional(),
  followUpNeeded: z.boolean(),
  respondentId: z.string(),
  placementId: z.string(),
});

//read
export const readPlacementFeedbackByIdSchema = z.object({ id: z.string() });
export const readPlacementFeedbackSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedPlacementFeedbacksSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getPlacementFeedbackByDataSchema = z.object({
  feedbackType: z.nativeEnum(FeedbackType).optional(),
  satisfactionLevel: z.nativeEnum(SatisfactionLevel).optional(),
  preparednessRating: z.number().min(1).max(5).optional(),
  skillsMatchRating: z.number().min(1).max(5).optional(),
  cultureFitRating: z.number().min(1).max(5).optional(),
  feedbackText: z.string().optional(),
  improvementSuggestions: z.string().optional(),
  followUpNeeded: z.boolean().optional(),
  respondentId: z.string().optional(),
  placementId: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updatePlacementFeedbackSchema = z.object({
  id: z.string(),
  feedbackType: z.nativeEnum(FeedbackType).optional(),
  satisfactionLevel: z.nativeEnum(SatisfactionLevel).optional(),
  preparednessRating: z.number().min(1).max(5).optional(),
  skillsMatchRating: z.number().min(1).max(5).optional(),
  cultureFitRating: z.number().min(1).max(5).optional(),
  feedbackText: z.string().optional(),
  improvementSuggestions: z.string().optional(),
  followUpNeeded: z.boolean().optional(),
  respondentId: z.string().optional(),
  placementId: z.string().optional(),
});

//delete
export const deletePlacementFeedbackSchema = z.object({ id: z.string() });
export const restorePlacementFeedbackSchema = z.object({ id: z.string() });
