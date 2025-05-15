"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ProfileAbout from "@/components/profile/enhanced/profile-about";
import ProfileSkills from "@/components/profile/enhanced/profile-skills";
import ProfileProjects from "@/components/profile/enhanced/profile-projects";
import ProfileExperience from "@/components/profile/enhanced/profile-experience";
import ProfileEducation from "@/components/profile/enhanced/profile-education";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronRight,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Wallet,
  Code,
  Globe,
  Sparkles,
  ArrowRight,
  Eye,
  Star,
  Clock,
  FileText,
  Hexagon,
  Copy,
  BarChart4,
  Zap,
} from "lucide-react";

// Here we add the import for the new horizontal experience component
import ProfileExperienceHorizontal from "@/components/profile/enhanced/profile-experience-horizontal";
// Mock data for the profile page too btw
// Mock wallet data
const walletData = {
  connected: true,
  address: "2JbkHNx5F1L7Sdbmce4qasFJcZJo6h3fdFQfyhgUHtmE",
  shortAddress: "2Jbk...htmE",
  network: "Solana Mainnet",
  balance: {
    sol: 48.5,
    usd: 14586.89,
  },
  tokens: [
    {
      symbol: "SOL",
      amount: 48.5,
      value: 14586.89,
      change: 2.3,
      icon: "/images/sol.svg",
    },
    {
      symbol: "SOL",
      amount: 48.5,
      value: 5820.0,
      change: -1.2,
      icon: "/images/sol.svg",
    },
    {
      symbol: "USDC",
      amount: 1250.0,
      value: 1250.0,
      change: 0,
      icon: "/images/usdc.svg",
    },
  ],
  nfts: [
    {
      name: "Azuki #9839",
      collection: "Azuki",
      image: "https://metadata.y00ts.com/y/8712.png",
      floor: 15.2,
    },
    {
      name: "Bored Ape #6583",
      collection: "BAYC",
      image: "https://basc.s3.amazonaws.com/img/3779.png",
      floor: 32.5,
    },
    {
      name: "Cryptopunk #3100",
      collection: "Cryptopunks",
      image: "https://metadata.y00ts.com/y/1753.png",
      floor: 48.7,
    },
  ],
};

// Mock web3 activity
const web3Activity = [
  {
    type: "mint",
    title: "Minted Genesis NFT",
    project: "Solana Art Collective",
    timestamp: "2 days ago",
    url: "#",
    icon: <Sparkles className="h-4 w-4 text-purple-400" />,
  },
  {
    type: "contribution",
    title: "Contributed to DAO Treasury",
    project: "BuilderDAO",
    timestamp: "1 week ago",
    url: "#",
    icon: <Wallet className="h-4 w-4 text-emerald-400" />,
  },
  {
    type: "development",
    title: "Deployed Smart Contract",
    project: "ERC-4337 Account Abstraction",
    timestamp: "3 weeks ago",
    url: "#",
    icon: <Code className="h-4 w-4 text-blue-400" />,
  },
];

