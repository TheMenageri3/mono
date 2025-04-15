"use client";

import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "../app/react-query-provider";
import { ClusterProvider } from "./cluster/cluster-data-access";
import { SolanaProvider } from "./solana/solana-provider";
import { TRPCProvider } from "@/app/trpc-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TRPCProvider>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>{children}</SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </TRPCProvider>
    </SessionProvider>
  );
}
