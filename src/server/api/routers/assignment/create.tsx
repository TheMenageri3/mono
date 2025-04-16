import { TRPCError } from "@trpc/server";
import {z} from "zod";
import { protectedProcedure } from "@/server/api/trpc";

const createAssignment = protectedProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      type: z.enum(["INDIVIDUAL", "GROUP", "EXAM", "PROJECT", "PREREQUISITE"]),
      status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
      submissionType: z.enum(["TEXT", "FILE", "LINK", "CODE", "MIXED"]),
      submissionInstructions: z.string(),
      pointsPossible: z.number().optional(),
      gradingRubric: z.object({}).optional(),
      releaseDate: z.date().optional(),
      dueDate: z.date().optional(),
      allowLateSubmissions: z.boolean().optional(),
      latePenalty: z.object({}).optional(),
      classId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;

      return await ctx.db.assignment.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create assignment.",
        cause: error,
      });
    }
  });

  export {
    createAssignment
  }