// Enhanced profile data with Web3 elements
const profile = {
  name: "Alex Morgan",
  handle: "alexmorgan",
  avatar: "https://github.com/shadcn.png",
  role: "Product Designer & Web3 Developer",
  location: "San Francisco, CA",
  status: "Available for web3 projects",
  bio: "I build digital products at the intersection of design and blockchain technology. Focused on creating accessible, user-friendly interfaces for decentralized applications that help bridge the gap between web2 and web3 users.",
  experience: [
    {
      position: "Senior Product Designer",
      company: "DesignSphere",
      period: "2021 - Present",
      description:
        "Leading design initiatives for enterprise clients and mentoring junior designers. Building DeFi dashboards and NFT marketplace interfaces.",
    },
    {
      position: "UI Developer",
      company: "TechFront",
      period: "2018 - 2021",
      description:
        "Built component libraries and implemented design systems across multiple products. Created interfaces for blockchain data visualization tools.",
    },
    {
      position: "Web3 Consultant",
      company: "Freelance",
      period: "2017 - 2018",
      description:
        "Consulted for early blockchain projects on UI/UX improvements. Designed and developed interfaces for ICO platforms and token dashboards.",
    },
  ],
  education: {
    degree: "B.S. in Computer Science",
    institution: "University of California",
    year: "2018",
    focus: "Blockchain Technology & Distributed Systems",
  },
  links: {
    github: "github.com/alexmorgan",
    twitter: "twitter.com/alexmorgan",
    linkedin: "linkedin.com/in/alexmorgan",
    email: "alex@example.com",
    resume: "/resume.pdf",
    website: "alexmorgan.design",
    solana: "alexmorgan.sol",
    gitcoin: "gitcoin.co/alexmorgan",
  },
  dao: {
    memberships: [
      { name: "BuilderDAO", role: "Core Contributor", joined: "Aug 2022" },
      { name: "Gitcoin DAO", role: "Member", joined: "Mar 2023" },
      { name: "Developer DAO", role: "Contributor", joined: "Jan 2022" },
    ],
    contributions: 14,
    governance: {
      proposals: 3,
      votes: 27,
    },
  },
  skills: [
    {
      category: "Design",
      items: [
        "UI/UX",
        "Design Systems",
        "User Research",
        "Wireframing",
        "Prototyping",
        "Figma",
        "Adobe XD",
        "User Testing",
      ],
    },
    {
      category: "Development",
      items: [
        "React",
        "TypeScript",
        "Next.js",
        "TailwindCSS",
        "Node.js",
        "GraphQL",
        "Frontend Architecture",
        "Responsive Design",
        "CSS-in-JS",
      ],
    },
    {
      category: "Web3",
      items: [
        "Solana",
        "Anchor",
        "Smart Contracts",
        "Rust",
        "SPL Tokens",
        "web3.js",
        "IPFS",
        "NFT Standards",
        "Phantom Wallet",
        "Solnet",
      ],
    },
    {
      category: "Tools",
      items: [
        "Git",
        "VS Code",
        "Storybook",
        "Jest",
        "Netlify",
        "Vercel",
        "GitHub Actions",
        "Jira",
        "Notion",
      ],
    },
  ],
  projects: [
    {
      title: "DeFi Dashboard",
      description:
        "A comprehensive dashboard for DeFi users to track their portfolio, yield farming, and liquidity positions across multiple blockchains. Features real-time data and interactive visualizations.",
      bgColor: "from-purple-400/20 to-blue-500/20",
      icon: "📊",
      tags: ["DeFi", "React", "Web3", "Multi-chain"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2940",
      category: "web3",
      metrics: {
        users: "12K+",
        tvl: "$4.2M",
        chains: 5,
      },
    },
    {
      title: "NFT Marketplace",
      description:
        "A marketplace for digital artists to mint, sell, and trade NFTs with focus on user experience and accessibility. Supports multiple payment methods and cross-chain functionality.",
      bgColor: "from-fuchsia-400/20 to-purple-500/20",
      icon: "🖼️",
      tags: ["NFT", "Marketplace", "ERC-721", "UX Design"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1643101807431-2e2e79946cf9?q=80&w=2832",
      category: "web3",
      metrics: {
        collections: "450+",
        volume: "$15.3M",
        artists: "1.2K",
      },
    },
    {
      title: "Design System Framework",
      description:
        "A cohesive system of components, guidelines, and tools for product teams. Implemented across 5 different product lines with 30% improvement in design-to-development handoff efficiency.",
      bgColor: "from-indigo-400/20 to-blue-600/20",
      icon: "✨",
      tags: ["Design Systems", "React", "Documentation", "Accessibility"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064",
      category: "projects",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Data visualization interface with customizable widgets and real-time updates. Used by marketing teams to track campaign performance with custom reporting features.",
      bgColor: "from-indigo-400/20 to-purple-600/20",
      icon: "📊",
      tags: ["Dashboard", "Data Viz", "React", "State Management"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=2070",
      category: "projects",
    },
    {
      title: "Mobile App Redesign",
      description:
        "Complete UX overhaul of a fintech mobile application. Resulted in 45% increase in user engagement and 25% reduction in support tickets related to usability issues.",
      bgColor: "from-fuchsia-400/20 to-purple-400/20",
      icon: "📱",
      tags: ["Mobile", "UX Design", "Fintech", "React Native"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1621111848501-8d3634f82336?q=80&w=1965",
      category: "projects",
    },
    {
      title: "Solana DAO Governance Portal",
      description:
        "A governance platform for Solana-based DAOs to create proposals, vote, and execute decisions on-chain. Features include SPL token voting, Realms integration, and comprehensive analytics.",
      bgColor: "from-purple-400/20 to-fuchsia-500/20",
      icon: "🏛️",
      tags: ["DAO", "Governance", "Solana", "Realms", "React"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=2832",
      category: "web3",
      metrics: {
        daos: "35+",
        proposals: "1.2K",
        voters: "18K+",
      },
    },
    {
      title: "Open Source Design Library",
      description:
        "Contributed UI components and documentation to a popular open source design system. Added accessible form components and dark mode support.",
      bgColor: "from-emerald-400/20 to-green-500/20",
      icon: "🧩",
      tags: ["Open Source", "Accessibility", "Documentation"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070",
      category: "contributions",
    },
    {
      title: "Healthcare Portal",
      description:
        "Led frontend development for a healthcare provider's patient portal. Implemented secure authentication and real-time appointment scheduling.",
      bgColor: "from-blue-400/20 to-cyan-500/20",
      icon: "🏥",
      tags: ["Healthcare", "Security", "UX Research"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070",
      category: "projects",
    },
    {
      title: "Solana Program Auditor",
      description:
        "A specialized tool for developers to scan Solana programs for vulnerabilities and security best practices. Integrated with popular IDEs and supports Anchor framework.",
      bgColor: "from-purple-400/20 to-blue-500/20",
      icon: "🛡️",
      tags: ["Security", "Solana Programs", "Rust", "Anchor", "Auditing"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1639376883629-9092c8c9a7a2?q=80&w=2940",
      category: "web3",
      metrics: {
        audits: "2.5K+",
        bugs: "320+",
        savings: "$9M+",
      },
    },
    {
      title: "AI Assistant Hackathon",
      description:
        "48-hour hackathon project creating a voice-controlled design assistant. Won first place for innovation and technical execution.",
      bgColor: "from-orange-400/20 to-amber-500/20",
      icon: "🤖",
      tags: ["Hackathon", "AI", "Voice UI", "Rapid Prototyping"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070",
      category: "hackathons",
    },
    {
      title: "Climate Change Datathon",
      description:
        "Created interactive visualizations for climate data during a weekend datathon. Developed a tool to show environmental impact of daily choices.",
      bgColor: "from-green-400/20 to-emerald-500/20",
      icon: "🌍",
      tags: ["Hackathon", "Data Science", "Climate", "D3.js"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2070",
      category: "hackathons",
    },
  ],
  testimonials: [
    {
      text: "Alex's work on our Solana NFT marketplace UI was transformative. The improved user experience and Phantom wallet integration led to a 40% increase in conversion rates.",
      author: "Elena Kim",
      role: "CTO, Solana NFT Protocol",
      avatar: "https://github.com/shadcn.png",
    },
    {
      text: "Working with Alex on our Solana DAO governance interface was incredible. They have a unique ability to make complex blockchain interactions feel simple and intuitive.",
      author: "Marcus Chen",
      role: "Lead Developer, SolanaDAO",
      avatar: "https://github.com/shadcn.png",
    },
  ],
  achievements: [
    {
      title: "Solana Foundation Grant Recipient",
      description: "Received funding for open-source Solana developer tools",
      date: "Dec 2023",
      icon: "🏆",
    },
    {
      title: "Solana Breakpoint Finalist",
      description: "Top 5 project for Solana wallet integration",
      date: "Oct 2023",
      icon: "🥇",
    },
    {
      title: "Solana Hackathon Winner",
      description: "Best UX for DeFi application on Solana",
      date: "Jun 2023",
      icon: "🏅",
    },
  ],
};

export default function ImprovedProfilePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [projectCategory, setProjectCategory] = useState("web3");
  const [showWalletDetails, setShowWalletDetails] = useState(false);
  const [walletConnected, setWalletConnected] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for the sticky header
  useEffect(() => {
    setMounted(true);

    // Create IntersectionObserver to track which section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -300px 0px", // Adjust for better section detection
        threshold: 0.3, // Trigger when 30% of the element is visible
      }
    );

    // Observe each section
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  if (!mounted) return null;

  // Filter projects based on selected category
  const filteredProjects = profile.projects.filter(
    (project) => project.category === projectCategory
  );

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
      },
    },
  };

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {" "}
      {/* Enhanced background gradient effect with stronger Solana purple theme */}{" "}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[130px]" />
        <div className="absolute top-[60%] left-[30%] w-[350px] h-[350px] bg-indigo-400/10 rounded-full blur-[100px]" />
      </div>
      {/* Subtle grid overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />
      {/* Sticky header with wallet connection */}
      <div
        ref={headerRef}
        className="sticky top-0 z-30 backdrop-blur-md bg-black/10 border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Avatar className="h-9 w-9 border border-white/10">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-sm">{profile.name}</h2>{" "}
              <p className="text-xs text-white/60">
                {profile.handle}{" "}
                {profile.links.solana && (
                  <span className="text-purple-300">
                    ({profile.links.solana})
                  </span>
                )}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <Button
              variant={walletConnected ? "outline" : "default"}
              size="sm"
              className={cn(
                "flex items-center gap-2 border-white/10 text-sm",
                walletConnected
                  ? "bg-white/5 hover:bg-white/10 text-white"
                  : "bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600"
              )}
              onClick={() =>
                walletConnected && setShowWalletDetails(!showWalletDetails)
              }
            >
              <Wallet className="h-3.5 w-3.5" />
              {walletConnected ? walletData.shortAddress : "Connect Wallet"}
              {walletConnected && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </Button>

            {/* Wallet details dropdown */}
            <AnimatePresence>
              {showWalletDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 rounded-xl backdrop-blur-md bg-black/30 border border-white/10 shadow-xl z-50"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-sm">Wallet</span>
                      <Badge className="bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 text-emerald-300 border-emerald-500/30">
                        Connected
                      </Badge>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3 mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/70 text-sm">Address</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono bg-white/10 py-1 px-2 rounded">
                            {walletData.address.slice(0, 8)}...
                            {walletData.address.slice(-6)}
                          </span>
                          <button className="text-white/60 hover:text-white/90 transition-colors">
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">Network</span>
                        <span className="text-xs bg-white/10 py-1 px-2 rounded flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                          {walletData.network}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/90 font-medium">
                          Assets
                        </span>
                        <span className="text-xs text-white/60">
                          ≈ ${walletData.balance.usd.toLocaleString()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {walletData.tokens.map((token, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-white/5 rounded-md p-2 text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                                {token.symbol}
                              </div>
                              <span>
                                {token.amount.toFixed(2)} {token.symbol}
                              </span>
                            </div>
                            <div className="text-right">
                              <div>${token.value.toLocaleString()}</div>
                              <div
                                className={cn(
                                  "text-xs",
                                  token.change > 0
                                    ? "text-emerald-400"
                                    : token.change < 0
                                    ? "text-rose-400"
                                    : "text-white/60"
                                )}
                              >
                                {token.change > 0 ? "+" : ""}
                                {token.change}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
                      >
                        View on Explorer
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        className="w-full bg-rose-600 hover:bg-rose-700"
                        onClick={() => {
                          setWalletConnected(false);
                          setShowWalletDetails(false);
                        }}
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>{" "}
      {/* Main content container - responsive max-width for better spacing */}
      <div className="container max-w-7xl mx-auto px-4 py-12 sm:py-20">
        {" "}
        {/* About Section with improved layout structure */}
        <section id="about" className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main about information - wider on larger screens */}{" "}
            <div className="lg:col-span-8">
              <ProfileAbout
                profile={profile}
                activeSection={activeSection === "about"}
              />
              {/* Add horizontal experience section beneath about info with better spacing */}
              <div className="mt-8 mb-2">
                <ProfileExperienceHorizontal
                  experience={profile.experience}
                  activeSection={activeSection === "about"}
                />
              </div>
            </div>
            {/* Web3 identity card - takes 1/3 of space */}
            <div className="lg:col-span-4 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative overflow-hidden rounded-3xl backdrop-blur-md bg-white/[0.01] border border-white/10 shadow-[0_8px_32px_0_rgba(31,41,55,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 pointer-events-none" />

                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Hexagon className="h-5 w-5 text-blue-400" />
                    <h3 className="font-medium">Web3 Identity</h3>
                  </div>

                  {walletConnected ? (
                    <div className="space-y-4">
                      {/* ENS & Wallet */}
                      <div className="space-y-2">
                        {" "}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-white/70">
                            Solana Name
                          </div>{" "}
                          <div className="text-sm font-medium text-blue-300">
                            {profile.name.toLowerCase()}.sol
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-white/70">Solana</div>
                          <div className="text-sm font-mono text-white/80 bg-white/5 rounded px-2 py-0.5 ">
                            {walletData.address.slice(0, 6)}...
                            {walletData.address.slice(-4)}
                          </div>
                        </div>
                      </div>

                      {/* NFT Showcase */}
                      <div>
                        <h4 className="text-sm font-medium text-white/70 mb-2">
                          NFT Collection
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {walletData.nfts.map((nft, index) => (
                            <div
                              key={index}
                              className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                            >
                              <Image
                                src={nft.image}
                                alt={nft.name}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                                <div className="text-xs font-medium truncate">
                                  {nft.name}
                                </div>
                                <div className="text-[10px] text-white/70">
                                  {nft.collection}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          className="px-0 h-8 text-xs text-blue-300 mt-1"
                        >
                          View all NFTs
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>

                      {/* DAO Memberships */}
                      <div>
                        <h4 className="text-sm font-medium text-white/70 mb-2">
                          DAO Memberships
                        </h4>
                        <div className="space-y-2">
                          {profile.dao.memberships.map((dao, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-white/5 rounded-md p-2 text-sm"
                            >
                              <span>{dao.name}</span>
                              <Badge
                                variant="outline"
                                className="text-xs font-normal border-white/10 bg-white/5"
                              >
                                {dao.role}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-3 text-xs text-white/60">
                          <div>
                            Governance votes: {profile.dao.governance.votes}
                          </div>
                          <div>
                            Proposals: {profile.dao.governance.proposals}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-white/60 mb-3 text-sm">
                        Connect your wallet to view your Web3 identity
                      </p>
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                        onClick={() => setWalletConnected(true)}
                      >
                        <Wallet className="h-4 w-4 mr-2" />
                        Connect Wallet
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>{" "}
              <div className="grid grid-cols-1 gap-4">
                {/* Removed ProfileExperience since we now use the horizontal version */}
                <ProfileEducation
                  education={profile.education}
                  activeSection={activeSection === "about"}
                />
              </div>
            </div>
          </div>{" "}
        </section>{" "}
        {/* Web3 Activity Section - with enhanced layout */}
        <section id="activity" className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold inline-block mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Solana Activity
              </span>
            </h2>
            <p className="text-white/60 max-w-3xl mb-8">
              Recent on-chain activity, contributions, and achievements on the
              Solana blockchain.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Activity Feed */}
              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
                <CardHeader className="bg-white/5 p-4 border-b border-white/5">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-400" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {web3Activity.map((activity, index) => (
                      <div
                        key={index}
                        className="border-b border-white/5 pb-3 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-white/5 p-1.5 rounded-full">
                            {activity.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">
                              {activity.title}
                            </h4>
                            <p className="text-white/60 text-xs">
                              {activity.project}
                            </p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-white/40 text-xs">
                                {activity.timestamp}
                              </span>
                              <Link
                                href={activity.url}
                                className="text-purple-300 hover:text-purple-200 text-xs flex items-center"
                              >
                                View <ExternalLink className="h-3 w-3 ml-1" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Metrics */}
              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
                <CardHeader className="bg-white/5 p-4 border-b border-white/5">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <BarChart4 className="h-4 w-4 text-blue-400" />
                    Project Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {filteredProjects
                      .filter((p) => p.category === "web3" && p.metrics)
                      .slice(0, 3)
                      .map((project, index) => (
                        <div
                          key={index}
                          className="border-b border-white/5 pb-3 last:border-0 last:pb-0"
                        >
                          <h4 className="font-medium text-sm mb-1">
                            {project.title}
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                            {project.metrics &&
                              Object.entries(project.metrics).map(
                                ([key, value], i) => (
                                  <div
                                    key={i}
                                    className="bg-white/5 rounded-md p-2 text-center"
                                  >
                                    <div className="text-sm font-medium">
                                      {value}
                                    </div>
                                    <div className="text-[10px] text-white/60 uppercase">
                                      {key}
                                    </div>
                                  </div>
                                )
                              )}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
                <CardHeader className="bg-white/5 p-4 border-b border-white/5">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {profile.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="border-b border-white/5 pb-3 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div>
                            <h4 className="font-medium text-sm">
                              {achievement.title}
                            </h4>
                            <p className="text-white/60 text-xs">
                              {achievement.description}
                            </p>
                            <div className="flex items-center mt-1">
                              <Clock className="h-3 w-3 text-white/40 mr-1" />
                              <span className="text-white/40 text-xs">
                                {achievement.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>{" "}
        {/* Skills Section - enhanced with more spacing */}
        <section id="skills" className="mb-28 py-4">
          <ProfileSkills
            skills={profile.skills}
            activeSection={activeSection === "skills"}
          />
        </section>{" "}
        {/* Projects Section with category tabs - enhanced spacing */}
        <section id="projects" className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold inline-block mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Projects & Contributions
              </span>
            </h2>
            <p className="mt-1 mb-6 text-white/60 max-w-3xl">
              A showcase of my work on Solana and other platforms, including
              blockchain projects, dApps, open source contributions, and
              hackathon innovations.
            </p>

            {/* Category tabs */}
            <Tabs
              defaultValue="web3"
              value={projectCategory}
              onValueChange={setProjectCategory}
              className="mb-6"
            >
              <TabsList className="bg-white/5 border border-white/10">
                <TabsTrigger
                  value="web3"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
                >
                  Web3 Projects
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
                >
                  Other Projects
                </TabsTrigger>
                <TabsTrigger
                  value="contributions"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
                >
                  Contributions
                </TabsTrigger>
                <TabsTrigger
                  value="hackathons"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
                >
                  Hackathons
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={projectCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileProjects
                projects={filteredProjects}
                activeSection={activeSection === "projects"}
                category={projectCategory}
              />
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-12 text-center"
            >
              <p className="text-white/70">
                No {projectCategory} to display at this time.
              </p>
            </motion.div>
          )}
        </section>{" "}
        {/* Testimonials Section with improved spacing */}
        <section id="testimonials" className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold inline-block mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Client Feedback
              </span>
            </h2>
            <p className="text-white/60 max-w-3xl mb-8">
              What partners and clients are saying about my Solana development
              expertise and UI/UX design work.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {profile.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={item}
                className="backdrop-blur-md bg-white/[0.01] border border-white/10 rounded-2xl overflow-hidden p-1"
              >
                <div className="bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 p-6 rounded-xl">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 relative">
                      <div className="absolute -top-2 -left-1 text-4xl text-white/10">
                        &quot;
                      </div>
                      <p className="text-white/80 relative z-10">
                        {testimonial.text}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.author}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500/30 to-fuchsia-500/30 text-white">
                          {testimonial.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">
                          {testimonial.author}
                        </p>
                        <p className="text-white/60 text-xs">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>{" "}
        {/* Contact Section - enhanced with better spacing */}
        <section id="contact" className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <div className="rounded-2xl backdrop-blur-md bg-white/[0.01] border border-white/10 overflow-hidden shadow-lg shadow-purple-900/10">
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="md:max-w-md mb-8 md:mb-0">
                    <h2 className="text-2xl font-bold mb-4">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                        Let&apos;s Build on Solana Together
                      </span>
                    </h2>
                    <p className="text-white/60 mb-5 text-lg">
                      I&apos;m currently available for Solana projects, dApp
                      development, UI/UX design, and blockchain consulting.
                      Let&apos;s create something amazing on Solana.
                    </p>
                    <div className="flex flex-col gap-2">
                      <a
                        href={`mailto:${profile.links.email}`}
                        className="flex items-center text-sm text-white/80 hover:text-white transition-colors"
                      >
                        <Mail className="h-4 w-4 mr-2 text-purple-400" />
                        {profile.links.email}
                      </a>
                      <a
                        href={`https://${profile.links.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-white/80 hover:text-white transition-colors"
                      >
                        <Globe className="h-4 w-4 mr-2 text-blue-400" />
                        {profile.links.website}
                      </a>
                      <a
                        href={`https://${profile.links.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-white/80 hover:text-white transition-colors"
                      >
                        <Github className="h-4 w-4 mr-2 text-white/70" />
                        {profile.links.github}
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Me
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-white/5 border-white/10 text-white"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Resume
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>{" "}
        {/* Subtle footer with Solana focus */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-white/50 pt-12 pb-6"
        >
          <p>
            © {new Date().getFullYear()} {profile.name} — Built with Next.js,
            TailwindCSS & Solana Integration
          </p>
        </motion.footer>
      </div>
      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-6">
          {[
            "about",
            "activity",
            "skills",
            "projects",
            "testimonials",
            "contact",
          ].map((section) => (
            <button
              key={section}
              onClick={() => {
                document.getElementById(section)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="group relative w-3 h-3"
              aria-label={`Navigate to ${section} section`}
            >
              <span
                className={cn(
                  "block w-2 h-2 rounded-full transition-all duration-300",
                  activeSection === section
                    ? "bg-purple-500 scale-150"
                    : "bg-white/30 group-hover:bg-white/70"
                )}
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-white text-xs capitalize whitespace-nowrap transition-opacity">
                {section}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
