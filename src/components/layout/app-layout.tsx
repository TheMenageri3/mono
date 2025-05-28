"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { AuthButton } from "../auth/auth-button";
import { StyledWalletButton } from "../solana/wallet-button-styled";
import { ClusterChecker } from "../cluster/cluster-ui";
import { AccountChecker } from "../account/account-ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Bell,
  Settings,
  Zap,
  Globe,
  Users,
  Database,
  TestTube2,
  Home,
  Sparkles,
  GraduationCap,
  Building,
  Calendar,
  FileText,
  FolderOpen,
  User,
  Briefcase,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import { CheckEmptyTablesButton, SeedButton } from "../seed/seed-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavigationItem {
  label: string;
  path?: string;
  type: "standalone" | "dropdown";
  items?: { label: string; path: string }[];
}

export function AppLayout({
  children,
  navigationLinks,
  testingLinks,
}: {
  children: ReactNode;
  navigationLinks: NavigationItem[];
  testingLinks: { label: string; path: string }[];
}) {
  const pathname = usePathname();
  const isTestingPath = pathname.startsWith("/testing");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

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
  // Navigation icons mapping
  const navIcons: Record<string, any> = {
    Profile: User,
    Jobs: Briefcase,
    Classroom: GraduationCap,
    Company: Building,
    Events: Calendar,
    "Solana Forum": Globe,
    Testing: TestTube2,
    // Legacy support
    Submission: Users,
    Creation: Database,
    Review: TestTube2,
    Dashboard: Home,
    Event: TestTube2,
    "Support Ticket": Bell,
  };

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

  const slideInVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
  };

  // Check if any item in a dropdown is active
  const isDropdownActive = (items: { label: string; path: string }[]) => {
    return items.some((item) => pathname === item.path);
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="flex flex-col min-h-screen">
        {/* Sleeker Floating Header */}{" "}
        <header
          className={cn(
            "fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out mx-auto max-w-[92%] w-[1400px]", // Using transform to properly center
            "backdrop-blur-lg bg-black/85 border border-gray-800/30 rounded-xl shadow-lg",
            scrolled ? "bg-black/95 shadow-black/15" : "bg-black/75"
          )}
        >
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-black/5 to-blue-900/10 rounded-xl opacity-40"></div>

          <div className="relative px-4 py-2">
            <div className="flex items-center justify-between">
              {/* Compact Logo Section */}
              <div className="flex items-center gap-8">
                <Link
                  href="/"
                  className="group relative flex items-center gap-2"
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Subtle logo glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/15 to-blue-600/15 rounded-lg blur-md group-hover:blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                    {/* Smaller logo icon */}
                    <div className="relative flex items-center justify-center w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                  <div className="hidden sm:block">
                    <motion.h1
                      className="text-lg font-bold bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text text-transparent"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      Menageri3
                    </motion.h1>
                  </div>
                </Link>
                {/* Streamlined Desktop Navigation */}
                <nav className="hidden lg:block">
                  <ul className="flex items-center gap-1">
                    {navigationLinks.map((navItem, index) => {
                      const IconComponent =
                        navIcons[navItem.label as keyof typeof navIcons] ||
                        Home;

                      if (navItem.type === "standalone" && navItem.path) {
                        return (
                          <motion.li
                            key={navItem.label}
                            initial="hidden"
                            animate="visible"
                            custom={index}
                            variants={menuItemVariants}
                            onHoverStart={() => setHoveredItem(navItem.label)}
                            onHoverEnd={() => setHoveredItem(null)}
                          >
                            <Link
                              href={navItem.path}
                              className={cn(
                                "group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300",
                                pathname === navItem.path
                                  ? "text-white bg-gradient-to-r from-purple-600/80 to-blue-600/80 shadow-md"
                                  : "text-gray-300 hover:text-white hover:bg-white/5"
                              )}
                            >
                              <IconComponent className="w-3.5 h-3.5" />
                              <span className="relative z-10">
                                {navItem.label}
                              </span>

                              {/* Active indicator - subtle dot
                              {pathname === navItem.path && (
                                <motion.div
                                  className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                                  layoutId="nav-active-indicator"
                                />
                              )} */}

                              {/* Hover background */}
                              {hoveredItem === navItem.label &&
                                pathname !== navItem.path && (
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-lg"
                                    layoutId="navbar-hover"
                                    transition={{ duration: 0.2 }}
                                  />
                                )}
                            </Link>
                          </motion.li>
                        );
                      }

                      // Dropdown menu for grouped items
                      if (navItem.type === "dropdown" && navItem.items) {
                        const isActive = isDropdownActive(navItem.items);

                        return (
                          <motion.li
                            key={navItem.label}
                            className="relative"
                            initial="hidden"
                            animate="visible"
                            custom={index}
                            variants={menuItemVariants}
                            onHoverStart={() =>
                              setHoveredItem(`${navItem.label}-dropdown`)
                            }
                            onHoverEnd={() => setHoveredItem(null)}
                          >
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className={cn(
                                    "group relative flex items-center gap-1.5 px-3 py-1.5 h-auto rounded-lg text-xs font-semibold transition-all duration-300 hover:bg-white/5",
                                    isActive
                                      ? "text-white bg-gradient-to-r from-purple-600/80 to-blue-600/80 shadow-md"
                                      : "text-gray-300 hover:text-white"
                                  )}
                                >
                                  <IconComponent className="w-3.5 h-3.5" />
                                  <span>{navItem.label}</span>
                                  <ChevronDown className="w-2.5 h-2.5 transition-transform group-data-[state=open]:rotate-180" />

                                  {/* Active indicator
                                  {isActive && (
                                    <motion.div
                                      className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                                      layoutId="nav-active-indicator"
                                    />
                                  )} */}
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent
                                align="start"
                                className="w-56 mt-1 backdrop-blur-2xl bg-black/95 border border-gray-500/20 shadow-xl shadow-gray-500/10 rounded-xl p-1"
                                sideOffset={5}
                              >
                                <div className="px-2 py-1.5 mb-1">
                                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                                    {navItem.label}
                                  </p>
                                </div>

                                {navItem.items.map(({ label, path }, idx) => (
                                  <DropdownMenuItem
                                    key={path}
                                    asChild
                                    className={cn(
                                      "group cursor-pointer rounded-lg p-0 focus:bg-transparent"
                                    )}
                                  >
                                    <Link
                                      href={path}
                                      className={cn(
                                        "flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all duration-200",
                                        pathname === path
                                          ? "bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white shadow-sm"
                                          : "text-gray-300 hover:text-white hover:bg-white/5"
                                      )}
                                    >
                                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-500" />
                                      <span className="flex-1">{label}</span>
                                      {pathname === path && (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="w-1 h-1 rounded-full bg-white"
                                        />
                                      )}
                                    </Link>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </motion.li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </nav>
              </div>

              {/* Right Action Section */}
              <div className="flex items-center gap-2">
                {/* Mobile Menu Toggle */}
                <div className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={cn(
                      "relative w-8 h-8 text-gray-300 hover:text-white rounded-lg transition-all duration-300",
                      mobileMenuOpen && "bg-white/10"
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
                          <X size={16} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu size={16} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>

                {/* Streamlined Authentication Section */}
                <motion.div
                  className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-md"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{
                    boxShadow: "0 8px 24px rgba(100,100,100,0.15)",
                    y: -1,
                  }}
                >
                  <AuthButton />
                  <div className="w-px h-5 bg-white/20"></div>
                  <StyledWalletButton />
                </motion.div>

                {/* Developer Tools - More compact */}
                <motion.div
                  className="hidden lg:flex items-center gap-1.5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <SeedButton />
                  <CheckEmptyTablesButton />
                </motion.div>
              </div>
            </div>
          </div>
        </header>
        {/* Enhanced Mobile Slide-in Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Slide-in Menu - Sleeker Design */}
              <motion.div
                variants={slideInVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-black/95 backdrop-blur-xl border-r border-gray-500/20 shadow-2xl lg:hidden"
              >
                {/* Menu Header - More compact */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800/40">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                        Menageri3
                      </h2>
                      <p className="text-[10px] text-gray-500">Navigation</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-7 h-7 text-gray-400 hover:text-white rounded-md"
                  >
                    <X size={16} />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {/* Navigation Links */}
                  <div className="p-3">
                    <div className="space-y-1.5">
                      {navigationLinks.map((navItem, index) => {
                        const IconComponent =
                          navIcons[navItem.label as keyof typeof navIcons] ||
                          Home;

                        if (navItem.type === "standalone" && navItem.path) {
                          return (
                            <motion.div
                              key={navItem.path}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Link
                                href={navItem.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  "group flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300",
                                  pathname === navItem.path
                                    ? "bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white shadow-md"
                                    : "text-gray-300 hover:text-white hover:bg-white/5"
                                )}
                              >
                                <IconComponent className="w-4 h-4" />
                                <span className="flex-1">{navItem.label}</span>
                                {pathname === navItem.path && (
                                  <motion.div
                                    className="w-1.5 h-1.5 rounded-full bg-white"
                                    layoutId="mobile-nav-indicator"
                                  />
                                )}
                              </Link>
                            </motion.div>
                          );
                        }

                        // Handle dropdown items in mobile
                        if (navItem.type === "dropdown" && navItem.items) {
                          const isActive = isDropdownActive(navItem.items);

                          return (
                            <div key={navItem.label} className="space-y-1">
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <button
                                  onClick={() => {
                                    const newOpenDropdowns = new Set(
                                      openDropdowns
                                    );
                                    if (newOpenDropdowns.has(navItem.label)) {
                                      newOpenDropdowns.delete(navItem.label);
                                    } else {
                                      newOpenDropdowns.add(navItem.label);
                                    }
                                    setOpenDropdowns(newOpenDropdowns);
                                  }}
                                  className={cn(
                                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300",
                                    isActive
                                      ? "bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white shadow-md"
                                      : "text-gray-300 hover:text-white hover:bg-white/5"
                                  )}
                                >
                                  <IconComponent className="w-4 h-4" />
                                  <span className="flex-1">
                                    {navItem.label}
                                  </span>
                                  <ChevronDown
                                    className={cn(
                                      "w-3 h-3 transition-transform",
                                      openDropdowns.has(navItem.label) &&
                                        "rotate-180"
                                    )}
                                  />
                                </button>
                              </motion.div>

                              {/* Dropdown items */}
                              <AnimatePresence>
                                {openDropdowns.has(navItem.label) && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="ml-8 space-y-0.5"
                                  >
                                    {navItem.items.map((item, itemIndex) => (
                                      <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: itemIndex * 0.05 }}
                                      >
                                        <Link
                                          href={item.path}
                                          onClick={() =>
                                            setMobileMenuOpen(false)
                                          }
                                          className={cn(
                                            "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all duration-200",
                                            pathname === item.path
                                              ? "bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white shadow-sm"
                                              : "text-gray-400 hover:text-white hover:bg-white/5"
                                          )}
                                        >
                                          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-500" />
                                          <span className="flex-1">
                                            {item.label}
                                          </span>
                                          {pathname === item.path && (
                                            <motion.div className="w-1 h-1 rounded-full bg-white" />
                                          )}
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        }

                        return null;
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Section - More compact */}
                <div className="p-3 border-t border-gray-800/40 space-y-2">
                  <div className="flex items-center justify-between gap-2 p-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10">
                    <AuthButton />
                    <div className="w-px h-5 bg-white/20"></div>
                    <StyledWalletButton />
                  </div>

                  <div className="flex gap-1.5">
                    <SeedButton />
                    <CheckEmptyTablesButton />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>{" "}
        {/* Enhanced Network status checks - Adjust top margin for new navbar height */}
        <div
          className={cn(
            "bg-muted/5 transition-all mt-16", // Reduced top margin for smaller navbar
            scrolled ? "border-b border-border/10 shadow-sm" : ""
          )}
        >
          <div className="max-w-[1400px] w-[92%] mx-auto px-4 py-1.5">
            <ClusterChecker>
              <AccountChecker />
            </ClusterChecker>
          </div>
        </div>
        {/* Main content */}
        <main className="flex-grow max-w-[1400px] w-[92%] mx-auto px-4 py-6">
          {children}
        </main>{" "}
        {/* Enhanced Footer with gradient & multi-section layout */}
        <footer className="relative border-t border-border/30 py-8 bg-gradient-to-b from-black/80 via-card/30 to-black/80 backdrop-blur-sm">
          {/* Subtle animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-blue-900/5 to-purple-900/5 opacity-30"></div>

          <div className="relative max-w-[1400px] w-[92%] mx-auto px-4">
            {/* Main footer content - 3 column layout on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Brand Column */}
              <div className="flex flex-col items-center md:items-start">
                <Link href="/" className="flex items-center gap-2 mb-3 group">
                  <div className="relative flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-md group-hover:shadow-lg transition-all">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text text-transparent">
                    Menageri3
                  </h2>
                </Link>
                <p className="text-sm text-muted-foreground/80 text-center md:text-left mb-4">
                  Building the future of decentralized applications and Web3
                  solutions.
                </p>
                {/* Social Links */}
                <div className="flex items-center gap-4 mt-2">
                  <a
                    href="https://twitter.com/menageri3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a
                    href="https://github.com/menageri3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a
                    href="https://discord.gg/menageri3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <path d="M9 12h.01M15 12h.01M8.5 8.5 10 7l-.5 3L15 7l-.5 3.5M6.5 17.5l-2-6 9.5-1 9.5 1-2.5 6"></path>
                      <path d="m2 18 1.5-4.5m18.5 4.5-1.5-4.5"></path>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links Column */}
              <div className="flex flex-col items-center md:items-start">
                <h3 className="text-sm font-semibold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent uppercase tracking-wider mb-4">
                  Resources
                </h3>
                <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                  <Link
                    href="/docs"
                    className="text-sm text-muted-foreground flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    <FileText size={14} />
                    <span>Documentation</span>
                  </Link>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/faq"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/support"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Support
                  </Link>
                  <Link
                    href="/blog"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </div>
              </div>

              {/* Newsletter Column */}
              <div className="flex flex-col items-center md:items-start">
                <h3 className="text-sm font-semibold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent uppercase tracking-wider mb-4">
                  Stay Connected
                </h3>
                <p className="text-sm text-muted-foreground/80 mb-3 text-center md:text-left">
                  Subscribe for updates on new features and announcements
                </p>
                <div className="flex w-full max-w-xs">
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="rounded-r-none bg-black/30 border-border/30 placeholder:text-muted-foreground/40 focus:ring-purple-500"
                  />
                  <Button className="rounded-l-none bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom bar with copyright */}
            <div className="pt-6 mt-2 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60">
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
                  href="/sitemap"
                  className="hover:text-foreground transition-colors"
                >
                  Sitemap
                </Link>
                <Link
                  href="https://solana.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  Powered by Solana <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
