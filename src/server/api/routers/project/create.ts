import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { ProjectStatus, VisibilityStatus } from "@/generated/prisma/client";

export const createProject = protectedProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      shortDescription: z.string(),
      status: z.nativeEnum(ProjectStatus),
      visibility: z.nativeEnum(VisibilityStatus),
      githubUrl: z.string().url(),
      demoUrl: z.string().url(),
      outcome: z.string(),
      challenges: z.string(),
      isFeatured: z.boolean(),
      startDatetime: z.string().datetime(),
      endDatetime: z.string().datetime(),
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
          startDatetime: input.startDatetime,
          endDatetime: input.endDatetime,
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
