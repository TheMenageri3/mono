import { ReactNode } from "react";
import { toast } from "sonner";
import { ExplorerLink } from "@/components/cluster/cluster-ui";

export function ellipsify(str = "", len = 4): string {
  if (str.length > 30) {
    return (
      str.substring(0, len) + ".." + str.substring(str.length - len, str.length)
    );
  }
  return str;
}

export function useTransactionToast() {
  return (signature: string) => {
    toast.success("Transaction sent", {
      description: (
        <div className="flex justify-center mt-2">
          <a
            href={`https://explorer.solana.com/tx/${signature}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            View Transaction
          </a>
        </div>
      ),
      duration: 6000,
    });
  };
}
