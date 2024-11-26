"use client";
import { useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  LogOut,
  Wallet as WalletIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { minimizePubkey } from "~/lib/utils/helpers";
import useScreen from "~/hooks/useScreen";

export const Wallet = () => {
  const { setVisible } = useWalletModal();
  const { connected, publicKey, disconnect, wallet } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const screenSize = useScreen();
  const useSimplifiedInterface = ["sm", "md", "lg"].includes(screenSize);

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
      // window.location.href = "/";
    } catch (error) {
      console.error("Error during disconnect:", error);
    }
  }, [disconnect]);

  if (!connected) {
    return (
      <Button
        onClick={handleConnect}
        className="bg-turbine-500 hover:bg-turbine-600"
      >
        Connect Wallet
      </Button>
    );
  }

  if (useSimplifiedInterface) {
    return (
      <Button
        onClick={handleDisconnect}
        className="bg-turbine-500 hover:bg-turbine-600 flex items-center gap-2"
      >
        {wallet && (
          <Image
            alt={wallet.adapter.name}
            src={wallet.adapter.icon}
            width={20}
            height={20}
          />
        )}
        <span>Disconnect</span>
        <LogOut className="ml-1 h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-2 bg-white hover:bg-zinc-50">
          {wallet && (
            <Image
              alt={wallet.adapter.name}
              src={wallet.adapter.icon}
              width={20}
              height={20}
            />
          )}
          <span className="font-bold text-zinc-800">
            {publicKey && minimizePubkey(publicKey.toBase58())}
          </span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-primary" />
          ) : (
            <ChevronDown className="h-4 w-4 text-primary" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" alignOffset={-5}>
        <DropdownMenuLabel>Wallet Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <WalletIcon className="mr-2 h-4 w-4" />
            <span className="truncate">{wallet?.adapter.name}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="truncate text-xs">
              {publicKey && minimizePubkey(publicKey.toBase58())}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
