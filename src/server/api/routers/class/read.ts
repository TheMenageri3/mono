import { protectedProcedure } from "@/server/api/trpc";
import {
  readClassesSchema,
  readDeletedClassesSchema,
  getClassByIdSchema,
  getClassesByDataSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const readClasses = protectedProcedure
  .input(readClassesSchema)
  .query(async ({ ctx, input }) => {
    try {
      const classes = await ctx.db.class.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return classes;
    } catch (error) {
      console.error("Error reading classes:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read classes",
        cause: error,
      });
    }
  });

export const readDeletedClasses = protectedProcedure
  .input(readDeletedClassesSchema)
  .query(async ({ ctx, input }) => {
    try {
      const classes = await ctx.db.class.findMany({
        where: {
          deletedAt: {
            not: null,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return classes;
    } catch (error) {
      console.error("Error reading deleted classes:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted classes",
        cause: error,
      });
    }
  });

export const getClassById = protectedProcedure
  .input(getClassByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const class_ = await ctx.db.class.findUnique({
        where: {
          id: input.id,
        },
      });
      return class_;
    } catch (error) {
      console.error("Error getting class by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get class",
        cause: error,
      });
    }
  });

export const getClassesByData = protectedProcedure
  .input(getClassesByDataSchema)
  .query(async ({ ctx, input }) => {
    try {
      const classes = await ctx.db.class.findMany({
        where: {
          ...input,
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return classes;
    } catch (error) {
      console.error("Error getting classes by data:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get classes",
        cause: error,
      });
    }
  });
