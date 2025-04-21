"use client";

import { ExternalLink } from "lucide-react";
import { AppHero } from "../ui/hero";

const links: { label: string; href: string }[] = [
  { label: "Solana Docs", href: "https://docs.solana.com/" },
  { label: "Solana Faucet", href: "https://faucet.solana.com/" },
  { label: "Solana Cookbook", href: "https://solanacookbook.com/" },
  { label: "Solana Stack Overflow", href: "https://solana.stackexchange.com/" },
  {
    label: "Solana Developers GitHub",
    href: "https://github.com/solana-developers/",
  },
];

export default function DashboardFeature() {
  return (
    <div>
      <AppHero title="Welcome" subtitle="Say hi to your new Solana dApp." />

      <div className="max-w-xl mx-auto mt-10 text-center">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Here are some helpful links to get you started.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{link.label}</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
