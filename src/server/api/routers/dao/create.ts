import { protectedProcedure } from "~/server/api/trpc";

import { z } from "zod";
import { DAOType } from "@prisma/client";
import { create } from "domain";

export const createDao = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      description: z.string(),
      seed: z.string(),
      tokenId: z.string().optional(),
      type: z.nativeEnum(DAOType),
      collectionTokenId: z.string().optional(),
      circulatingSupply: z.number(),
      proposalFeeBounty: z.number(),
      proposalFeeExecutable: z.number(),
      proposalFeeVote: z.number(),
      proposalFeeVoteMultiple: z.number(),
      maxExpiry: z.number(),
      minThreshold: z.number(),
      minQuorum: z.number(),
      proposalAnalysisPeriod: z.number(),
      nQuorumEpoch: z.number().int(),
      thresholdCreateProposal: z.number(),
      vetoCouncil: z.string(),
      allowSubDAO: z.boolean().default(false),
      thresholdCreateSubDao: z.number().optional(),
      createSubdaoFee: z.number().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const {
      name,
      description,
      seed,
      tokenId,
      collectionTokenId,
      circulatingSupply,
      proposalFeeBounty,
      proposalFeeExecutable,
      proposalFeeVote,
      proposalFeeVoteMultiple,
      maxExpiry,
      minThreshold,
      minQuorum,
      proposalAnalysisPeriod,
      nQuorumEpoch,
      thresholdCreateProposal,
      vetoCouncil,
      allowSubDAO,
      thresholdCreateSubDao,
      createSubdaoFee,
    } = input;
    const { user } = ctx.session;
    const dao = await ctx.db.dAO.create({
      data: {
        name,
        description,
        seed,
        type: DAOType.NFT,
        creatorId: user.id,
        tokenId,
        collectionTokenId,
        circulatingSupply,
        proposalFeeBounty,
        proposalFeeExecutable,
        proposalFeeVote,
        proposalFeeVoteMultiple,
        maxExpiry,
        minThreshold,
        minQuorum,
        proposalAnalysisPeriod,
        nQuorumEpoch,
        thresholdCreateProposal,
        vetoCouncil,
        allowSubDAO,
        thresholdCreateSubDao,
        createSubdaoFee,
      },
    });
    return dao;
  });
