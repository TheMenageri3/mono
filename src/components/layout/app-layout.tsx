"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { AuthButton } from "../auth/auth-button";
import { WalletButton } from "../solana/solana-provider";
import { ClusterChecker } from "../cluster/cluster-ui";
import { AccountChecker } from "../account/account-ui";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function AppLayout({
  children,
  links,
  testingLinks,
}: {
  children: ReactNode;
  links: { label: string; path: string }[];
  testingLinks: { label: string; path: string }[];
}) {
  const pathname = usePathname();
  const isTestingPath = pathname.startsWith("/testing");

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b border-border">
          <div className="container mx-auto h-16 flex items-center justify-between px-4">
            <div className="flex items-center">
              <Link href="/" className="font-bold text-xl mr-8">
                Menageri3
              </Link>

              <nav className="hidden md:block">
                <ul className="flex items-center gap-1">
                  {links.map(({ label, path }) => (
                    <li key={path}>
                      <Link
                        href={path}
                        className={`px-4 py-2 rounded-md text-sm transition-colors ${
                          pathname === path
                            ? "bg-accent/30 text-foreground font-medium"
                            : "hover:bg-accent/5 text-muted-foreground"
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}

                  {/* Testing dropdown */}
                  {testingLinks && testingLinks.length > 0 && (
                    <li className="relative">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className={`flex items-center px-4 py-2 rounded-md text-sm transition-colors ${
                            isTestingPath
                              ? "bg-accent/30 text-foreground font-medium"
                              : "hover:bg-accent/5 text-muted-foreground"
                          }`}
                        >
                          Testing
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {testingLinks.map(({ label, path }) => (
                            <DropdownMenuItem key={path} asChild>
                              <Link href={path} className="cursor-pointer">
                                {label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </li>
                  )}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <AuthButton />
              <WalletButton />
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Network status checks */}
        <div className="bg-muted/5">
          <div className="container mx-auto px-4">
            <ClusterChecker>
              <AccountChecker />
            </ClusterChecker>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-grow container mx-auto px-4 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-6 bg-card/50">
          <div className="container mx-auto px-4">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Menageri3. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
