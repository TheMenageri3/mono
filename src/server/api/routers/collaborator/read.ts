import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readProjectCollaborator = protectedProcedure.query(async ({ ctx}) => {
    try {
        const projectCollaborator = await ctx.db.projectCollaborator.findMany({
            where: {
                deletedAt: null,
            },
            orderBy: {
                updatedAt: "desc",
            },
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

export const readDeletedProjectCollaborator = protectedProcedure.query(
    async ({ ctx }) => {
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
    }
);

export const getProjectCollaboratorById = protectedProcedure
    .input(z.object({ id: z.string() }))
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
    .input (z.object({ projectId: z.string() }))
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
    .input (z.object({ userId: z.string() }))
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
    .input (
        z.object({
            role: z.string().optional(),
            contributions: z.string().optional(),
            userId: z.string().optional(),
            projectId: z.string().optional(),
            profileId: z.string().optional(),
        })
    )
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