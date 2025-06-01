"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn, LogOut, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  if (status === "loading") {
    return (
      <motion.button className="flex items-center justify-center w-10 h-10 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
        <Loader2 className="h-4 w-4 text-white/70" />
      </motion.button>
    );
  }

  if (session) {
    return (
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md border shadow-lg transition-all duration-300",
            "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20",
            "text-white/90 hover:text-white",
            isOpen && "bg-white/10 border-white/20"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-expanded={isOpen}
        >
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-purple-600/80 to-blue-600/80">
            <User className="h-3 w-3 text-white" />
          </div>
          <span className="hidden sm:inline text-sm font-medium truncate max-w-32">
            {session.user?.email}
          </span>
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 backdrop-blur-2xl bg-black/95 border border-gray-500/20 rounded-2xl shadow-2xl shadow-gray-500/10 overflow-hidden z-50"
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {session.user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {session.user?.email}
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={() => {
                    signOut();
                    router.push("/");
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-left rounded-xl transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop to close dropdown */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }

  return (
    <motion.button
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md border shadow-lg transition-all duration-300",
        "bg-gradient-to-r from-purple-600/80 to-blue-600/80 border-purple-500/50 hover:from-purple-700/90 hover:to-blue-700/90",
        "text-white font-medium"
      )}
      onClick={() => {
        router.push("/auth/login");
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <LogIn className="h-4 w-4" />
      <span className="hidden sm:inline text-sm">Sign In</span>
    </motion.button>
  );
}
