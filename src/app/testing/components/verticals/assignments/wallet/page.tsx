import React from "react";
import { DeleteWallet } from "./components/DeleteWallet";
import { RestoreWallet } from "./components/RestoreWallet";
import { UpdateWallet } from "./components/UpdateWallet";
import { CreateWallet } from "./components/CreateWallet";

export default function WalletPage() {
  return (
    <div>
      <CreateWallet />
      <DeleteWallet />
      <RestoreWallet />
      <UpdateWallet />
    </div>
  );
}
