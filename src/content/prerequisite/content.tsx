"use client";

import { Session } from "next-auth";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

type TransferDetails = {
  signature: string;
  timestamp: string;
  sender: string;
  recipient: string;
  actualAmount: number;
  fee: number;
  slot: number;
  status: string;
};

async function verifyFullTransfer(
  signature,
  senderAddress,
  setFullTransferSignature,
) {
  try {
    console.log("Verifying full transfer");
    // Create connection to Solana network
    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed",
    );
    setFullTransferSignature("failed");

    // Get transaction details
    const transaction = await connection.getParsedTransaction(signature, {
      maxSupportedTransactionVersion: 0,
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    // Validate sender address
    const senderPubkey = new PublicKey(senderAddress);

    // Get pre and post balances
    const preBalances = transaction.meta.preBalances;
    const postBalances = transaction.meta.postBalances;

    // Find the sender's index in the account keys
    const accountKeys = transaction.transaction.message.accountKeys;
    const senderIndex = accountKeys.findIndex(
      (key) => key.pubkey.toString() === senderPubkey.toString(),
    );

    if (senderIndex === -1) {
      throw new Error("Sender address not found in transaction");
    }

    // Get recipient's index (should be the account that received the most lamports)
    let recipientIndex = -1;
    let maxBalanceIncrease = 0;

    postBalances.forEach((postBalance, index) => {
      if (index !== senderIndex) {
        const balanceIncrease = postBalance - preBalances[index];
        if (balanceIncrease > maxBalanceIncrease) {
          maxBalanceIncrease = balanceIncrease;
          recipientIndex = index;
        }
      }
    });

    if (recipientIndex === -1) {
      throw new Error("No recipient found in transaction");
    }

    const senderPreBalance = preBalances[senderIndex];
    const senderPostBalance = postBalances[senderIndex];
    const recipientPreBalance = preBalances[recipientIndex];
    const recipientPostBalance = postBalances[recipientIndex];

    // Calculate transfer details
    const transferAmount = recipientPostBalance - recipientPreBalance;
    const fee = senderPreBalance - (senderPostBalance + transferAmount);

    // Verify this was a full transfer (post-balance should be 0 or close to 0 due to rent exemption)
    const isFullTransfer = senderPostBalance === 0;

    const details = {
      signature,
      timestamp: new Date(transaction.blockTime * 1000).toISOString(),
      sender: senderAddress,
      recipient: accountKeys[recipientIndex].pubkey.toString(),
      senderPreBalance: senderPreBalance / LAMPORTS_PER_SOL,
      senderPostBalance: senderPostBalance / LAMPORTS_PER_SOL,
      transferAmount: transferAmount / LAMPORTS_PER_SOL,
      fee: fee / LAMPORTS_PER_SOL,
      slot: transaction.slot,
      // confirmations: await connection.getConfirmations(transaction.slot),
      status: transaction.meta.err === null ? "Success" : "Failed",
    };
    console.log("Full transfer verified");
    setFullTransferSignature("success");

    return {
      isFullTransfer,
      details,
    };
  } catch (error) {
    setFullTransferSignature("failed");
    throw new Error(`Verification failed: ${error.message}`);
  }
}

async function getWalletBalance(address, setBalance) {
  try {
    // Validate the address
    if (!address) {
      throw new Error("Wallet address is required");
    }

    // Create a connection to the Solana network
    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed",
    );

    // Create a PublicKey object from the address
    const publicKey = new PublicKey(address);

    // Get the balance in lamports
    const balanceInLamports = await connection.getBalance(publicKey);

    // Convert lamports to SOL (1 SOL = 1e9 lamports)
    const balance = balanceInLamports / LAMPORTS_PER_SOL;
    setBalance(balance);

    return {
      balance, // Balance in SOL
      balanceInLamports, // Balance in lamports
    };
  } catch (error) {
    setBalance("failed");
    if (error.message.includes("invalid public key")) {
      throw new Error("Invalid wallet address provided");
    }
    throw new Error(`Failed to get wallet balance: ${error.message}`);
  }
}

