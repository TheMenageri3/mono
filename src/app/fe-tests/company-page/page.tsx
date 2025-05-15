"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import {
  Building,
  Globe,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  ChevronDown,
  ExternalLink,
  Package,
  CheckCircle,
  Phone,
  Mail,
  Briefcase,
  ArrowRight,
  Star,
  Clock,
  FileText,
  Shield,
  Settings,
  Zap,
  Award,
  UserPlus,
  ChevronRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock company data that would normally come from an API call
const companyData = {
  id: "1",
  name: "BlockChain Dynamics",
  description:
    "We specialize in developing scalable blockchain solutions for enterprises and startups, focusing on security, performance, and user experience. Our team combines technical expertise with business acumen to deliver products that drive real-world adoption and value.",
  logoUrl: "/blockchain-logo.png",
  website: "https://blockchaindynamics.io",
  size: "MEDIUM",
  foundedYear: 2019,
  headquarters: "Austin, TX",
  locations: ["Austin, TX", "San Francisco, CA", "Boston, MA", "London, UK"],
  missionStatement:
    "To bridge the gap between traditional systems and blockchain technology, creating accessible solutions that power the future of finance, identity, and digital ownership.",
  benefits:
    "Competitive compensation packages, comprehensive health benefits, flexible remote work policy, continuous learning stipends, equity options, and regular team-building retreats.",
  culture:
    "Our culture encourages innovation, lifelong learning, and collaborative problem-solving. We maintain a flat organizational structure where ideas are valued based on merit rather than hierarchy.",
  industries: [
    "Blockchain",
    "Enterprise Software",
    "FinTech",
    "Web3",
    "Security",
  ],
  contacts: [
    {
      id: "c1",
      name: "Elena Rivera",
      title: "Chief Technology Officer",
      email: "elena@blockchaindynamics.io",
      phone: "+1 (512) 555-0123",
      avatar: "/avatar1.png",
    },
    {
      id: "c2",
      name: "Marcus Wei",
      title: "Head of Business Development",
      email: "marcus@blockchaindynamics.io",
      phone: "+1 (512) 555-0187",
      avatar: "/avatar2.png",
    },
    {
      id: "c3",
      name: "Sophia Johnson",
      title: "Product Lead",
      email: "sophia@blockchaindynamics.io",
      phone: "+1 (512) 555-0199",
      avatar: "/avatar3.png",
    },
  ],
  products: [
    {
      id: "p1",
      name: "ChainGuard",
      description:
        "Enterprise-grade security infrastructure for digital assets and smart contracts.",
      features: [
        "Multi-layer security architecture",
        "Real-time threat monitoring",
        "Customizable access controls",
        "Comprehensive audit trails",
        "Regulatory compliance tools",
      ],
      image: "/product1.png",
      metrics: {
        securityScore: "99.8%",
        uptime: "99.99%",
        clientSatisfaction: "4.9/5",
      },
    },
    {
      id: "p2",
      name: "DataBridge",
      description:
        "Middleware solution that seamlessly connects legacy systems with blockchain networks.",
      features: [
        "Universal API adapters",
        "Cross-chain compatibility",
        "Data validation frameworks",
        "Reliable transaction processing",
        "Custom integration support",
      ],
      image: "/product2.png",
      metrics: {
        integrations: "50+",
        transactions: "1M+ daily",
        latency: "<100ms",
      },
    },
    {
      id: "p3",
      name: "IdentityBloc",
      description:
        "Self-sovereign identity platform that gives users control over their personal data.",
      features: [
        "Decentralized credentials",
        "Privacy-preserving verification",
        "Cross-platform authentication",
        "Enterprise identity management",
        "Zero-knowledge proof integration",
      ],
      image: "/product3.png",
      metrics: {
        users: "2M+",
        verifications: "500K+ daily",
        partners: "120+ organizations",
      },
    },
  ],
  clients: [
    "Global Financial Corp",
    "TechInnovate Inc",
    "SecureID Systems",
    "FuturePay",
    "DataTrust Networks",
    "Enterprise Solutions LLC",
  ],
  stats: {
    projectsCompleted: 78,
    teamSize: 42,
    countriesServed: 12,
    satisfactionRate: 98,
  },
};

