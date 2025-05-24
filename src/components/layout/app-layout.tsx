"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { AuthButton } from "../auth/auth-button";
import { WalletButton } from "../solana/solana-provider";
import { ClusterChecker } from "../cluster/cluster-ui";
import { AccountChecker } from "../account/account-ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X, ExternalLink } from "lucide-react";
import { CheckEmptyTablesButton, SeedButton } from "../seed/seed-button";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Force dark mode whenever the component mounts
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animation variants for menu items
  const menuItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.25,
      },
    }),
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="flex flex-col min-h-screen">
        {/* Enhanced Glassmorphic Header */}
        <header
          className={cn(
            "sticky top-0 z-40 w-full transition-all duration-300",
            scrolled
              ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-md"
              : "bg-gradient-to-b from-background to-background/95 backdrop-blur-sm"
          )}
        >
          <div className="container mx-auto h-16 flex items-center justify-between px-4">
            <div className="flex items-center gap-8">
              {/* Logo with updated purple-to-blue gradient */}
              <Link href="/" className="font-bold text-xl relative group">
                <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent inline-block">
                  Menageri3
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-[2px] group-hover:h-[3px]">
                  <div className="h-full w-0 group-hover:w-full transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-500"></div>
                </div>
                <motion.div
                  className="absolute -inset-x-2 -inset-y-1 rounded-lg opacity-0 group-hover:opacity-100 -z-10"
                  transition={{ duration: 0.3 }}
                  animate={{
                    background: [
                      "linear-gradient(90deg, rgba(147,51,234,0.05) 0%, rgba(59,130,246,0.05) 100%)",
                      "linear-gradient(90deg, rgba(147,51,234,0.08) 0%, rgba(59,130,246,0.08) 100%)",
                    ],
                    boxShadow: [
                      "0 0 0px rgba(147,51,234,0)",
                      "0 0 10px rgba(147,51,234,0.15)",
                    ],
                  }}
                />
              </Link>

              {/* Desktop Navigation with updated gradients */}
              <nav className="hidden md:block">
                <ul className="flex items-center gap-2">
                  {links.map(({ label, path }, index) => (
                    <motion.li
                      key={path}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      variants={menuItemVariants}
                      onHoverStart={() => setHoveredItem(path)}
                      onHoverEnd={() => setHoveredItem(null)}
                    >
                      <Link
                        href={path}
                        className={cn(
                          "px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative flex items-center",
                          pathname === path
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span className="relative z-10">{label}</span>
                        {(pathname === path || hoveredItem === path) && (
                          <motion.span
                            layoutId="navbar-active"
                            className={cn(
                              "absolute inset-0 rounded-md -z-10",
                              pathname === path
                                ? "bg-gradient-to-r from-purple-600/15 to-blue-500/15"
                                : "bg-muted/40"
                            )}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, type: "spring" }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  ))}

                  {/* Testing dropdown with updated gradients */}
                  {testingLinks && testingLinks.length > 0 && (
                    <motion.li
                      className="relative"
                      initial="hidden"
                      animate="visible"
                      custom={links.length}
                      variants={menuItemVariants}
                      onHoverStart={() => setHoveredItem("testing-dropdown")}
                      onHoverEnd={() => setHoveredItem(null)}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className={cn(
                            "flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300",
                            isTestingPath
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <span>Testing</span>
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 transition-all duration-200",
                              isTestingPath
                                ? "text-blue-500"
                                : "text-muted-foreground group-hover:text-foreground"
                            )}
                          />
                          {(isTestingPath ||
                            hoveredItem === "testing-dropdown") && (
                            <motion.span
                              layoutId="navbar-active"
                              className={cn(
                                "absolute inset-0 rounded-md -z-10",
                                isTestingPath
                                  ? "bg-gradient-to-r from-purple-600/15 to-blue-500/15"
                                  : "bg-muted/40"
                              )}
                              transition={{ duration: 0.2, type: "spring" }}
                            />
                          )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="backdrop-blur-xl bg-background/80 border border-border/50 shadow-xl rounded-md p-1 animate-in fade-in-80 zoom-in-95"
                          forceMount
                        >
                          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 border-b border-border/30 mb-1">
                            Testing Options
                          </div>
                          {testingLinks.map(({ label, path }, idx) => (
                            <DropdownMenuItem
                              key={path}
                              asChild
                              className={cn(
                                "cursor-pointer transition-colors rounded-sm px-3 py-1.5 text-sm my-0.5 focus:bg-accent/50 hover:bg-accent/50",
                                pathname === path &&
                                  "bg-gradient-to-r from-purple-600/10 to-blue-500/10 font-medium text-foreground"
                              )}
                            >
                              <Link
                                href={path}
                                className="w-full flex items-center justify-between"
                              >
                                <span>{label}</span>
                                {pathname === path && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500"
                                  />
                                )}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </motion.li>
                  )}
                </ul>
              </nav>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "text-foreground rounded-full transition-all duration-300",
                  mobileMenuOpen && "bg-muted/50"
                )}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>

            {/* Enhanced Action Buttons - Removed ThemeToggle */}
            <div className="hidden md:flex items-center gap-2">
              <motion.div
                className="flex items-center gap-1.5 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border/30 shadow-sm"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  y: -1,
                }}
              >
                <AuthButton />
                <div className="w-px h-5 bg-border/40"></div>
                <WalletButton />
              </motion.div>
              <motion.div
                className="flex gap-1.5"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <SeedButton />
                <CheckEmptyTablesButton />
                {/* ThemeToggle removed */}
              </motion.div>
            </div>
          </div>

          {/* Redesigned Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="md:hidden border-t border-border/20 bg-background/95 backdrop-blur-xl shadow-lg"
              >
                <div className="container mx-auto px-4 py-4 space-y-4">
                  <nav>
                    <ul className="space-y-1 pt-1">
                      {links.map(({ label, path }, index) => (
                        <motion.li
                          key={path}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={menuItemVariants}
                        >
                          <Link
                            href={path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-200",
                              pathname === path
                                ? "bg-gradient-to-r from-purple-600/15 to-blue-500/15 text-foreground font-medium"
                                : "hover:bg-muted/70 text-muted-foreground"
                            )}
                          >
                            <span>{label}</span>
                            {pathname === path && (
                              <motion.div
                                className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500"
                                layoutId="mobile-nav-indicator"
                              />
                            )}
                          </Link>
                        </motion.li>
                      ))}

                      {/* Testing section with updated gradients */}
                      {testingLinks && testingLinks.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="mt-4 mb-2 px-4 text-xs uppercase font-medium text-muted-foreground/70 tracking-wider">
                            Testing
                          </div>
                          <div className="bg-muted/20 rounded-lg p-1.5 border border-border/10">
                            {testingLinks.map(({ label, path }, index) => (
                              <motion.div
                                key={path}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                variants={menuItemVariants}
                              >
                                <Link
                                  href={path}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={cn(
                                    "flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200 my-1",
                                    pathname === path
                                      ? "bg-gradient-to-r from-purple-600/15 to-blue-500/15 text-foreground font-medium shadow-sm"
                                      : "hover:bg-muted/60 text-muted-foreground"
                                  )}
                                >
                                  <span>{label}</span>
                                  {pathname === path && (
                                    <motion.div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500" />
                                  )}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </ul>
                  </nav>

                  {/* Action buttons section remains the same */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 pt-3 border-t border-border/30 space-y-3"
                  >
                    <div className="flex items-center justify-between bg-muted/20 px-3 py-2 rounded-lg">
                      <span className="text-xs font-medium text-muted-foreground">
                        Authentication
                      </span>
                      <div className="flex items-center gap-2">
                        <AuthButton />
                        <WalletButton />
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-muted/20 px-3 py-2 rounded-lg">
                      <span className="text-xs font-medium text-muted-foreground">
                        Tools
                      </span>
                      <div className="flex items-center gap-2">
                        <SeedButton />
                        <CheckEmptyTablesButton />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Enhanced Network status checks */}
        <div
          className={cn(
            "bg-muted/5 transition-all",
            scrolled ? "border-b border-border/10 shadow-sm" : ""
          )}
        >
          <div className="container mx-auto px-4 py-1.5">
            <ClusterChecker>
              <AccountChecker />
            </ClusterChecker>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-grow container mx-auto px-4 py-6">
          {children}
        </main>

        {/* Footer with updated gradient */}
        <footer className="border-t border-border/30 py-6 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent font-medium">
                  © {new Date().getFullYear()} Menageri3
                </span>
                <span className="text-muted-foreground/60">
                  All rights reserved
                </span>
              </p>

              <div className="flex items-center gap-5">
                <Link
                  href="/terms"
                  className="hover:text-foreground transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="/privacy"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/docs"
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  Docs <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
