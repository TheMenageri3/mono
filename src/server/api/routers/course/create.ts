import { protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const createCourse = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      description: z.string(),
      year: z.number(),
      quarter: z.number(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { name, description, year, quarter } = input;

    const course = await ctx.db.course.create({
      data: { name, description, year, quarter },
    });

    return course;
  });
