import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  readProjectCollaboratorSchema,
  readDeletedProjectCollaboratorSchema,
  getProjectCollaboratorByIdSchema,
  getProjectCollaboratorByProjectIdSchema,
  getProjectCollaboratorByUserIdSchema,
  getProjectCollaboratorByDataSchema,
} from "@/schemas";

export const readProjectCollaborator = protectedProcedure
  .input(readProjectCollaboratorSchema)
  .query(async ({ ctx, input }) => {
    try {
      const projectCollaborator = await ctx.db.projectCollaborator.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return projectCollaborator;
    } catch (error) {
      console.error("Error reading project collaborators:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read project collaborators",
        cause: error,
      });
    }
  });

export const readDeletedProjectCollaborator = protectedProcedure
  .input(readDeletedProjectCollaboratorSchema)
  .query(async ({ ctx, input }) => {
    try {
      const projectCollaborator = await ctx.db.projectCollaborator.findMany({
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
      return projectCollaborator;
    } catch (error) {
      console.error("Error reading deleted project collaborators:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted project collaborators",
        cause: error,
      });
    }
  });

export const getProjectCollaboratorById = protectedProcedure
  .input(getProjectCollaboratorByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const projectCollaborator = await ctx.db.projectCollaborator.findUnique({
        where: {
          id: input.id,
        },
      });
      return projectCollaborator;
    } catch (error) {
      console.error("Error reading project collaborator by ID:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read project collaborator by ID",
        cause: error,
      });
    }
  });

export const getProjectCollaboratorByProjectId = protectedProcedure
  .input(getProjectCollaboratorByProjectIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const projectCollaborator = await ctx.db.projectCollaborator.findMany({
        where: {
          projectId: input.projectId,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return projectCollaborator;
    } catch (error) {
      console.error("Error reading project collaborator by project ID:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read project collaborator by project ID",
        cause: error,
      });
    }
  });

export const getProjectCollaboratorByUserId = protectedProcedure
  .input(getProjectCollaboratorByUserIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const projectCollaborator = await ctx.db.projectCollaborator.findMany({
        where: {
          userId: input.userId,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return projectCollaborator;
    } catch (error) {
      console.error("Error reading project collaborator by user ID:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read project collaborator by user ID",
        cause: error,
      });
    }
  });

export const getProjectCollaboratorByData = protectedProcedure
  .input(getProjectCollaboratorByDataSchema)
  .query(async ({ ctx, input }) => {
    try {
      const projectCollaborator = await ctx.db.projectCollaborator.findMany({
        where: {
          ...input,
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return projectCollaborator;
    } catch (error) {
      console.error("Error reading project collaborator by data:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read project collaborator by data",
        cause: error,
      });
    }
  });
