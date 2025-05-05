"use client";

import { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useWalletQueries } from "../hooks/useWalletQueries";
const defaultQueryParams = {
  limit: 10,
  offset: 0,
};

export function ListWallet() {
  const [inputPubKey, setInputPubKey] = useState("");
  const [pubKey, setPubKey] = useState("");

  const { useAllWallets, useWalletByPublicKey, useDeletedWallets } =
    useWalletQueries();

  const {
    data: wallets,
    isLoading: loadingWallets,
    isError: errorWallets,
  } = useAllWallets(defaultQueryParams);

  const {
    data: deletedWallets,
    isLoading: loadingDeleted,
    isError: errorDeleted,
  } = useDeletedWallets(defaultQueryParams);

  const {
    data: singleWallet,
    isLoading: loadingSingle,
    isError: errorSingle,
  } = useWalletByPublicKey({ publicKey: pubKey });

  // if (loadingWallets || loadingDeleted || loadingSingle) {
  //   return <div>Loading…</div>;
  // }

  if (errorWallets || errorDeleted || errorSingle) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load one or more wallet lists. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* All Wallets */}
      <Card>
        <CardHeader>
          <CardTitle>All Wallets</CardTitle>
        </CardHeader>
        <CardContent>
          {wallets && wallets.length > 0 ? (
            <ul className="space-y-3">
              {wallets.map((wallet: any) => (
                <li
                  key={wallet.publicKey}
                  className="flex justify-between border p-3 rounded"
                >
                  <div>
                    <p className="font-medium">
                      Public Key: {wallet.publicKey}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Profile ID: {wallet.profileId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Status: {wallet.active ? "Active" : "Inactive"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No wallets found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deleted Wallets */}
      <Card>
        <CardHeader>
          <CardTitle>Deleted Wallets</CardTitle>
        </CardHeader>
        <CardContent>
          {deletedWallets && deletedWallets.length > 0 ? (
            <ul className="space-y-3">
              {deletedWallets.map((wallet: any) => (
                <li key={wallet.publicKey} className="border p-3 rounded">
                  <p className="font-medium">Public Key: {wallet.publicKey}</p>
                  <p className="text-xs text-muted-foreground">Deleted</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No deleted wallets.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wallet Details (by Public Key)</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPubKey(inputPubKey.trim());
            }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter public key"
                value={inputPubKey}
                onChange={(e) => setInputPubKey(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>

            {pubKey ? (
              loadingSingle ? (
                <div>Loading…</div>
              ) : errorSingle ? (
                <div className="text-red-500">Failed to load wallet.</div>
              ) : !singleWallet ? (
                <div className="text-muted-foreground text-center py-4">
                  No wallet found for the given public key.
                </div>
              ) : (
                <div className="border p-4 rounded">
                  <p className="font-medium">
                    Public Key: {singleWallet.publicKey}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Profile ID: {singleWallet.profileId}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Status: {singleWallet.active ? "Active" : "Inactive"}
                  </p>
                </div>
              )
            ) : null}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
