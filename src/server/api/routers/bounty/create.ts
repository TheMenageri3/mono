import { protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const createBounty = protectedProcedure
  .input(
    z.object({
      title: z
        .string()
        .trim()
        .min(5, "Title must have a length of at least 5 characters!"),
      description: z.string(),
      companyId: z.string().optional(),
      pointOfContactId: z.string(),
      compensationAmount: z.number(),
      tokenId: z.string(),
      skills: z.array(z.string()), //Skill Ids
      track: z.enum(["FRONTEND", "BACKEND", "RUST"]),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.$transaction(async (db) => {
      // const companyExists = await db.company.findUnique({
      //   where: {id: input.companyId}
      // })

      // if (!companyExists){
      //   throw new Error("Company not found!")
      // }

      const pointOfContactExists = await db.user.findUnique({
        where: { id: input.pointOfContactId },
      });

      if (!pointOfContactExists) {
        throw new Error("Point of contact (User) not found!");
      }

      //Create Compensation
      const compensation = await db.compensation.create({
        data: {
          amount: input.compensationAmount,
          tokenId: input.tokenId,
        },
      });

      //Create Bounty
      const bounty = await db.bounty.create({
        data: {
          name: input.title,
          description: input.description,
          companyId: input.companyId ?? null,
          pointOfContactId: input.pointOfContactId,
          compensationId: compensation.id,
          skills: {
            connect: input.skills.map((skillId) => ({ id: skillId })),
          },
          track: input.track,
        },
      });

      return bounty;
    });
  });

//Create Bounty Application
export const createApplication = publicProcedure
  .input(
    z.object({
      bountyId: z.string(),
      userId: z.string(),
      walletPk: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.$transaction(async (db) => {
      const existingApplication = await db.bountyApplication.findMany({
        where: {
          bountyId: input.bountyId,
          userId: input.userId,
        },
      });

      if (existingApplication && existingApplication.length > 0) {
        throw new Error("Already applied to bounty");
      }

      const application = await ctx.db.bountyApplication.create({
        data: {
          bountyId: input.bountyId,
          userId: input.userId,
          walletPk: input.walletPk,
        },
      });
      return application;
    });
  });

//Create Token for testing (Only USDC for now)
export const createToken = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      ticker: z.string(),
      address: z.string(),
      image: z.string(),
      decimals: z.number(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const token = ctx.db.token.create({
      data: {
        name: input.name,
        ticker: input.ticker,
        address: input.address,
        image: input.image,
        decimals: input.decimals,
      },
    });

    return token;
  });