async function verifyTransfer(
  signature,
  fromAddress,
  toAddress,
  expectedAmount = null,
  setTransferDetails,
) {
  try {
    // Create connection to Solana network
    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed",
    );

    // Get transaction details
    const transaction = await connection.getParsedTransaction(signature, {
      maxSupportedTransactionVersion: 0,
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    // Validate addresses
    const fromPubkey = new PublicKey(fromAddress);
    const toPubkey = new PublicKey(toAddress);

    // Get pre and post balances for verification
    const preBalances = transaction.meta.preBalances;
    const postBalances = transaction.meta.postBalances;

    // Find the indices of the from and to addresses in the account keys
    const accountKeys = transaction.transaction.message.accountKeys;
    const fromIndex = accountKeys.findIndex(
      (key) => key.pubkey.toString() === fromPubkey.toString(),
    );
    const toIndex = accountKeys.findIndex(
      (key) => key.pubkey.toString() === toPubkey.toString(),
    );

    if (fromIndex === -1 || toIndex === -1) {
      throw new Error("One or both addresses not found in transaction");
    }

    // Calculate the actual transfer amount
    const fromBalanceChange =
      (preBalances[fromIndex] - postBalances[fromIndex]) / LAMPORTS_PER_SOL;
    const toBalanceChange =
      (postBalances[toIndex] - preBalances[toIndex]) / LAMPORTS_PER_SOL;

    // Verify the transfer
    const transferDetails: TransferDetails = {
      signature,
      timestamp: new Date(transaction.blockTime * 1000).toISOString(),
      sender: fromAddress,
      recipient: toAddress,
      actualAmount: toBalanceChange,
      fee: fromBalanceChange - toBalanceChange,
      slot: transaction.slot,
      status: transaction.meta.err === null ? "Success" : "Failed",
    };

    // Check if the transfer matches the expected amount
    const amountMatches =
      expectedAmount === null ||
      Math.abs(toBalanceChange - expectedAmount) < 0.000001; // Account for floating point precision
    if (transaction.meta.err === null && amountMatches) {
      setTransferDetails(transferDetails);
    } else {
      setTransferDetails("invalid");
    }
    return {
      success: transaction.meta.err === null && amountMatches,
      details: transferDetails,
    };
  } catch (error) {
    throw new Error(`Verification failed: ${error.message}`);
  }
}

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative my-4 rounded-lg border bg-slate-950 p-4">
      <div className="absolute right-4 top-4">
        <button
          onClick={copyToClipboard}
          className="rounded-md p-2 transition-colors hover:bg-slate-800"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-slate-400" />
          )}
        </button>
      </div>
      <pre className="mt-1 overflow-x-auto">
        <code className="font-mono text-sm text-slate-50">{code}</code>
      </pre>
      {language && (
        <div className="absolute left-4 top-0">
          <span className="text-xs text-slate-400">{language}</span>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;

export function Prerequisite({ session }: { session: Session }) {
  const [publicKey, setPublicKey] = useState("");
  const [recipientPublicKey, setRecipientPublicKey] = useState("");
  const [signature, setSignature] = useState("");
  const [fullTransferSignature, setFullTransferSignature] =
    useState("untested");
  const [transferDetails, setTransferDetails] = useState<
    string | TransferDetails
  >("untested");
  const [expectedAmount, setExpectedAmount] = useState<number | null>(null);
  const [isValid, setIsValid] = useState<"untested" | "valid" | "invalid">(
    "untested",
  );
  const [balance, setBalance] = useState<number | string>("untested");
  const verifyKeypair = async () => {
    try {
      const key = new PublicKey(publicKey);
      setIsValid("valid");
    } catch (e) {
      setIsValid("invalid");
    }
  };

  return (
    <div className="relative inset-0 mb-20 mt-20 flex w-full items-start justify-start md:w-auto">
      <div className="flex flex-col space-y-6">
        <div className="text-6xl font-bold">
          Turbin3 Builder&apos;s Cohort Prerequisite
        </div>
        <div>
          <div className="mb-2 text-2xl">
            0. Before we start, make sure you have:
          </div>

          <ul className="ml-4 list-disc space-y-2">
            <li>NodeJS installed</li>
            <li>Yarn installed</li>
            <li>
              A fresh folder created to follow this tutorial and all future
              tutorials
            </li>
          </ul>
        </div>
        <div className="mb-2 text-2xl">1. Creating a new Keypair</div>
        <div>
          To get started, we&apos;re going to create a keygen script and an
          airdrop script for our account.
        </div>
        <div className="mb-2 text-xl">1.1 Setting up</div>
        <div>
          Start by opening up your Terminal. We&apos;re going to use yarn to
          create a new Typescript project.
        </div>
        <CodeBlock
          code={`mkdir airdrop && cd airdrop
yarn init -y`}
          language="bash"
        />
        <div>
          Now that we have our new project initialized, we&apos;re going to go
          ahead and add typescript, bs58 and @solana/web3.js, along with
          generating a tsconfig.js configuration file.
        </div>
        <CodeBlock
          code={`yarn add @types/node typescript @solana/web3.js bs58
yarn add -D ts-node
touch keygen.ts
touch airdrop.ts
touch transfer.ts
yarn tsc --init --rootDir ./ --outDir ./dist --esModuleInterop --lib ES2019 --module commonjs --resolveJsonModule true --noImplicitAny true
`}
          language="bash"
        />
        <div>
          Finally, we&apos;re going to create some scripts in our package.json
          file to let us run the three scripts we&apos;re going to build today:
        </div>
        <CodeBlock
          code={`{
  "name": "airdrop",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "keygen": "ts-node ./keygen.ts",
    "airdrop": "ts-node ./airdrop.ts",
    "transfer": "ts-node ./transfer.ts",
    "enroll": "ts-node ./enroll.ts"
  },
  "dependencies": {
    "@solana/web3.js": "^1.75.0",
    "@types/node": "^18.15.11",
    "typescript": "^5.0.4"
  },
  "devDependencies": {
    "ts-node": "^10.9.1"
  }
}
`}
          language="json"
        />
        <div className="mb-4">
          Alright, we&apos;re ready to start getting into the code!
        </div>
        <div className="mb-2 text-xl">1.2 Generating a Keypair</div>
        <div>
          Open up ./keygen.ts. We&apos;re going to generate ourselves a new
          keypair. We&apos;ll start by importing Keypair from @solana/web3.js
        </div>
        <CodeBlock
          code={`import { Keypair } from "@solana/web3.js";


//Generate a new keypair
let kp = Keypair.generate()
console.log(\`You've generated a new Solana wallet: \${kp.publicKey.toBase58()})\`)


console.log(\`[\${kp.secretKey}]\`)`}
          language="typescript"
        />
        <div>
          Now we can run the following script in our terminal to generate a new
          keypair!
        </div>
        <CodeBlock code={`yarn keygen`} language="bash" />
        <div>
          This will generate a new Keypair, outputting its Address and Private
          Key like so:
        </div>
        <CodeBlock
          code={`You've generated a new Solana wallet: 2sNvwMf15WPp94kywgvfn3KBNPNZhr5mWrDHmgjkjMhN`}
          language="bash"
        />
        <div className="mb-2 text-xl">Verify Keypair</div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="min-w-[500px] rounded-sm border-2 border-solid border-black px-2"
            placeholder="Enter your Public Key"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
          <button
            className={`rounded-sm bg-black px-2 py-0.5 text-white ${
              isValid === "valid"
                ? "cursor-not-allowed bg-green-500"
                : isValid === "invalid"
                  ? "bg-red-500"
                  : ""
            }`}
            onClick={verifyKeypair}
            disabled={isValid === "valid"}
          >
            {isValid === "valid"
              ? "Verified"
              : isValid === "invalid"
                ? "Invalid"
                : "Verify"}
          </button>
        </div>
        <div>
          To save your wallet, copy and paste your private key into a JSON file:
        </div>
        <CodeBlock
          code={`[34,46,55,124,141,190,24,204,134,91,70,184,161,181,44,122,15,172,63,62,153,150,99,255,202,89,105,77,41,89,253,130,
27,195,134,14,66,75,242,7,132,234,160,203,109,195,116,251,144,44,28,56,231,114,50,131,185,168,138,61,35,98,78,53]`}
          language="json"
        />
        <div>
          If we want to save this wallet locally. To do this, we&apos;re going
          run the following command:
        </div>
        <CodeBlock code={`touch dev-wallet.json`} language="bash" />
        <div>
          This creates the file dev-wallet.json in our ./airdrop root directory.
          Now we just need to paste the private key from above into this file,
          like so (you need the []):
        </div>
        <CodeBlock
          code={`[34,46,55,124,141,190,24,204,134,91,70,184,161,181,44,122,15,172,63,62,153,150,99,255,202,89,105,77,41,89,253,130,
27,195,134,14,66,75,242,7,132,234,160,203,109,195,116,251,144,44,28,56,231,114,50,131,185,168,138,61,35,98,78,53]`}
          language="json"
        />
        <div>
          Congrats, you&apos;ve created a new Keypair and saved your wallet.
          Let&apos;s go claim some tokens!
        </div>
        <div className="mb-2 mt-4 text-2xl">2. Claim Token Airdrop</div>
        <div>
          Now that we have our wallet created, we&apos;re going to import it
          into another script.
        </div>
        <div>
          This time, we&apos;re going to import Keypair, but we&apos;re also
          going to import Connection to let us establish a connection to the
          Solana devnet,
        </div>
        <div className="relative top-[-16px]">
          and LAMPORTS_PER_SOL which lets us conveniently send ourselves amounts
          denominated in SOL rather than the individual lamports units.
        </div>
        <CodeBlock
          code={`import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js"

import wallet from "./dev-wallet.json"

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
Now we're going to establish a connection to the Solana devnet:

//Create a Solana devnet connection to devnet SOL tokens
const connection = new Connection("https://api.devnet.solana.com");`}
          language="typescript"
        />
        <div>Finally, we&apos;re going to claim 2 devnet SOL tokens:</div>
        <CodeBlock
          code={`(async () => {
    try {
        // We're going to claim 2 devnet SOL tokens
        const txhash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
        console.log(\`Success! Check out your TX here: 
        https://explorer.solana.com/tx/\${txhash}?cluster=devnet\`);
    } catch(e) {
        console.error(\`Oops, something went wrong: \${e}\`)
    }
})();
`}
          language="typescript"
        />
        <div>Here is an example of the output of a successful airdrop:</div>
        <CodeBlock
          code={`Success! Check out your TX here:
https://explorer.solana.com/tx/459QHLHJBtkHgV3BkzGKo4CDSWzNr8HboJhiQhpx2dj8xPVqx4BtUPCDWYbbTm426mwqmdYBhEodUQZULcpvzd5z?cluster=devnet
`}
          language="bash"
        />
        <div className="mb-2 text-xl">Verify Airdrop</div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="min-w-[500px] rounded-sm border-2 border-solid border-black px-2"
            placeholder="Enter your Public Key"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
          <button
            className={`rounded-sm bg-black px-2 py-0.5 text-white ${
              isValid === "valid"
                ? "cursor-not-allowed bg-green-500"
                : isValid === "invalid"
                  ? "bg-red-500"
                  : ""
            }`}
            onClick={() => getWalletBalance(publicKey, setBalance)}
            disabled={isValid === "valid"}
          >
            {typeof balance === "number"
              ? balance === 0
                ? "No Balance: Try Airdrop Again"
                : `Balance: ${balance} SOL`
              : balance === "failed"
                ? "Failed to Fetch"
                : "Verify"}
          </button>
        </div>
        <div className="mb-2 text-2xl">
          3. Transfer tokens to your WBA Address
        </div>
        <div>
          <div>
            Now we have some devnet SOL to play with, it&apos;s time to create
            our first native Solana token transfer.
          </div>
          <div>
            When you first signed up for the course, you gave WBA a Solana
            address for certification.
          </div>
          <div>
            We&apos;re going to be sending some devnet SOL to this address so we
            can use it going forward.
          </div>
          <div>
            (NOTE: If you did not enter the address in the application, or you
            are using a different address, you need to reach out to Jeff, ASAP).
          </div>
        </div>
        <div>
          We&apos;re going to open up transfer.ts and import the following items
          from @solana/web3.js:
        </div>
        <CodeBlock
          code={`import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js"
`}
          language="typescript"
        />
        <div>We will also import our dev wallet as we did last time:</div>
        <CodeBlock
          code={`import wallet from "./dev-wallet.json"

// Import our dev wallet keypair from the wallet file
const from = Keypair.fromSecretKey(new Uint8Array(wallet));

// Define our WBA public key
const to = new PublicKey("GLtaTaYiTQrgz411iPJD79rsoee59HhEy18rtRdrhEUJ");
`}
          language="typescript"
        />
        <div>And create a devnet connection:</div>
        <CodeBlock
          code={`//Create a Solana devnet connection
const connection = new Connection("https://api.devnet.solana.com");`}
          language="typescript"
        />
        <div>
          Now we&apos;re going to create a transaction using @solana/web3.js to
          transfer 0.1 SOL from our dev wallet to our second wallet address on
          the Solana devenet. Here&apos;s how we do that:
        </div>
        <CodeBlock
          code={`(async () => {
    try {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey:  to,
                lamports: LAMPORTS_PER_SOL/100,
            })
        );
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;
        
        // Sign transaction, broadcast, and confirm
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        );
        console.log(\`Success! Check out your TX here: 
        https://explorer.solana.com/tx/\${signature}?cluster=devnet\`);
    } catch(e) {
        console.error(\`Oops, something went wrong: \${e}\`)
    }
})();
`}
          language="typescript"
        />
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="min-w-[500px] rounded-sm border-2 border-solid border-black px-2"
            placeholder="Enter Sender Public Key"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
          <input
            type="text"
            className="min-w-[500px] rounded-sm border-2 border-solid border-black px-2"
            placeholder="Enter Recipient Public Key"
            value={recipientPublicKey}
            onChange={(e) => setRecipientPublicKey(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="min-w-[1008px] rounded-sm border-2 border-solid border-black px-2"
            placeholder="Enter Signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            className="min-w-[500px] rounded-sm border-2 border-solid border-black px-2"
            placeholder="Enter Expected Amount"
            value={expectedAmount}
            onChange={(e) => setExpectedAmount(Number(e.target.value))}
          />
          <button
            className={`ml-2 rounded-sm bg-black px-2 py-0.5 text-white ${
              isValid === "valid"
                ? "cursor-not-allowed bg-green-500"
                : isValid === "invalid"
                  ? "bg-red-500"
                  : ""
            }`}
            onClick={() =>
              verifyTransfer(
                signature,
                publicKey,
                recipientPublicKey,
                expectedAmount,
                setTransferDetails,
              )
            }
            disabled={isValid === "valid"}
          >
            {typeof transferDetails === "string"
              ? transferDetails === "untested"
                ? "Verify"
                : "Invalid"
              : "Success"}
          </button>
        </div>

        <div className="mb-2 text-2xl">
          4. Empty devnet wallet into a second wallet
        </div>
        <div className="overflow-wrap-anywhere max-w-[1100px] overflow-hidden break-words">
          {`
Okay, now that we're done with our devnet wallet, let's also go ahead and send all of our remaining lamports to our WBA dev wallet. 


It is typically good practice to clean up accounts where we can as it allows us to reclaim resources that aren't being used which have actualmonetary value on mainnet.`}
        </div>
        <div className="overflow-wrap-anywhere max-w-[1100px] overflow-hidden break-words">
          {`
To send all of the remaining lamports out of our dev wallet to our WBA wallet, we're going to need to add in a few more lines of code to the above examples so we can:
`}

          <ul className="ml-4 mt-2 list-disc space-y-2">
            <li>Get the exact balance of the account</li>
            <li>Calculate the fee of sending the transaction</li>
            <li>
              Calculate the exact number of lamports we can send whilst
              satisfying the fee rate
            </li>
          </ul>
        </div>
        <CodeBlock
          code={`
(async () => {
    try {
        // Get balance of dev wallet
        const balance = await connection.getBalance(from.publicKey)

        // Create a test transaction to calculate fees
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance,
            })
        );
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;

        // Calculate exact fee rate to transfer entire SOL amount out of account minus fees
        const fee = (await connection.getFeeForMessage(transaction.compileMessage(), 'confirmed')).value || 0;

        // Remove our transfer instruction to replace it
        transaction.instructions.pop();

        // Now add the instruction back with correct amount of lamports
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance - fee,
            })
        );

        // Sign transaction, broadcast, and confirm
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        );
        console.log(\`Success! Check out your TX here: 
        https://explorer.solana.com/tx/\${signature}?cluster=devnet\`)
    } catch(e) {
        console.error(\`Oops, something went wrong: \${e}\`)
    }
})();
`}
          language="typescript"
        />
        <div className="overflow-wrap-anywhere max-w-[1100px] overflow-hidden break-words">
          {`
As you can see, we created a mock version of the transaction to perform a fee calculation before removing and reading the transfer instruction, signing and sending it. You can see from the outputted transaction signature on the block explorer here that the entire value was sent to the exact lamport:`}
        </div>
        <CodeBlock
          code={`Check out your TX here:
https://explorer.solana.com/tx/4dy53oKUeh7QXr15wpKex6yXfz4xD2hMtJGdqgzvNnYyDNBZXtcgKZ7NBvCj7PCYU1ELfPZz3HEk6TzT4VQmNoS5?cluster=devnet
`}
          language="bash"
        />
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="min-w-[500px] rounded-sm border-2 border-solid border-black px-2"
            placeholder="Enter Sender Public Key"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="min-w-[1008px] rounded-sm border-2 border-solid border-black px-2"
            placeholder="Enter Signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />
        </div>
        <div>
          <button
            className={`rounded-sm bg-black px-2 py-0.5 text-white ${
              isValid === "valid"
                ? "cursor-not-allowed bg-green-500"
                : isValid === "invalid"
                  ? "bg-red-500"
                  : ""
            }`}
            onClick={() =>
              verifyFullTransfer(signature, publicKey, setFullTransferSignature)
            }
          >
            {fullTransferSignature === "untested"
              ? "Verify"
              : fullTransferSignature === "failed"
                ? "Invalid"
                : "Success"}
          </button>
        </div>
      </div>
    </div>
  );
}
