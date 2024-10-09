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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  NewDAOFormData,
  ProfileFormData,
} from "~/lib/validation";
import { Form, FormField, FormLabel } from "~/_components/final/ui/form";
import CustomFormItem from "~/_components/final/CustomForm";
import { useRef, useState } from "react";
import H1 from "~/_components/final/H1";
import { Textarea } from "~/_components/final/ui/textarea";
import { cn } from "~/utils";
import { RadioGroup, RadioGroupItem } from "~/_components/final/ui/radio-group";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { Label } from "~/_components/final/ui/label";

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

const initialData = {
  title: "",
  description: "",
  goal: 0,
  end: new Date(),
};


export const CreateDao: FC = () => {
  const { publicKey, wallet } = useWallet();
  const { connection } = useConnection();
  const [isEditing, setIsEditing] = useState(true);
  const createDAOMutation = api.dao.create.useMutation();

  const form = useForm<z.infer<typeof NewDAOFormData>>({
    resolver: zodResolver(NewDAOFormData),
    defaultValues: initialData,
  });

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
    <div className="items-center justify-start min-h-screen bg-gray-100 p-8">
      {/* Formulário */}
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(handleSubmit)}
          className="mx-auto max-w-4xl space-y-6 rounded-lg bg-white p-6 pb-12 shadow md:p-20 md:pb-16 md:pt-6"
        >
          <H1 className="text-2xl font-bold mb-4 text-center">New DAO</H1>
          <div className="grid grid-cols-1 gap-4">
            {/* Campo para o nome da DAO */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <CustomFormItem
                  label="DAO Name"
                  field={field}
                  placeholder="Enter your DAO name"
                  isEditing={isEditing}
                />
              )}
              required
            />
          </div>
          <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <CustomFormItem
              label="Description"
              field={field}
              placeholder="Enter your description"
              isEditing={isEditing}
              InputComponent={Textarea}
            />
          )}
          required
        />
        <div className="mt-4"></div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <div>
              <FormLabel className={cn("text-xs font-semibold text-zinc-700")}>
                Type
              </FormLabel>
              <RadioGroup
                defaultValue="token"
                onValueChange={field.onChange}
                value={field.value}
                className="mt-2 grid-cols-3"
              >
                {[
                  { id: "nft", title: "NFT" },
                  { id: "token", title: "Token" },
                  { id: "hybrid", title: "Hybrid" },
                ].map((type) => (
                  <div key={type.id} className="flex items-center">
                    <RadioGroupItem
                      id={type.id}
                      value={type.title}
                    ></RadioGroupItem>
                    <label
                      htmlFor={type.id}
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      {type.title}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        />

        <FormField
          control={form.control}
         name="tokenId"
          render={({ field }) => (
            <CustomFormItem
              label="Token Public Key"
              field={field}
              placeholder="Enter your token public key"
            />
          )}
          // required
        />
      <FormField
        control={form.control}
        name="collectionTokenId"
        render={({ field }) => (
          <CustomFormItem
            label="Collection Token key"
            field={field}
            placeholder="Enter collection token ID (optional)"
          />
        )}
      />
          <FormField
        control={form.control}
       name="circulatingSupply"
        render={({ field }) => (
          <CustomFormItem
            label="Circulating Supply"
            field={field}
            placeholder="Enter circulating supply"
            inputProps={{ type: "number" }}
          />
        )}
      />

      <FormField
        control={form.control}
        name="proposalFeeBounty"
        render={({ field }) => (
          <CustomFormItem
            label="Proposal Bounty Fee"
            field={field}
            placeholder="Enter proposal bounty fee"
            inputProps={{ type: "number" }}
          />
        )}
      />

      <FormField
        control={form.control}
       name="proposalFeeExecutable"
        render={({ field }) => (
          <CustomFormItem
            label="Proposal Executable Fee"
            field={field}
            placeholder="Enter proposal executable fee"
            inputProps={{ type: "number" }}
          />
        )}
      />

      <FormField
        control={form.control}
       name="proposalFeeVote"
        render={({ field }) => (
          <CustomFormItem
            label="Proposal Vote Fee"
            field={field}
            placeholder="Enter proposal vote fee"
            inputProps={{ type: "number" }}
          />
        )}
      />

      <FormField
        control={form.control}
       name="proposalFeeVoteMultiple"
        render={({ field }) => (
          <CustomFormItem
            label="Proposal Vote Multiple Fee"
            field={field}
            placeholder="Enter proposal vote multiple fee"
            inputProps={{ type: "number" }}
          />
        )}
      />

      <FormField
        control={form.control}
      name="maxExpiry"
        render={({ field }) => (
          <CustomFormItem
            label="Max Expiry"
            field={field}
            placeholder="Enter max expiry"
            inputProps={{ type: "number" }}
          />
        )}
      />

      <FormField
        control={form.control}
        name="minThreshold"
        render={({ field }) => (
          <CustomFormItem
            label="Min Threshold"
            field={field}
            placeholder="Enter min threshold"
            isEditing={isEditing}
            inputProps={{ type: "number" }}
          />
        )}
      />

      <FormField
        control={form.control}
       name="minQuorum"
        render={({ field }) => (
          <CustomFormItem
            label="Min Quorum"
            field={field}
            placeholder="Enter min quorum"
            isEditing={isEditing}
            inputProps={{ type: "number" }}
          />
        )}
      />

      <FormField
        control={form.control}
        name="proposalAnalysisPeriod"
        render={({ field }) => (
          <CustomFormItem
            label="Proposal Analysis Period"
            field={field}
            placeholder="Enter proposal analysis period"
            isEditing={isEditing}
            inputProps={{ type: "number" }}
          />
        )}
      />

      <FormField
      control={form.control}
      name="nQuorumEpoch"
        render={({ field }) => (
          <CustomFormItem
            label="N Quorum Epoch"
            field={field}
            placeholder="Enter N quorum epoch"
            isEditing={isEditing}
            inputProps={{ type: "number" }}
          />
        )}
      />

      <FormField
        control={form.control}
        name="thresholdCreateProposal"
        render={({ field }) => (
          <CustomFormItem
            label="Threshold to Create Proposal"
            field={field}
            placeholder="Enter threshold to create proposal"
            isEditing={isEditing}
          />
        )}
      />

      <FormField
        control={form.control}
        name="vetoCouncil"
        render={({ field }) => (
          <CustomFormItem
            label="Veto Council"
            field={field}
            placeholder="Enter veto council public key"
            isEditing={isEditing}
          />
        )}
      />

   <FormField
        control={form.control}
        name="allowSubDAO"
        render={({ field }) => (
          <div className="flex items-center">
            <CheckboxPrimitive.Root
              className="flex items-center gap-2"
              checked={field.value}
              onCheckedChange={field.onChange}
              id="allowSubDAO"
            >
              <CheckboxPrimitive.Indicator className="CheckboxIndicator">
                <CheckIcon />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            <Label htmlFor="allowSubDAO" className="ml-2">Allow Sub DAO</Label>
          </div>
        )}
      />

      <FormField
        control={form.control}
        name="thresholdCreateSubDao"
        render={({ field }) => (
          <CustomFormItem
            label="Threshold to Create Sub DAO"
            field={field}
            placeholder="Enter threshold to create sub DAO (optional)"
            isEditing={isEditing}
          />
        )}
      />

      <FormField
        control={form.control}
        name="createSubdaoFee"
        render={({ field }) => (
          <CustomFormItem
            label="Create Sub DAO Fee"
            field={field}
            placeholder="Enter fee to create sub DAO (optional)"
            isEditing={isEditing}
          />
        )}
      /> 
        </form>
      </Form>

      {/* Botão de ação abaixo do formulário */}
      <div className="mt-8 flex justify-center">
        <button
          className="btn m-2 w-60 animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-black hover:from-white hover:to-purple-300"
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