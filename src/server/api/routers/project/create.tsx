import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const createProject = protectedProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      shortDescription: z.string(),
      status: z.enum(["IN_PROGRESS", "COMPLETED", "ARCHIVED"]),
      visibility: z.enum(["PUBLIC", "PRIVATE", "INTERNAL"]),
      githubUrl: z.string().url(),
      demoUrl: z.string().url(),
      outcome: z.string(),
      challenges: z.string(),
      isFeatured: z.boolean(),
      startDate: z.string().datetime(),
      endDate: z.string().datetime(), 
    })
  )
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
  })