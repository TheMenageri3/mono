import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const deleteSection = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx?.session?.user?.id;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not authenticated",
      });
    }

    const existing = await ctx.db.section.findUnique({
      where: { id: input.id },
    });

    if (!existing || existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Section not found",
      });
    }

    try {
      const section = await ctx.db.section.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });

      return section;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete section",
        cause: error,
      });
    }
  });


  export const restoreSection = protectedProcedure
  	.input(z.object({
		id: z.string()
	}))
	.mutation(async ({ctx, input}) => {

		const userId = ctx.session?.user?.id;

		if (!userId) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: "User not authenticated",
			})
		}

		const existing = await ctx.db.section.findUnique({
			where: {id: input.id}
		})

		if (!existing) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Section not found'
			})
		}

		if (existing.deletedAt === null) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Section is not deleted'
			})
		}

		try {
			const section = await ctx.db.section.update({
				where: {id: input.id},
				data: {
					deletedAt: null,
					updatedById: userId
				}
			})
			return section
		} catch (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to restore section',
				cause: error
			})
			
		}
	})