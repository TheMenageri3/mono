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
  getOrCreateAssociatedTokenAccount,
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

// export const WSOL_ADDRESS = new PublicKey(
//   "So11111111111111111111111111111111111111112",
// );

export const WSOL_ADDRESS = new PublicKey(
  "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
); //USDC Dev address cause I don't have WSOL and want to test asap

export const isSubmissionAvailaible = async (
  wallet: NodeWallet,
  connection: Connection,
  timestamp: string,
  creatorPk: string,
) => {
  try {
    const provider = new AnchorProvider(connection, wallet, {});
    const bounty_program = new Program(
      Bounty_IDL as unknown as BountyProgram,
      provider,
    );
    const mint = WSOL_ADDRESS;

    const [feature_token_account] = await findFeatureTokenAccount(
      timestamp,
      new PublicKey(creatorPk),
      mint,
      bounty_program,
    );

    const [feature_account] = await findFeatureAccount(
      timestamp,
      new PublicKey(creatorPk),
      bounty_program,
    );

    const isAvailable = (
      await bounty_program.account.featureDataAccount.fetch(feature_account)
    ).requestSubmitted;
    return isAvailable;
  } catch (err) {
    console.error(err);
  }
};

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

//Add Submitter
export const addSubmitter = async (
  wallet: NodeWallet,
  connection: Connection,
  timestamp: string,
  creatorPk: string, //Creator of bounty application
) => {
  const provider = new AnchorProvider(connection, wallet, {});
  const mint = WSOL_ADDRESS;
  const creator = new PublicKey(creatorPk);

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

  const addSubmitter = await bounty_program.methods
    .addApprovedSubmitters()
    .accountsPartial({
      creator: wallet.publicKey,
      submitter: creator,
      featureDataAccount: feature_account,
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
  tx.add(addSubmitter);
  const signature = await provider.sendAndConfirm(tx, [], {
    skipPreflight: true,
  });
  toast.success("Submitter added successfully");

  return signature;
};

//Fund Bounty
export const fundAccount = async (
  wallet: NodeWallet,
  connection: Connection,
  timestamp: string,
  amount: Number,
) => {
  const provider = new AnchorProvider(connection, wallet, {});
  const mint = WSOL_ADDRESS;
  const creatorTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet.payer,
    mint,
    wallet.publicKey,
    true,
  );

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

  const fund = await bounty_program.methods
    .fundFeature(new BN(amount))
    .accountsPartial({
      creator: wallet.publicKey,
      creatorTokenAccount: creatorTokenAccount.address,
      featureTokenAccount: feature_token_account,
      featureDataAccount: feature_account,
      fundsMint: mint,
      programAuthority: program_authority,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
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
  tx.add(fund);
  const signature = await provider.sendAndConfirm(tx, [], {
    skipPreflight: true,
  });
  toast.success("Funds paid successfully");

  return signature;
};

//Submit Feature
export const submitFeature = async (
  wallet: NodeWallet,
  connection: Connection,
  timestamp: string,
  creatorPk: string, //Bounty Creator
) => {
  const provider = new AnchorProvider(connection, wallet, {});
  const mint = WSOL_ADDRESS;
  const creator = new PublicKey(creatorPk);
  const payoutAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet.payer,
    mint,
    wallet.publicKey,
    true,
  );

  const bounty_program = new Program(
    Bounty_IDL as unknown as BountyProgram,
    provider,
  );
  // const timestamp = Date.now().toString();
  const [feature_account] = await findFeatureAccount(
    timestamp,
    creator,
    bounty_program,
  );

  const submit = await bounty_program.methods
    .submitRequest()
    .accountsPartial({
      creator,
      submitter: wallet.publicKey,
      featureDataAccount: feature_account,
      payoutAccount: payoutAccount.address,
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
  tx.add(submit);
  const signature = await provider.sendAndConfirm(tx, [], {
    skipPreflight: true,
  });
  toast.success("Submitted successfully");

  return signature;
};

//Accept Feature
export const acceptFeature = async (
  wallet: NodeWallet,
  connection: Connection,
  timestamp: string,
  creatorPK: string, //Submitter of feature
) => {
  const provider = new AnchorProvider(connection, wallet, {});
  const mint = WSOL_ADDRESS;
  const featureCreator = new PublicKey(creatorPK);
  const payoutAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet.payer,
    mint,
    featureCreator,
  );

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

  const approve = await bounty_program.methods
    .approveRequest()
    .accountsPartial({
      creator: wallet.publicKey,
      submitter: featureCreator,
      featureDataAccount: feature_account,
      featureTokenAccount: feature_token_account,
      payoutAccount: payoutAccount.address,
      tokenProgram: TOKEN_PROGRAM_ID,
      programAuthority: program_authority,
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
  tx.add(approve);
  const signature = await provider.sendAndConfirm(tx, [], {
    skipPreflight: true,
  });
  toast.success("Approved and payout successful");

  return signature;
};

//Reject Feature
export const rejectFeature = async (
  wallet: NodeWallet,
  connection: Connection,
  timestamp: string,
  creatorPK: string, //Submitter of feature
) => {
  const provider = new AnchorProvider(connection, wallet, {});
  const mint = WSOL_ADDRESS;
  const featureCreator = new PublicKey(creatorPK);
  const payoutAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet.payer,
    mint,
    featureCreator,
  );

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

  const reject = await bounty_program.methods
    .denyRequest()
    .accountsPartial({
      creator: wallet.publicKey,
      submitter: featureCreator,
      featureDataAccount: feature_account,
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
  tx.add(reject);
  const signature = await provider.sendAndConfirm(tx, [], {
    skipPreflight: true,
  });
  toast.success("Rejection successful");

  return signature;
};
