"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Eye,
  Calendar,
  Clock,
  User,
  Star,
  Flame,
  ExternalLink,
  Bookmark,
  Heart,
  Share2,
  TrendingUp,
  Tag,
  Link,
  Clock8,
  Wallet as WalletIcon,
  Sparkles,
  Shield,
  Check,
  ChevronRight,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock wallet state
const mockWallet = {
  connected: true,
  address: "CZfY8C7v2c8ifVP5sMjqh5m3uKqPJYZXeUReTMYZz2sT",
  shortAddress: "CZfY...z2sT",
  balance: 42.67,
};

// Mock forum data - posts
const forumPosts = [
  {
    id: 1,
    title: "Understanding Solana's Proof of History (PoH) consensus mechanism",
    content:
      "Proof of History is a sequence of computation that can provide a way to cryptographically verify passage of time between two events. It uses a cryptographically secure function... (full content)",
    authorName: "0xSolDev",
    authorWallet: "B7eT...xF9q",
    authorAvatar: "https://github.com/shadcn.png",
    verified: true,
    publishedAt: "2 hours ago",
    category: "Technical",
    tags: ["Consensus", "PoH", "Architecture"],
    views: 342,
    upvotes: 89,
    downvotes: 3,
    comments: 24,
    trending: true,
    pinned: false,
    highlighted: true,
  },
  {
    id: 2,
    title: "Just deployed my first dApp on Solana! Here's what I learned...",
    content:
      "After months of learning and building, I've finally deployed my first decentralized application on Solana. The experience was both challenging and rewarding... (full content)",
    authorName: "CryptoNoob23",
    authorWallet: "Aqrt...m2Kt",
    authorAvatar: "https://github.com/shadcn.png",
    verified: false,
    publishedAt: "Yesterday",
    category: "Development",
    tags: ["dApp", "Web3", "Developer Story"],
    views: 523,
    upvotes: 131,
    downvotes: 5,
    comments: 47,
    trending: true,
    pinned: false,
    highlighted: false,
  },
  {
    id: 3,
    title: "Solana's Position in the Multi-Chain Future: Analysis",
    content:
      "The blockchain ecosystem is rapidly evolving toward a multi-chain future where different blockchains serve different purposes and users. In this landscape, Solana has positioned itself as... (full content)",
    authorName: "ChainAnalyst",
    authorWallet: "DeFt...sK9w",
    authorAvatar: "https://github.com/shadcn.png",
    verified: true,
    publishedAt: "3 days ago",
    category: "Analysis",
    tags: ["Multi-chain", "Ecosystem", "Future"],
    views: 1205,
    upvotes: 276,
    downvotes: 18,
    comments: 93,
    trending: false,
    pinned: true,
    highlighted: false,
  },
  {
    id: 4,
    title: "NEW Official Dev Update from Solana Labs - May 2025",
    content:
      "The Solana Labs team has released their monthly development update highlighting recent improvements, upcoming features, and addressing community concerns... (full content)",
    authorName: "SolanaOfficial",
    authorWallet: "Sol4...ffic",
    authorAvatar: "https://github.com/shadcn.png",
    verified: true,
    publishedAt: "1 week ago",
    category: "News",
    tags: ["Official", "Update", "Development"],
    views: 4378,
    upvotes: 892,
    downvotes: 14,
    comments: 156,
    trending: false,
    pinned: true,
    highlighted: true,
  },
  {
    id: 5,
    title:
      "Implemented NFT Marketplace with SPL Token Support - Code Review Needed",
    content:
      "I've been working on a decentralized NFT marketplace that supports Solana SPL tokens for transactions. Looking for experienced devs to review my code and suggest optimizations... (full content)",
    authorName: "DevSolGirl",
    authorWallet: "J9kP...rT7z",
    authorAvatar: "https://github.com/shadcn.png",
    verified: false,
    publishedAt: "3 days ago",
    category: "Development",
    tags: ["NFT", "Marketplace", "SPL Tokens", "Code Review"],
    views: 347,
    upvotes: 42,
    downvotes: 2,
    comments: 28,
    trending: false,
    pinned: false,
    highlighted: false,
  },
  {
    id: 6,
    title: "Tokenomics 101: Understanding Solana's SOL Token",
    content:
      "In this post, I'll break down Solana's token economics, including inflation schedule, staking rewards, and how the network maintains economic stability... (full content)",
    authorName: "TokenEconomist",
    authorWallet: "VeR3...nM5s",
    authorAvatar: "https://github.com/shadcn.png",
    verified: true,
    publishedAt: "1 week ago",
    category: "Economics",
    tags: ["Tokenomics", "SOL", "Economics"],
    views: 2891,
    upvotes: 604,
    downvotes: 27,
    comments: 89,
    trending: true,
    pinned: false,
    highlighted: false,
  },
  {
    id: 7,
    title: "Security Best Practices for Solana Smart Contract Developers",
    content:
      "With the growing adoption of Solana, security becomes increasingly important. In this post, I'll cover common vulnerabilities and best practices for securing your smart contracts... (full content)",
    authorName: "SecureWeb3",
    authorWallet: "SeC8...u5Ty",
    authorAvatar: "https://github.com/shadcn.png",
    verified: true,
    publishedAt: "2 weeks ago",
    category: "Security",
    tags: ["Security", "Smart Contracts", "Best Practices"],
    views: 1876,
    upvotes: 435,
    downvotes: 8,
    comments: 72,
    trending: false,
    pinned: false,
    highlighted: true,
  },
];

