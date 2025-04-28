"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "../app/react-query-provider";
import { ClusterProvider } from "./cluster/cluster-data-access";
import { SolanaProvider } from "./solana/solana-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <TRPCReactProvider>
          <ClusterProvider>
            <SolanaProvider>{children}</SolanaProvider>
          </ClusterProvider>
        </TRPCReactProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
