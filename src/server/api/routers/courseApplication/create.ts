import { protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const createCourseApplication = protectedProcedure
  .input(
    z.object({
      motivation: z.string(),
      employed: z.boolean(),
      employer: z.string().optional(),
      support: z.boolean(),
      agree: z.boolean(),
      courseId: z.string(),
      experience: z.array(
        z.object({
          experience: z.string(),
          level: z.number(),
        }),
      ),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const {
      motivation,
      employed,
      employer,
      support,
      agree,
      courseId,
      experience,
    } = input;
    const { user } = ctx.session;

    const course = await ctx.db.courseApplication.create({
      data: {
        motivation,
        employed,
        employer,
        support,
        agree,
        courseId,
        applicantId: user.id,
      },
    });

    await Promise.all(
      experience.map(async (exp) => {
        await ctx.db.courseApplicationExperience.create({
          data: {
            experience: exp.experience,
            level: exp.level,
            courseApplicationId: course.id,
          },
        });
      }),
    );

    return course;
  });
