"use client";

import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "../app/react-query-provider";
import { ClusterProvider } from "./cluster/cluster-data-access";
import { SolanaProvider } from "./solana/solana-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <ClusterProvider>
          <SolanaProvider>{children}</SolanaProvider>
        </ClusterProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
