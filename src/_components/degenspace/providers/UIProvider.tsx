"use client";
import { TooltipProvider } from "../ui/tooltip";
import { WalletProviderUI } from "./WalletProvider";

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TooltipProvider>
        <WalletProviderUI>{children}</WalletProviderUI>
      </TooltipProvider>
    </>
  );
};
