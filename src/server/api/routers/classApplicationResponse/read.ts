import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  getClassApplicationResponseByIdSchema,
  getClassApplicationResponsesByClassApplicationSchema,
  getClassApplicationResponseByApplicantSchema,
  getClassApplicationResponsesSchema,
} from "@/schemas";

//  01.Get classApplicationResponse by ID : NON-DELETED
const getClassApplicationResponseById = protectedProcedure
  .input(getClassApplicationResponseByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const classApplicationResponse =
        await ctx.db.classApplicationResponse.findUniqueOrThrow({
          where: {
            id: input.id,
            deletedAt: null,
          },
        });
      return classApplicationResponse;
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Class Application Response with ID ${input.id} was not found.`,
        cause: error,
      });
    }
  });

//  02.Get classApplicationResponses by classApplication : NON-DELETED
const getClassApplicationResponsesByClassApplication = protectedProcedure
  .input(getClassApplicationResponsesByClassApplicationSchema)
  .query(async ({ ctx, input }) => {
    const classApplicationResponses =
      await ctx.db.classApplicationResponse.findMany({
        where: {
          classApplicationId: input.classApplicationId,
          deletedAt: null,
        },
        take: input.limit,
        skip: input.offset,
      });
    return classApplicationResponses;
  });

//03.Get classApplicationResponses by applicant : NON-DELETED
const getClassApplicationResponseByApplicant = protectedProcedure
  .input(getClassApplicationResponseByApplicantSchema)
  .query(async ({ ctx, input }) => {
    const classApplicationResponses =
      await ctx.db.classApplicationResponse.findMany({
        where: {
          applicantId: input.applicantId,
          deletedAt: null,
        },
        take: input.limit,
        skip: input.offset,
      });
    return classApplicationResponses;
  });

//04.Getting all classApplicationResponses :  NON-DELETED
const getClassApplicationResponses = protectedProcedure
  .input(getClassApplicationResponsesSchema)
  .query(async ({ ctx, input }) => {
    try {
      const classApplicationResponses =
        await ctx.db.classApplicationResponse.findMany({
          where: {
            deletedAt: null,
          },
          orderBy: {
            updatedAt: "desc",
          },
          take: input.limit,
          skip: input.offset,
        });
      return classApplicationResponses;
    } catch (error) {
      console.error("Error reading classApplicationResponses:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read classApplicationResponses",
        cause: error,
      });
    }
  });

export {
  getClassApplicationResponseById,
  getClassApplicationResponsesByClassApplication,
  getClassApplicationResponseByApplicant,
  getClassApplicationResponses,
};
