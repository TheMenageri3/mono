import { protectedProcedure } from '@/server/api/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const deleteProject = protectedProcedure
    .input(
        z.object({
            id: z.string(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        try {
            const userId = ctx.session.user.id;
            const existingProject = await ctx.db.project.findUniqueOrThrow({
                where: { id: input.id },
            })

            if (existingProject.deletedAt !== null) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Project already deleted',
                });
            }
            const project = await ctx.db.project.update({
                where: {
                    id: input.id,
                },
                data: {
                    deletedAt: new Date(),
                    updatedById: userId,
                },
            });
            return project;
        } catch (error) {
            console.error('Error deleting project by id:', error);
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to delete project',
                cause: error,
            });
        }
    });

export const restoreProject = protectedProcedure
    .input(
        z.object({
            id: z.string(),
        })
    )
    .mutation(async ({ ctx, input}) => {
        try {
            const userId = ctx.session.user.id;
            const existingProject = await ctx.db.project.findUniqueOrThrow({
                where: { id: input.id },
            });
            if (existingProject.deletedAt === null) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Project is not deleted',
                });
            }
            const project = await ctx.db.project.update({
                where: {
                    id: input.id,
                },
                data: {
                    deletedAt: null,
                    updatedById: userId,
                },
            });
            return project;
        } catch (error) {
            console.error('Error restoring project by id:', error);
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to restore project',
                cause: error,
            });
        }
    })

