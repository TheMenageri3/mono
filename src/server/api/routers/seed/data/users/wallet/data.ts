import { Prisma } from "@/generated/prisma";
export const TEST_WALLETS: Omit<
  Prisma.WalletCreateInput,
  "createdBy" | "updatedBy" | "profile"
>[] = [
  {
    publicKey: "0x1234567890abcdef",
    active: true,
  },
];
