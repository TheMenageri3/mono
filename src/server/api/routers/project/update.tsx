import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { ProjectStatus, VisibilityStatus } from "@/generated/prisma/client";

export const updateProject = protectedProcedure
    .input(
        z.object({
            id: z.string(),
            title: z.string().optional(),
            description: z.string().optional(),
            shortDescription: z.string().optional(),
            status: z.nativeEnum(ProjectStatus).optional(),
            visibility: z.nativeEnum(VisibilityStatus).optional(),
            githubUrl: z.string().url().optional(),
            demoUrl: z.string().url().optional(),
            outcome: z.string().optional(),
            challenges: z.string().optional(),
            isFeatured: z.boolean().optional(),
            startDate: z.string().datetime().optional(),
            endDate: z.string().datetime().optional(),
        })
    )
    .mutation(async ({ input, ctx }) => {
        const userId = ctx.session.user.id;
        const existingProject = await ctx.db.project.findUniqueOrThrow({
            where: { id: input.id },
        });

        if (existingProject.deletedAt !== null) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Project already deleted",
            });
        }
        try {
            const project = await ctx.db.project.update({
                where: {
                    id: input.id,
                },
                data: {
                    ...input,
                    updatedById: userId,
                },
            })
            return project;
        } catch (error) {
            console.error("Error updating project:", error);
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to update project",
                cause: error,
            });
        }
    })