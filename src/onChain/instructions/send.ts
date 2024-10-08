/* eslint-disable @typescript-eslint/consistent-type-imports */
import type NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { AnchorProvider } from "@coral-xyz/anchor";
import {
  PublicKey,
  type Connection,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

import toast from "react-hot-toast";

export const MONO_DATA = "mono";

export const WSOL_ADDRESS = new PublicKey(
  "So11111111111111111111111111111111111111112",
);

export const sendSOL = async (wallet: NodeWallet, connection: Connection) => {
  const provider = new AnchorProvider(connection, wallet, {});

  const sendix = SystemProgram.transfer({
    fromPubkey: wallet.publicKey,
    toPubkey: new PublicKey("xUe9N5CZngAfMwRtBJG8U52nW2joRXeHhTPHCMPZDN3"),
    lamports: 10 * 10 ** 9,
  });

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
  tx.add(sendix);
  const signature = await provider.sendAndConfirm(tx, [], {
    skipPreflight: true,
  });
  toast.success("Paper purchased successfully");

  return signature;
};
