import { minimizePubkey } from "~/lib/utils/helpers";
import P from "../P";
import { IconButton } from "./IconButton";

export const Pubkey = ({ pubkey }: { pubkey: string }) => {
  return (
    <div className="flex flex-row items-center gap-[4px]">
      <IconButton
        iconPath="copy.svg"
        onClick={() => {}}
        hoverName="Copy Pubkey"
      />

      <P className="text-[16px] font-bold text-primary">
        {minimizePubkey(pubkey)}
      </P>
      <IconButton
        iconPath="link.svg"
        onClick={() => {}}
        hoverName="View on Solana Explorer"
      />
    </div>
  );
};
