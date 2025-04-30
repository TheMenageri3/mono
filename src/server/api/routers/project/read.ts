import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  readProjectsSchema,
  readDeletedProjectsSchema,
  getProjectByIdSchema,
  getProjectsByDataSchema,
} from "@/schemas";

export const readProjects = protectedProcedure
  .input(readProjectsSchema)
  .query(async ({ ctx, input }) => {
    try {
      const projects = await ctx.db.project.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return projects;
    } catch (error) {
      console.error("Error reading projects:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read projects",
        cause: error,
      });
    }
  });

export const readDeletedProjects = protectedProcedure
  .input(readDeletedProjectsSchema)
  .query(async ({ ctx, input }) => {
    try {
      const projects = await ctx.db.project.findMany({
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
      return projects;
    } catch (error) {
      console.error("Error reading deleted projects:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted projects",
        cause: error,
      });
    }
  });

export const getProjectById = protectedProcedure
  .input(getProjectByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const project = await ctx.db.project.findUnique({
        where: {
          id: input.id,
        },
      });
      return project;
    } catch (error) {
      console.error("Error getting project by ID:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get project by ID",
        cause: error,
      });
    }
  });

export const getProjectByData = protectedProcedure
  .input(getProjectsByDataSchema)
  .query(async ({ ctx, input }) => {
    try {
      const project = await ctx.db.project.findMany({
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
      return project;
    } catch (error) {
      console.error("Error getting project by data:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get project by data",
        cause: error,
      });
    }
  });
