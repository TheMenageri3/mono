import { protectedProcedure } from "~/server/api/trpc";

import { z } from "zod";
import { ProposalStatus } from "@prisma/client";
export const updateDao = protectedProcedure
  .input(
    z.object({
      id: z.string(),
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
    const { id,        
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
      createSubdaoFee,  } = input;
    const dao = await ctx.db.dAO.findUnique({ where: { id } });
    if (!dao) {
      throw new Error("Dao not found");
    }
    return await ctx.db.dAO.update({ where: { id }, data: {proposalFeeBounty, 
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
      createSubdaoFee  } });
  });