// Mock forum categories
const categories = [
  { name: "All", count: 487, icon: <Hash className="h-4 w-4" /> },
  { name: "Technical", count: 123, icon: <Code className="h-4 w-4" /> },
  { name: "Development", count: 98, icon: <Terminal className="h-4 w-4" /> },
  { name: "Analysis", count: 64, icon: <BarChart className="h-4 w-4" /> },
  { name: "News", count: 82, icon: <Newspaper className="h-4 w-4" /> },
  { name: "Economics", count: 44, icon: <DollarSign className="h-4 w-4" /> },
  { name: "Security", count: 39, icon: <Shield className="h-4 w-4" /> },
  { name: "Governance", count: 29, icon: <FileText className="h-4 w-4" /> },
  {
    name: "Help & Support",
    count: 43,
    icon: <HelpCircle className="h-4 w-4" />,
  },
];

// Mock trending topics
const trendingTopics = [
  { name: "Solana Pay", posts: 234 },
  { name: "Mobile SDK", posts: 187 },
  { name: "zk-Proofs", posts: 156 },
  { name: "NFT Standards", posts: 134 },
  { name: "Transaction Fees", posts: 123 },
];

// Missing imports from lucide-react
function Code(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}

function Terminal(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  );
}

function BarChart(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="20" x2="12" y2="10"></line>
      <line x1="18" y1="20" x2="18" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>
  );
}

function Newspaper(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
      <path d="M18 14h-8"></path>
      <path d="M15 18h-5"></path>
      <path d="M10 6h8v4h-8V6Z"></path>
    </svg>
  );
}

function DollarSign(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="2" x2="12" y2="22"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}

function FileText(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <line x1="10" y1="9" x2="8" y2="9"></line>
    </svg>
  );
}

function HelpCircle(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <path d="M12 17h.01"></path>
    </svg>
  );
}