// Define custom animation keyframes
const customAnimations = `
  @keyframes slow-pulse {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  
  @keyframes slow-drift {
    0% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-20px) translateX(10px); }
    100% { transform: translateY(0) translateX(0); }
  }
  
  @keyframes slow-float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0); }
  }

  @keyframes slow-pulse-delay {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.08); }
  }

  @keyframes slow-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes reverse-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
  }

  .animate-slow-pulse {
    animation: slow-pulse 8s ease-in-out infinite;
  }

  .animate-slow-drift {
    animation: slow-drift 15s ease-in-out infinite;
  }

  .animate-slow-float {
    animation: slow-float 10s ease-in-out infinite;
  }

  .animate-slow-pulse-delay {
    animation: slow-pulse-delay 10s ease-in-out infinite;
  }

  .animate-slow-spin {
    animation: slow-spin 15s linear infinite;
  }

  .animate-reverse-spin {
    animation: reverse-spin 20s linear infinite;
  }
`;

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSection, setActiveSection] = useState("header");
  const [mounted, setMounted] = useState(false);

  // Effect for setting up intersection observer for sections
  useEffect(() => {
    setMounted(true);

    // Set up intersection observer to track active sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    // Observe sections
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Include custom animations */}
      <style jsx global>
        {customAnimations}
      </style>
      {/* Enhanced background gradient effect with more dynamic colors and positions */}
      <div className="fixed inset-0 z-[-2] overflow-hidden">
        <div className="absolute top-[-5%] left-[5%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[130px] animate-slow-pulse" />
        <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[130px] animate-slow-drift" />
        <div className="absolute top-[30%] right-[15%] w-[400px] h-[400px] bg-fuchsia-600/25 rounded-full blur-[110px] animate-slow-float" />
        <div className="absolute bottom-[20%] left-[25%] w-[350px] h-[350px] bg-blue-600/15 rounded-full blur-[120px] animate-slow-pulse-delay" />
      </div>
      {/* Improved grid overlay with dynamic pattern */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.02] z-[-1]" />
      {/* Subtle noise texture for depth */}
      <div
        className="fixed inset-0 bg-black/40 mix-blend-overlay z-[-1] opacity-[0.03]"
        style={{
          maskImage:
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+CjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIiAvPgo8ZmVCbGVuZCBtb2RlPSJtdWx0aXBseSIgaW49InR1cmJ1bGVuY2UiIC8+CjwvZmlsdGVyPgo8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIxIiAvPjwvc3ZnPg==')",
        }}
      />
      <div className="container max-w-6xl mx-auto py-16 px-4 sm:px-6">
        {/* Company header - enhanced with better animation sequence and improved layout */}
        <section id="header" className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden rounded-3xl backdrop-blur-md bg-white/[0.01] border border-white/10 shadow-[0_8px_32px_0_rgba(91,38,135,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 pointer-events-none" />

            <div className="relative z-10 p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                {/* Enhanced company logo/avatar with better glow effect and animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 opacity-75 blur-lg group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 opacity-0 blur-xl group-hover:opacity-40 transition-opacity duration-500 animate-slow-spin" />

                  <Avatar className="h-36 w-36 border-2 border-white/20 relative shadow-lg">
                    <AvatarImage
                      src="/company-logo.png"
                      alt={companyData.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 text-3xl font-bold">
                      {companyData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-center lg:text-left flex-1"
                >
                  {/* Company name with gradient text */}
                  <h1 className="text-5xl font-bold mb-3 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white">
                      {companyData.name}
                    </span>
                  </h1>

                  {/* Enhanced industry badges with better visual treatment */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                    {companyData.industries.map((industry, idx) => (
                      <Badge
                        key={industry}
                        variant="outline"
                        className={cn(
                          "bg-white/5 hover:bg-white/10 text-white/90 border-white/10 transition-colors px-3 py-1 text-sm backdrop-blur-sm shadow-sm",
                          idx === 0 &&
                            "bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border-purple-500/30"
                        )}
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>

                  {/* Company details with enhanced visual treatment */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/70 justify-center lg:justify-start mb-6">
                    {companyData.website && (
                      <motion.a
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        href={companyData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-purple-400 transition-colors group"
                      >
                        <div className="p-1.5 rounded-full bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                          <Globe className="h-4 w-4" />
                        </div>
                        <span className="truncate">
                          {companyData.website.replace(/^https?:\/\//, "")}
                        </span>
                      </motion.a>
                    )}
                    {companyData.headquarters && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-2"
                      >
                        <div className="p-1.5 rounded-full bg-indigo-500/20">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <span>{companyData.headquarters}</span>
                      </motion.div>
                    )}
                    {companyData.foundedYear && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center gap-2"
                      >
                        <div className="p-1.5 rounded-full bg-blue-500/20">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <span>Founded {companyData.foundedYear}</span>
                      </motion.div>
                    )}
                    {companyData.size && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-center gap-2"
                      >
                        <div className="p-1.5 rounded-full bg-fuchsia-500/20">
                          <Users className="h-4 w-4" />
                        </div>
                        <span>
                          {companyData.size.charAt(0) +
                            companyData.size.slice(1).toLowerCase()}{" "}
                          Company
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Quick stats display */}
                  {/* <div className="hidden lg:flex gap-6 mb-4">
                    {Object.entries(companyData.stats).map(
                      ([key, value], idx) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + idx * 0.1 }}
                          key={key}
                          className="text-center py-2 px-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5"
                        >
                          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-white">
                            {typeof value === "number" && key.includes("Rate")
                              ? `${value}%`
                              : value}
                          </div>
                          <div className="text-xs text-white/60 uppercase tracking-wide mt-1">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())
                              .replace(/([a-z])([A-Z])/g, "$1 $2")}
                          </div>
                        </motion.div>
                      )
                    )}
                  </div> */}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex-shrink-0 space-y-3"
                >
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 border-0 text-white shadow-lg shadow-purple-900/20">
                    <MessageSquare className="mr-2 h-4 w-4" /> Contact
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white/90"
                  >
                    <Building className="mr-2 h-4 w-4" /> Company Profile
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Main content tabs - improved with better visual effects */}
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TabsList className="grid grid-cols-4 md:grid-cols-4 gap-1 mb-10 bg-black/20 backdrop-blur-lg border border-white/10 p-1 rounded-xl shadow-lg shadow-purple-900/5">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-purple-900/20 text-white/70 hover:text-white/90 transition-all"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-purple-900/20 text-white/70 hover:text-white/90 transition-all"
              >
                Products
              </TabsTrigger>
              <TabsTrigger
                value="contacts"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-purple-900/20 text-white/70 hover:text-white/90 transition-all"
              >
                Contacts
              </TabsTrigger>
              <TabsTrigger
                value="locations"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-purple-900/20 text-white/70 hover:text-white/90 transition-all"
              >
                Locations
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Main info */}
              <Card className="lg:col-span-2 relative overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-[0_8px_32px_0_rgba(91,38,135,0.15)] group hover:shadow-[0_8px_40px_0_rgba(91,38,135,0.25)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 pointer-events-none group-hover:opacity-75 transition-opacity duration-500" />

                {/* Radial gradient spotlight effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_80%)]"></div>

                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl flex items-center">
                    <Building className="mr-3 h-6 w-6 text-purple-400" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                      About {companyData.name}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-white/80 mb-8 leading-relaxed text-lg"
                  >
                    {companyData.description}
                  </motion.p>

                  {companyData.missionStatement && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="mb-8 relative"
                    >
                      <div className="absolute -left-3 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-fuchsia-500 rounded-full"></div>
                      <h3 className="text-xl font-medium mb-3 flex items-center">
                        <Zap className="mr-2 h-5 w-5 text-purple-400" />
                        Mission Statement
                      </h3>
                      <div className="pl-1 relative">
                        <p className="text-white/90 italic leading-relaxed text-lg pl-4 border-l border-purple-500/20">
                          "{companyData.missionStatement}"
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {companyData.culture && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <h3 className="text-xl font-medium mb-3 flex items-center">
                        <Users className="mr-2 h-5 w-5 text-purple-400" />
                        Company Culture
                      </h3>
                      <p className="text-white/80 leading-relaxed">
                        {companyData.culture}
                      </p>
                    </motion.div>
                  )}

                  {/* Client showcase */}
                  {companyData.clients && companyData.clients.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="mt-8 pt-6 border-t border-white/10"
                    >
                      <h3 className="text-md font-medium mb-4 text-white/70">
                        TRUSTED BY
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {companyData.clients.map((client) => (
                          <Badge
                            key={client}
                            className="bg-white/5 hover:bg-white/10 text-white/80 border-0 py-1.5 px-3"
                          >
                            {client}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              {/* Side info column */}
              <div className="space-y-6">
                {/* Company stats card */}
                <Card className="relative overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-[0_8px_32px_0_rgba(91,38,135,0.15)] hover:border-purple-500/30 transition-colors duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 pointer-events-none" />
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                      <Award className="mr-2 h-5 w-5 text-indigo-400" />
                      Company Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(companyData.stats).map(([key, value]) => (
                        <div
                          key={key}
                          className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-colors"
                        >
                          <div className="text-2xl font-bold text-white">
                            {typeof value === "number" && key.includes("Rate")
                              ? `${value}%`
                              : value}
                          </div>
                          <div className="text-xs text-white/60 uppercase tracking-wide mt-1">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())
                              .replace(/([a-z])([A-Z])/g, "$1 $2")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits card */}
                {companyData.benefits && (
                  <Card className="relative overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-[0_8px_32px_0_rgba(91,38,135,0.15)] hover:border-fuchsia-500/30 transition-colors duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-purple-500/5 pointer-events-none" />
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-lg">
                        <CheckCircle className="mr-2 h-5 w-5 text-fuchsia-400" />
                        Benefits & Perks
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="space-y-3">
                        {companyData.benefits.split(". ").map(
                          (benefit, idx) =>
                            benefit.trim() && (
                              <div key={idx} className="flex items-start">
                                <div className="mt-1 mr-2 p-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-400">
                                  <CheckCircle className="h-3.5 w-3.5" />
                                </div>
                                <p className="text-white/80">
                                  {benefit.trim().replace(/\.$/, "")}
                                </p>
                              </div>
                            )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Locations summary card */}
                <Card className="relative overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-[0_8px_32px_0_rgba(91,38,135,0.15)] hover:border-indigo-500/30 transition-colors duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/5 pointer-events-none" />
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                      <MapPin className="mr-2 h-5 w-5 text-indigo-400" />
                      Global Presence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-3">
                      {companyData.locations
                        .slice(0, 3)
                        .map((location, idx) => (
                          <div
                            key={location}
                            className="flex items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 mr-3"></div>
                            <span className="text-white/90">{location}</span>
                            {idx === 0 && (
                              <Badge className="ml-auto text-xs bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                                HQ
                              </Badge>
                            )}
                          </div>
                        ))}
                      {companyData.locations.length > 3 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 border-white/10 bg-white/5 hover:bg-white/10 text-white/90"
                          onClick={() => setActiveTab("locations")}
                        >
                          +{companyData.locations.length - 3} more locations
                          <ChevronRight className="ml-2 h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <section id="products" className="relative">
                {/* Hero section for products */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-center mb-10"
                >
                  <h2 className="text-3xl font-bold mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                      Our Product Suite
                    </span>
                  </h2>
                  <p className="text-lg text-white/70 max-w-3xl mx-auto">
                    Comprehensive blockchain solutions designed for security,
                    scalability, and seamless integration
                  </p>
                </motion.div>

                {/* Product cards with staggered animation */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.15 },
                    },
                  }}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {companyData.products.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: "spring",
                            stiffness: 70,
                            damping: 20,
                          },
                        },
                      }}
                    >
                      <Card className="h-full relative overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-[0_8px_32px_0_rgba(91,38,135,0.15)] group hover:shadow-[0_8px_40px_0_rgba(91,38,135,0.25)] hover:border-purple-500/30 transition-all duration-500">
                        {/* Background gradient with enhanced effects */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 pointer-events-none group-hover:opacity-75 transition-opacity duration-500" />

                        {/* Subtle pattern background */}
                        <div
                          className="absolute inset-0 opacity-5"
                          style={{
                            backgroundImage: "url('/subtle-pattern.png')",
                          }}
                        />

                        {/* Radial gradient spotlight effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_30%,rgba(168,85,247,0.1),transparent_70%)]"></div>

                        {/* Product image with overlay */}
                        <div className="relative h-48 overflow-hidden bg-black/20">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
                          <div className="absolute inset-0 flex items-center justify-center text-white/30 text-lg">
                            Product Image ({product.name})
                          </div>
                        </div>

                        <CardHeader className="pb-2 relative z-10">
                          <CardTitle className="text-2xl font-bold">
                            <span
                              className={`bg-clip-text text-transparent ${
                                idx === 0
                                  ? "bg-gradient-to-r from-purple-200 to-white"
                                  : idx === 1
                                  ? "bg-gradient-to-r from-indigo-200 to-white"
                                  : "bg-gradient-to-r from-fuchsia-200 to-white"
                              }`}
                            >
                              {product.name}
                            </span>
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="relative z-10 pb-2">
                          <p className="text-white/80 mb-5 line-clamp-3">
                            {product.description}
                          </p>

                          {/* Features section */}
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2 flex items-center">
                              <CheckCircle
                                className={`h-4 w-4 ${
                                  idx === 0
                                    ? "text-purple-400"
                                    : idx === 1
                                    ? "text-indigo-400"
                                    : "text-fuchsia-400"
                                } mr-2`}
                              />
                              Key Features
                            </h4>
                            <ul className="space-y-1.5 pl-6">
                              {product.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <div
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      idx === 0
                                        ? "bg-purple-400"
                                        : idx === 1
                                        ? "bg-indigo-400"
                                        : "bg-fuchsia-400"
                                    } mr-2 mt-1.5 flex-shrink-0`}
                                  />
                                  <span className="text-sm text-white/80">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Metrics display */}
                          {product.metrics &&
                            Object.entries(product.metrics).length > 0 && (
                              <div className="grid grid-cols-3 gap-2 mb-3">
                                {Object.entries(product.metrics).map(
                                  ([key, value], i) => (
                                    <div
                                      key={i}
                                      className={`bg-white/5 rounded-md p-2 text-center border border-white/5`}
                                    >
                                      <div
                                        className={`text-sm font-medium ${
                                          idx === 0
                                            ? "text-purple-300"
                                            : idx === 1
                                            ? "text-indigo-300"
                                            : "text-fuchsia-300"
                                        }`}
                                      >
                                        {value}
                                      </div>
                                      <div className="text-[10px] text-white/60 uppercase">
                                        {key}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                        </CardContent>

                        <CardFooter className="border-t border-white/5 pt-4 relative z-10">
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto bg-white/5 border-white/10 hover:bg-white/10 text-white group"
                          >
                            <span>Learn more</span>
                            <ExternalLink
                              className={`ml-2 h-3.5 w-3.5 group-hover:${
                                idx === 0
                                  ? "text-purple-400"
                                  : idx === 1
                                  ? "text-indigo-400"
                                  : "text-fuchsia-400"
                              } transition-colors`}
                            />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </section>
            </motion.div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <section id="contacts">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-center mb-10"
                >
                  <h2 className="text-3xl font-bold mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                      Our Leadership Team
                    </span>
                  </h2>
                  <p className="text-lg text-white/70 max-w-3xl mx-auto">
                    Connect with our blockchain experts who are driving
                    innovation in the industry
                  </p>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.15 },
                    },
                  }}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {companyData.contacts.map((contact, idx) => (
                    <motion.div
                      key={contact.id}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: "spring",
                            stiffness: 70,
                            damping: 20,
                          },
                        },
                      }}
                    >
                      <Card className="h-full relative overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-[0_8px_32px_0_rgba(91,38,135,0.15)] group hover:shadow-[0_8px_40px_0_rgba(91,38,135,0.25)] hover:border-indigo-500/30 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 pointer-events-none group-hover:opacity-75 transition-opacity duration-500" />

                        {/* Radial gradient spotlight effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.1),transparent_70%)]"></div>

                        <CardContent className="p-8 relative z-10">
                          <div className="flex flex-col items-center text-center">
                            <div className="relative mb-6 group-hover:scale-105 transition-transform duration-500 ease-out">
                              {/* Animated rings around avatar */}
                              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-70 blur group-hover:opacity-100 animate-spin-slow"></div>
                              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 blur group-hover:opacity-30 group-hover:animate-reverse-spin"></div>

                              <Avatar className="h-24 w-24 border-2 border-white/20 shadow-lg">
                                <AvatarFallback className="bg-gradient-to-br from-indigo-800/80 to-purple-900/80 text-xl font-bold">
                                  {contact.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            </div>

                            <h3 className="font-medium text-2xl mb-1">
                              {contact.name}
                            </h3>
                            <p className="text-indigo-300 mb-6">
                              {contact.title}
                            </p>

                            <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 rounded-full mb-6"></div>

                            <div className="space-y-3 w-full">
                              <a
                                href={`mailto:${contact.email}`}
                                className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white/80 hover:text-white group/link"
                              >
                                <Mail className="h-4 w-4 text-indigo-400 group-hover/link:text-indigo-300" />
                                <span>{contact.email}</span>
                              </a>

                              <a
                                href={`tel:${contact.phone}`}
                                className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white/80 hover:text-white group/link"
                              >
                                <Phone className="h-4 w-4 text-indigo-400 group-hover/link:text-indigo-300" />
                                <span>{contact.phone}</span>
                              </a>
                            </div>

                            <div className="mt-6 w-full">
                              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0">
                                <MessageSquare className="mr-2 h-4 w-4" />{" "}
                                Schedule Meeting
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Quick contact section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="mt-12"
                >
                  <Card className="relative overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-[0_8px_32px_0_rgba(91,38,135,0.15)] hover:border-purple-500/20 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 pointer-events-none" />

                    <CardContent className="p-8 relative z-10">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                          <h3 className="text-xl font-bold mb-2">
                            Need more information?
                          </h3>
                          <p className="text-white/70">
                            Our team is ready to help with any questions about
                            our products and services
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white border-0">
                            <Mail className="mr-2 h-4 w-4" /> Contact Sales
                          </Button>
                          <Button
                            variant="outline"
                            className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
                          >
                            <Phone className="mr-2 h-4 w-4" /> Schedule Call
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </section>
            </motion.div>
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <section id="locations">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-center mb-10"
                >
                  <h2 className="text-3xl font-bold mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                      Global Presence
                    </span>
                  </h2>
                  <p className="text-lg text-white/70 max-w-3xl mx-auto">
                    Our offices around the world help us serve customers and
                    drive innovation globally
                  </p>
                </motion.div>

                {/* <div className="mb-12 relative overflow-hidden rounded-3xl backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-[0_8px_32px_0_rgba(91,38,135,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 pointer-events-none" /> */}

                {/* World map with location markers - simple visual representation */}
                {/* <div className="relative h-80 w-full bg-black/20">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-xl text-white/70 font-light">
                        Interactive map coming soon
                      </div>
                    </div>
                  </div>
                </div> */}

                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {companyData.locations.map((location, index) => {
                    // Generate random color variations for each location
                    const colors = [
                      {
                        from: "from-indigo-500/10",
                        to: "to-blue-500/5",
                        text: "text-indigo-400",
                      },
                      {
                        from: "from-purple-500/10",
                        to: "to-indigo-500/5",
                        text: "text-purple-400",
                      },
                      {
                        from: "from-fuchsia-500/10",
                        to: "to-purple-500/5",
                        text: "text-fuchsia-400",
                      },
                      {
                        from: "from-blue-500/10",
                        to: "to-indigo-500/5",
                        text: "text-blue-400",
                      },
                      {
                        from: "from-violet-500/10",
                        to: "to-indigo-500/5",
                        text: "text-violet-400",
                      },
                    ];

                    const colorSet = colors[index % colors.length];

                    return (
                      <motion.div
                        key={index}
                        variants={{
                          hidden: { opacity: 0, y: 30 },
                          show: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              type: "spring",
                              stiffness: 70,
                              damping: 20,
                            },
                          },
                        }}
                      >
                        <Card className="relative overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-[0_8px_32px_0_rgba(91,38,135,0.15)] hover:shadow-[0_8px_40px_0_rgba(91,38,135,0.25)] hover:border-indigo-500/20 transition-all duration-500">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${colorSet.from} ${colorSet.to} pointer-events-none`}
                          />

                          {/* Radial gradient spotlight effect */}
                          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.1),transparent_70%)]"></div>

                          <CardContent className="p-8 relative z-10">
                            <div className="flex items-center gap-5">
                              <div
                                className={`p-4 rounded-xl bg-white/5 border border-white/10 ${
                                  index === 0 ? "bg-indigo-500/20" : ""
                                }`}
                              >
                                <MapPin
                                  className={`h-8 w-8 ${colorSet.text}`}
                                />
                              </div>

                              <div>
                                <h3 className="font-medium text-xl">
                                  {location}
                                </h3>
                                <div className="flex items-center mt-1">
                                  {index === 0 && (
                                    <Badge className="bg-indigo-500/30 text-indigo-200 border-indigo-400/30">
                                      Headquarters
                                    </Badge>
                                  )}
                                  {index !== 0 && (
                                    <p className="text-sm text-white/70">
                                      Regional Office
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10">
                              <div className="flex items-center justify-between">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-white/70 hover:text-white hover:bg-white/5"
                                >
                                  Contact Office
                                </Button>
                                <div className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-xs">
                                  {index === 0
                                    ? "120+ employees"
                                    : index === 1
                                    ? "45+ employees"
                                    : index === 2
                                    ? "30+ employees"
                                    : "10+ employees"}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </section>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Navigation dots for sections */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:block z-20">
          <div className="flex flex-col items-center gap-6">
            {["header", "overview", "products", "contacts", "locations"].map(
              (section) => (
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
              )
            )}
          </div>
        </div>
      </div>

      {/* Footer with subtle gradient */}
      <footer className="py-8 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-950/20"></div>
        <div className="container max-w-6xl mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-white">
                  {companyData.name}
                </span>
              </h3>
              <p className="text-sm text-white/60">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
              >
                <Globe className="mr-2 h-4 w-4" /> Visit Website
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white">
                <MessageSquare className="mr-2 h-4 w-4" /> Contact Us
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
