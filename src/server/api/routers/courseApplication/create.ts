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
      wallet: z.string(),
      discord: z.string(),
      github: z.string(),
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
      wallet,
      discord,
      github,
    } = input;
    const { user } = ctx.session;

    const fullUser = await ctx.db.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        externalProfiles: true,
        wallets: true,
      },
    });
    console.log(fullUser);

    const hasDiscord =
      fullUser?.externalProfiles.find((p) => p.platform === "Discord") &&
      discord;

    console.log(hasDiscord);
    if (!hasDiscord) {
      console.log("Creating discord profile");
      await ctx.db.externalProfile.create({
        data: {
          platform: "Discord",
          username: discord,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }

    const hasGithub =
      fullUser?.externalProfiles.find((p) => p.platform === "Github") && github;

    if (!hasGithub) {
      console.log("Creating github profile");
      await ctx.db.externalProfile.create({
        data: {
          platform: "Github",
          username: github,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }

    const hasWallet =
      fullUser?.wallets.find((p) => p.address === wallet) && wallet;

    if (!hasWallet) {
      console.log("Creating wallet");
      await ctx.db.wallet.create({
        data: {
          address: wallet,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }

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

    await ctx.db.courseApplicationExperience.createMany({
      data: experience.map((exp) => ({
        experience: exp.experience,
        level: exp.level,
        courseApplicationId: course.id,
      })),
    });

    return course;
  });
