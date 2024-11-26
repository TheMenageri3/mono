// Everything from here will be inherited by all pages
"use client";
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Inter, Arbutus, Atkinson_Hyperlegible, Onest } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import {
  UnsafeBurnerWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { UIProvider } from "~/_components/degenspace/providers/UIProvider";

const inter = Inter({ subsets: ["latin"] });

const arbutus = Arbutus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-arbutus",
});
const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-atkinson",
});

const onest = Onest({
  subsets: ["latin"],
  weight: "200",
  variable: "--font-onest",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // You can also provide a custom RPC endpoint.

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${arbutus.variable} ${atkinson.variable} ${onest.variable} ${inter.className} `}
    >
      <body>
        <UIProvider>
          <SessionProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </SessionProvider>
        </UIProvider>
      </body>
    </html>
  );
}