export default function SolanaForumPage() {
  const [activeTab, setActiveTab] = useState("trending");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [walletVisible, setWalletVisible] = useState(false);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90 } },
  };

  // Filter posts based on active category and search query
  const filteredPosts = forumPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (activeTab === "trending") {
      // Sort by trending status first, then by upvotes
      if (a.trending !== b.trending) return a.trending ? -1 : 1;
      return b.upvotes - a.upvotes;
    } else if (activeTab === "newest") {
      // Sort by published date (mock sorting since we have string dates)
      // In a real app, we would use actual timestamps
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      if (a.publishedAt === "2 hours ago" || b.publishedAt === "2 hours ago")
        return a.publishedAt === "2 hours ago" ? -1 : 1;
      if (a.publishedAt === "Yesterday" || b.publishedAt === "Yesterday")
        return a.publishedAt === "Yesterday" ? -1 : 1;
      return -1; // Fallback
    } else if (activeTab === "top") {
      // Sort by upvotes
      return b.upvotes - a.upvotes;
    }
    return 0;
  });

  // Get selected post details
  const selectedPostData = forumPosts.find((p) => p.id === selectedPost);

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Background gradient effect */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[150px] animate-pulse-slower" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[130px] animate-pulse-medium" />
        <div className="absolute top-[60%] left-[30%] w-[350px] h-[350px] bg-indigo-400/10 rounded-full blur-[100px] animate-pulse-slow" />
      </div>
      {/* Subtle grid overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Main content container */}
      <div className="container max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex justify-between items-center mb-8">
          {/* Forum Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-orange-400 p-2 rounded-full">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  Solana Forums
                </h1>
                <p className="text-white/60">
                  Discuss, learn and contribute to the Solana ecosystem
                </p>
              </div>
            </div>
          </motion.div>

          {/* Wallet button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <Button
                variant={mockWallet.connected ? "outline" : "default"}
                className={cn(
                  "flex items-center gap-2 border-white/10",
                  mockWallet.connected
                    ? "bg-white/5 hover:bg-white/10 text-white"
                    : "bg-gradient-to-r from-purple-500 to-orange-400 hover:from-purple-600 hover:to-orange-500"
                )}
                onClick={() => setWalletVisible(!walletVisible)}
              >
                <WalletIcon className="h-4 w-4" />
                {mockWallet.connected
                  ? mockWallet.shortAddress
                  : "Connect Wallet"}
              </Button>

              {/* Wallet popup */}
              <AnimatePresence>
                {walletVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-72 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/10 shadow-xl z-50"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-medium">Wallet</span>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                          Connected
                        </Badge>
                      </div>

                      <div className="bg-white/5 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">Address</span>
                          <span className="text-xs font-mono bg-white/10 py-1 px-2 rounded">
                            {mockWallet.address.slice(0, 12)}...
                            {mockWallet.address.slice(-4)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-white/70">Balance</span>
                          <div className="flex items-center">
                            <div className="h-4 w-4 mr-1 rounded-full bg-gradient-to-r from-purple-500 to-orange-400" />
                            <span>{mockWallet.balance} SOL</span>
                          </div>
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
                          onClick={() => setWalletVisible(false)}
                        >
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Categories */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 sticky top-4">
              <CardHeader className="bg-white/5 p-4 border-b border-white/5">
                <CardTitle className="text-lg font-medium">
                  Categories
                </CardTitle>
              </CardHeader>

              <CardContent className="p-2">
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className={cn(
                        "w-full flex items-center justify-between p-2.5 rounded-lg text-left text-sm",
                        activeCategory === category.name
                          ? "bg-white/10 text-white"
                          : "text-white/70 hover:bg-white/5"
                      )}
                      onClick={() => setActiveCategory(category.name)}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "p-1.5 rounded-md",
                            activeCategory === category.name
                              ? "bg-white/10"
                              : "bg-white/5"
                          )}
                        >
                          {category.icon}
                        </div>
                        <span>{category.name}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-white/5 border-white/10 text-white/60 ml-2"
                      >
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>

              <div className="p-4 border-t border-white/5">
                <h4 className="text-sm font-medium mb-3 text-white/70">
                  Trending Topics
                </h4>
                <div className="space-y-2">
                  {trendingTopics.map((topic) => (
                    <div
                      key={topic.name}
                      className="flex items-center justify-between text-sm py-1.5 px-2 rounded-md hover:bg-white/5 cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-orange-400 opacity-80">#</span>
                        <span>{topic.name}</span>
                      </div>
                      <span className="text-white/50 text-xs">
                        {topic.posts}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Main Content - Forum Posts */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Search and Filter */}
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden mb-4">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <div className="flex-1">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input
                        placeholder="Search posts..."
                        className="bg-white/5 border-white/10 pl-10 text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/10 text-white"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-500 to-orange-400 hover:from-purple-600 hover:to-orange-500">
                      New Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts List */}
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
              <Tabs
                defaultValue="trending"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <CardContent className="p-0 pt-0">
                  <TabsList className="bg-white/[0.01] border-b border-white/5 w-full justify-start rounded-none p-0">
                    <TabsTrigger
                      value="trending"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-white/5 data-[state=active]:text-white py-3 px-4 text-white/70"
                    >
                      <Flame className="h-4 w-4 mr-2" />
                      Trending
                    </TabsTrigger>
                    <TabsTrigger
                      value="newest"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-white/5 data-[state=active]:text-white py-3 px-4 text-white/70"
                    >
                      <Clock8 className="h-4 w-4 mr-2" />
                      Latest
                    </TabsTrigger>
                    <TabsTrigger
                      value="top"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-white/5 data-[state=active]:text-white py-3 px-4 text-white/70"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Top
                    </TabsTrigger>
                  </TabsList>
                </CardContent>

                <TabsContent value={activeTab} className="m-0 p-0">
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {sortedPosts.length === 0 && (
                      <div className="p-6 text-center text-white/60">
                        No posts found matching your criteria
                      </div>
                    )}

                    <AnimatePresence>
                      {sortedPosts.map((post) => (
                        <motion.div
                          key={post.id}
                          variants={item}
                          onClick={() =>
                            setSelectedPost(
                              post.id === selectedPost ? null : post.id
                            )
                          }
                          className={cn(
                            "border-b border-white/5 hover:bg-white/[0.03] cursor-pointer transition-colors",
                            post.id === selectedPost ? "bg-white/5" : "",
                            post.pinned ? "border-l-2 border-l-orange-500" : "",
                            post.highlighted
                              ? "bg-gradient-to-r from-purple-500/5 to-transparent"
                              : ""
                          )}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="p-4">
                            <div className="flex items-start gap-3">
                              {/* Voting */}
                              <div className="hidden sm:flex flex-col items-center space-y-1 pt-1">
                                <button className="p-1 rounded hover:bg-white/10 text-white/70">
                                  <ArrowUp className="h-5 w-5" />
                                </button>
                                <span className="text-sm font-medium">
                                  {post.upvotes - post.downvotes}
                                </span>
                                <button className="p-1 rounded hover:bg-white/10 text-white/70">
                                  <ArrowDown className="h-5 w-5" />
                                </button>
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <Badge
                                    className={cn(
                                      "px-1.5 text-xs",
                                      post.category === "Technical"
                                        ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                        : post.category === "Development"
                                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                        : post.category === "Analysis" ||
                                          post.category === "Economics"
                                        ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                                        : post.category === "News"
                                        ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                        : post.category === "Security"
                                        ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                                        : "bg-white/10 text-white/70 border-white/20"
                                    )}
                                  >
                                    {post.category}
                                  </Badge>

                                  {post.trending && (
                                    <Badge className="bg-gradient-to-r from-orange-500/30 to-red-500/30 text-orange-200 border-orange-500/30">
                                      <TrendingUp className="h-3 w-3 mr-1" />
                                      Trending
                                    </Badge>
                                  )}

                                  {post.pinned && (
                                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                                      Pinned
                                    </Badge>
                                  )}
                                </div>

                                <h3 className="text-lg font-medium text-white hover:text-purple-200 transition-colors">
                                  {post.title}
                                </h3>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-white/60">
                                  <div className="flex items-center">
                                    <Avatar className="h-5 w-5 mr-1.5">
                                      <AvatarImage
                                        src={post.authorAvatar}
                                        alt={post.authorName}
                                      />
                                      <AvatarFallback className="text-xs">
                                        {post.authorName.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="flex items-center">
                                      {post.authorName}
                                      {post.verified && (
                                        <Check className="h-3 w-3 text-emerald-400 ml-1" />
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-3.5 w-3.5 mr-1" />
                                    <span>{post.publishedAt}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <MessageSquare className="h-3.5 w-3.5 mr-1" />
                                    <span>{post.comments} comments</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Eye className="h-3.5 w-3.5 mr-1" />
                                    <span>{post.views} views</span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-3">
                                  {post.tags.map((tag) => (
                                    <div
                                      key={tag}
                                      className="flex items-center text-xs py-0.5 px-1.5 rounded bg-white/5 hover:bg-white/10 text-white/70 transition-colors cursor-pointer"
                                    >
                                      <span className="text-orange-400 mr-0.5">
                                        #
                                      </span>
                                      {tag}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Expanded post content */}
                          <AnimatePresence>
                            {post.id === selectedPost && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 pt-0 pl-16">
                                  <div className="bg-white/5 rounded-xl p-4 mb-3">
                                    <p className="text-white/80">
                                      {post.content}
                                    </p>
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white/70 hover:text-white hover:bg-white/10"
                                      >
                                        <Heart className="h-4 w-4 mr-1.5" />
                                        Like
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white/70 hover:text-white hover:bg-white/10"
                                      >
                                        <MessageSquare className="h-4 w-4 mr-1.5" />
                                        Reply
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white/70 hover:text-white hover:bg-white/10"
                                      >
                                        <Bookmark className="h-4 w-4 mr-1.5" />
                                        Save
                                      </Button>
                                    </div>

                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-white/70 hover:text-white hover:bg-white/10"
                                    >
                                      <Share2 className="h-4 w-4 mr-1.5" />
                                      Share
                                    </Button>
                                  </div>

                                  {/* New reply form */}
                                  <div className="mt-4 space-y-3">
                                    <Textarea
                                      placeholder="Write a reply..."
                                      className="bg-white/5 border-white/10 min-h-[80px] text-white placeholder:text-white/40"
                                    />
                                    <div className="flex justify-end">
                                      <Button className="bg-gradient-to-r from-purple-500 to-orange-400 hover:from-purple-600 hover:to-orange-500">
                                        Post Reply
                                      </Button>
                                    </div>
                                  </div>

                                  {/* View more comments */}
                                  <div className="mt-6 text-center">
                                    <Button
                                      variant="outline"
                                      className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                                    >
                                      View All {post.comments} Comments
                                      <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </TabsContent>
              </Tabs>

              <CardFooter className="p-4 border-t border-white/5">
                <div className="w-full flex justify-between items-center text-sm text-white/60">
                  <div>Showing {sortedPosts.length} posts</div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="bg-white/5 border-white/10 text-white"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/10 text-white"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Web3 Connection Status Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6"
            >
              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20">
                        <WalletIcon className="h-5 w-5 text-purple-300" />
                      </div>
                      <div>
                        <p className="text-sm text-white/80 font-medium">
                          Web3 Integration Active
                        </p>
                        <p className="text-xs text-white/60">
                          Connected to Solana{" "}
                          {mockWallet.connected ? "Mainnet" : "Testnet"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-xs text-white/60">
                            Network Status
                          </span>
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <Progress value={98} className="h-1.5 w-32 bg-white/10">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
                        </Progress>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/70 hover:bg-white/5 hover:text-white"
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                        Explorer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
