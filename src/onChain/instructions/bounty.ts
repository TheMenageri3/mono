/* eslint-disable @typescript-eslint/consistent-type-imports */
import type NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";
import {
  Keypair,
  PublicKey,
  type Connection,
  SystemProgram,
  Transaction,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";

import toast from "react-hot-toast";
import Bounty_IDL from "~/onChain/idls/bounty.json";
import { BountyProgram } from "../types/bountyProgram";
import * as anchor from "@coral-xyz/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export const MONO_DATA = "mono";

export const findFeatureTokenAccount = async (
  unix_timestamp: string,
  creator: anchor.web3.PublicKey,
  funds_mint: anchor.web3.PublicKey,
  program: Program<BountyProgram>,
): Promise<[anchor.web3.PublicKey, number]> => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(MONO_DATA),
      Buffer.from(unix_timestamp),
      creator.toBuffer(),
      funds_mint.toBuffer(),
    ],
    program.programId,
  );
};

/**
 *
 * @param creator
 * @param program
 * @returns
 */
export const findFeatureAccount = async (
  unix_timestamp: string,
  creator: PublicKey,
  program: Program<BountyProgram>,
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(MONO_DATA),
      anchor.utils.bytes.utf8.encode(unix_timestamp),
      creator.toBuffer(),
    ],
    program.programId,
  );
};

export const findProgramAuthority = async (
  program: Program<BountyProgram>,
): Promise<[anchor.web3.PublicKey, number]> => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(MONO_DATA)],
    program.programId,
  );
};

export const WSOL_ADDRESS = new PublicKey(
  "So11111111111111111111111111111111111111112",
);

export const createBounty = async (
  wallet: NodeWallet,
  connection: Connection,
  timestamp: string,
) => {
  const provider = new AnchorProvider(connection, wallet, {});
  const mint = WSOL_ADDRESS;

  const bounty_program = new Program(
    Bounty_IDL as unknown as BountyProgram,
    provider,
  );
  // const timestamp = Date.now().toString();
  const [feature_account] = await findFeatureAccount(
    timestamp,
    wallet.publicKey,
    bounty_program,
  );
  const [feature_token_account] = await findFeatureTokenAccount(
    timestamp,
    wallet.publicKey,
    mint,
    bounty_program,
  );

  const [program_authority] = await findProgramAuthority(bounty_program);

  const createDaoIX = await bounty_program.methods
    .createFeatureFundingAccount(timestamp)
    .accountsPartial({
      creator: wallet.publicKey,
      fundsMint: mint,
      featureTokenAccount: feature_token_account,
      programAuthority: program_authority,
      tokenProgram: TOKEN_PROGRAM_ID,
      rent: SYSVAR_RENT_PUBKEY,
      associatedProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  const { blockhash, lastValidBlockHeight } =
    await provider.connection.getLatestBlockhash();
  const txInfo = {
    /** The transaction fee payer */
    feePayer: wallet.publicKey,
    /** A recent blockhash */
    blockhash: blockhash,
    /** the last block chain can advance to before tx is exportd expired */
    lastValidBlockHeight: lastValidBlockHeight,
  };

  const tx = new Transaction(txInfo);
  tx.add(createDaoIX);
  const signature = await provider.sendAndConfirm(tx, [], {
    skipPreflight: true,
  });
  toast.success("NFT purchased successfully");

  return signature;
};

export const applyToBounty = async (
  wallet: NodeWallet,
  connection: Connection,
  timestamp: string,
) => {
  const provider = new AnchorProvider(connection, wallet, {});
  const mint = WSOL_ADDRESS;

  const bounty_program = new Program(
    Bounty_IDL as unknown as BountyProgram,
    provider,
  );
  // const timestamp = Date.now().toString();
  const [feature_account] = await findFeatureAccount(
    timestamp,
    wallet.publicKey,
    bounty_program,
  );
  const [feature_token_account] = await findFeatureTokenAccount(
    timestamp,
    wallet.publicKey,
    mint,
    bounty_program,
  );

  const [program_authority] = await findProgramAuthority(bounty_program);

  const createDaoIX = await bounty_program.methods
    .createFeatureFundingAccount(timestamp)
    .accountsPartial({
      creator: wallet.publicKey,
      fundsMint: mint,
      featureTokenAccount: feature_token_account,
      programAuthority: program_authority,
      tokenProgram: TOKEN_PROGRAM_ID,
      rent: SYSVAR_RENT_PUBKEY,
      associatedProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  const { blockhash, lastValidBlockHeight } =
    await provider.connection.getLatestBlockhash();
  const txInfo = {
    /** The transaction fee payer */
    feePayer: wallet.publicKey,
    /** A recent blockhash */
    blockhash: blockhash,
    /** the last block chain can advance to before tx is exportd expired */
    lastValidBlockHeight: lastValidBlockHeight,
  };

  const tx = new Transaction(txInfo);
  tx.add(createDaoIX);
  const signature = await provider.sendAndConfirm(tx, [], {
    skipPreflight: true,
  });
  toast.success("NFT purchased successfully");

  return signature;
};

//Fund Bounty

//Accept Applications

//Reject Applications

//Accept Feature

//Reject Feature

//Withdrawal
