"use client";

import { api } from "@/trpc/react";

export function SeedButton() {
  const seed = api.seed.seed.useMutation();

  return (
    <button
      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/10 transition-colors"
      onClick={() => {
        seed.mutate();
      }}
    >
      <span className="hidden sm:inline">Seed</span>
    </button>
  );
}

export function CheckEmptyTablesButton() {
  const { mutate: checkEmptyTables } = api.seed.checkEmptyTables.useMutation();

  return (
    <button
      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/10 transition-colors"
      onClick={() => {
        checkEmptyTables(undefined, {
          onSuccess: (emptyTables) => {
            console.log("Empty tables:", emptyTables);
          },
        });
      }}
    >
      <span className="hidden sm:inline">Check Empty Tables</span>
    </button>
  );
}
