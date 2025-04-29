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
