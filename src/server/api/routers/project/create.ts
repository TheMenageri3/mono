import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createProjectSchema } from "@/schemas";

export const createProject = protectedProcedure
  .input(createProjectSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const project = await ctx.db.project.create({
        data: {
          title: input.title,
          description: input.description,
          shortDescription: input.shortDescription,
          status: input.status,
          visibility: input.visibility,
          githubUrl: input.githubUrl,
          demoUrl: input.demoUrl,
          outcome: input.outcome,
          challenges: input.challenges,
          isFeatured: input.isFeatured,
          startDate: input.startDate,
          endDate: input.endDate,
          createdById: userId,
          updatedById: userId,
        },
      });
      return project;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create project",
        cause: error,
      });
    }
  });
