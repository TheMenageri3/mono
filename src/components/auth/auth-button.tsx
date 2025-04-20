"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn, LogOut, User } from "lucide-react";
import { useState } from "react";

export function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading") {
    return (
      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50">
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </button>
    );
  }

  if (session) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/10 transition-colors"
          aria-expanded={isOpen}
        >
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">{session.user?.email}</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-card border border-border rounded-md shadow-md overflow-hidden z-50">
            <button
              onClick={() => {
                signOut();
                router.push("/");
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left hover:bg-accent/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/10 transition-colors"
      onClick={() => {
        router.push("/auth/login");
      }}
    >
      <LogIn className="h-4 w-4" />
      <span className="hidden sm:inline">Sign In</span>
    </button>
  );
}
