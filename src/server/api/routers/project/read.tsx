import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readProjects = protectedProcedure.query(async ({ ctx }) => {
    try {
        const projects = await ctx.db.project.findMany({
            where: {
                deletedAt: null,
            },
            orderBy: {
                updatedAt: "desc",
            },
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

export const readDeletedProjects = protectedProcedure.query(
    async ({ ctx }) => {
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
    }
);

export const getProjectById = protectedProcedure
    .input(z.object({ id: z.string() }))
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
    .input(
        z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            shortDescription: z.string().optional(),
            status: z.enum(["IN_PROGRESS", "COMPLETED", "ARCHIVED"]).optional(),
            visibility: z.enum(["PRIVATE", "PUBLIC", "INTERNAL"]).optional(),
            githubUrl: z.string().url().optional(),
            demoUrl: z.string().url().optional(),
            outcome: z.string().optional(),
            challenges: z.string().optional(),
            isFeatured: z.boolean().optional(),
            startDate: z.date().optional(),
            endDate: z.date().optional(),
        })
    )
    .query(async ({ ctx, input}) => {
        try {
            const project = await ctx.db.project.findMany({
                where: {
                    ...input,
                    deletedAt: null,
                },
                orderBy: {
                    updatedAt: "desc",
                },
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