"use client";
import { TooltipProvider } from "~/_components/ui/tooltip";
import { WalletProviderUI } from "./WalletProvider";
import { Toaster } from "react-hot-toast";

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TooltipProvider>
        <Toaster />
        <WalletProviderUI>{children}</WalletProviderUI>
      </TooltipProvider>
    </>
  );
};
