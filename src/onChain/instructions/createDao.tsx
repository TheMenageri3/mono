// TODO: SignMessage
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { type FC, useCallback } from "react";
import daoIdl from "../idls/dao.json";
import governanceIdl from "../idls/governance.json";
import stakingIdl from "../idls/staking.json";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import { randomBytes } from "crypto";
import type NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";
const SYSVAR_ID = new PublicKey("Sysvar1nstructions1111111111111111111111111");
const MintTeste = new PublicKey("8TPeGMnHwsz5izHkgfq6cTgsep87VudMns7SbwEDPjTH");
const treasury_team = new PublicKey(
  "CaYonYussSdBA2Bwwk1NuNmuE6Gwv6UNqb4KwEzKsCsF",
);

const idl_string_dao = JSON.stringify(daoIdl);
const idl_object_dao = JSON.parse(idl_string_dao);

const DAO_PROGRAM_ID = new PublicKey(daoIdl.address);
const GOVERNANCE_PROGRAM_ID = new PublicKey(governanceIdl.address);
const STAKING_PROGRAM_ID = new PublicKey(stakingIdl.address);

export const CreateDao: FC = () => {
  const { publicKey, wallet } = useWallet();
  const { connection } = useConnection();
  const createDAOMutation = api.dao.create.useMutation();

  const getProvider = () => {
    if (!publicKey || !wallet) {
      throw new Error("Wallet not connected");
    }
    return new AnchorProvider(
      connection,
      wallet.adapter as unknown as NodeWallet,
      AnchorProvider.defaultOptions(),
    );
  };

  const onClick = useCallback(async () => {
    if (!publicKey) {
      toast.error("Wallet not connected");
      return;
    }
    try {
      const anchProvider = getProvider();
      const program = new Program(idl_object_dao, anchProvider);

      const seed = new BN(randomBytes(8));
      const proposal_fee_bounty = new BN(1e6);
      const proposal_fee_executable = new BN(1e6);
      const proposal_fee_vote = new BN(1e6);
      const proposal_fee_vote_multiple = new BN(1e6);
      const min_quorum = 1;
      const min_threshold = new BN(1);
      //1 Hour in slots
      const max_expiry = new BN(2160000);
      const proposal_analysis_period = new BN(0);
      const threshold_create_proposal = new BN(1);
      const sub_dao_fee = new BN(1e6);
      const n_quorum_epoch = 0;
      const circulating_supply = new BN(100000000);

      const config = PublicKey.findProgramAddressSync(
        [Buffer.from("config"), seed.toArrayLike(Buffer, "le", 8)],
        DAO_PROGRAM_ID,
      )[0];
      const proposal_config = PublicKey.findProgramAddressSync(
        [Buffer.from("proposalcfg"), config.toBuffer()],
        GOVERNANCE_PROGRAM_ID,
      )[0];

      const treasury = PublicKey.findProgramAddressSync(
        [Buffer.from("treasury"), config.toBuffer()],
        DAO_PROGRAM_ID,
      )[0];
      // @ts-expect-error: trial
      const ix = await program.methods
        .initialize(
          seed,
          proposal_fee_bounty,
          proposal_fee_executable,
          proposal_fee_vote,
          proposal_fee_vote_multiple,
          max_expiry,
          min_threshold,
          min_quorum,
          proposal_analysis_period,
          n_quorum_epoch,
          threshold_create_proposal,
          null,
          MintTeste,
          circulating_supply,
          true,
          null,
          sub_dao_fee,
          publicKey,
        )

        .accountsPartial({
          initializer: publicKey,
          config,
          treasury,
          proposal_config,
          stakingProgram: STAKING_PROGRAM_ID,
          governanceProgram: GOVERNANCE_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          instructions: SYSVAR_ID,
          treasuryTeam: treasury_team,
        })
        .transaction();
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      const txInfo = {
        /** The transaction fee payer */
        feePayer: publicKey,
        /** A recent blockhash */
        blockhash: blockhash,
        /** the last block chain can advance to before tx is exportd expired */
        lastValidBlockHeight: lastValidBlockHeight,
      };

      const tx = new Transaction(txInfo);

      tx.add(ix);
      const signature = await anchProvider.sendAndConfirm(tx, [], {
        skipPreflight: true,
      });

      createDAOMutation.mutate(
        {
          name: "Test",
          description: "Test",
          seed: seed.toString(),
          type: "TOKEN",
          circulatingSupply: circulating_supply.toNumber(),
          proposalFeeBounty: proposal_fee_bounty.toNumber(),
          proposalFeeExecutable: proposal_fee_executable.toNumber(),
          proposalFeeVote: proposal_fee_vote.toNumber(),
          proposalFeeVoteMultiple: proposal_fee_vote_multiple.toNumber(),
          maxExpiry: max_expiry.toNumber(),
          minThreshold: min_threshold.toNumber(),
          minQuorum: min_quorum,
          proposalAnalysisPeriod: proposal_analysis_period.toNumber(),
          nQuorumEpoch: n_quorum_epoch,
          thresholdCreateProposal: threshold_create_proposal.toNumber(),
          vetoCouncil: publicKey.toBase58(),
          allowSubDAO: true,
          thresholdCreateSubDao: threshold_create_proposal.toNumber(),
          createSubdaoFee: sub_dao_fee.toNumber(),
        },
        {
          onSuccess: (data) => {
            toast.success(
              "DAO created successfully! Transaction ID: " + data.id,
            );
          },
          onError: (error) => {
            toast.error(error.message);
            console.error(error);
          },
        },
      );
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  }, [publicKey, connection]);

  return (
    <div className="flex flex-row justify-center">
      <div className="group relative items-center">
        <div className="animate-tilt absolute -inset-0.5 m-1 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 opacity-20 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
        <button
          className="btn group m-2 w-60 animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-black hover:from-white hover:to-purple-300"
          onClick={onClick}
          disabled={!publicKey}
        >
          <div className="hidden group-disabled:block">
            Wallet not connected
          </div>
          <span className="block group-disabled:hidden">Create Dao</span>
        </button>
      </div>
    </div>
  );
};
