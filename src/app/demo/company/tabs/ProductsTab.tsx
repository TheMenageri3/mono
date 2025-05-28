"use client";

import React from "react";
import {
  CheckCircle,
  ArrowUpRight,
  Download,
  Star,
  Tag,
  Shield,
  Box,
  Zap,
  BarChart4,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  keyFeatures: string[];
  stats: {
    [key: string]: {
      value: string;
      label: string;
    };
  };
  learnMoreUrl: string;
}

const products: Product[] = [
  {
    id: "chainguard",
    name: "ChainGuard",
    description:
      "Enterprise-grade security infrastructure for digital assets and smart contracts.",
    imageUrl: "/images/products/chainguard.png",
    keyFeatures: [
      "Multi-layer security architecture",
      "Real-time threat monitoring",
      "Customizable access controls",
      "Comprehensive audit trails",
      "Regulatory compliance tools",
    ],
    stats: {
      securityScore: { value: "99.8%", label: "SECURITY SCORE" },
      uptime: { value: "99.99%", label: "UPTIME" },
      satisfaction: { value: "4.9/5", label: "CLIENT SATISFACTION" },
    },
    learnMoreUrl: "/products/chainguard",
  },
  {
    id: "databridge",
    name: "DataBridge",
    description:
      "Middleware solution that seamlessly connects legacy systems with blockchain networks.",
    imageUrl: "/images/products/databridge.png",
    keyFeatures: [
      "Universal API adapters",
      "Cross-chain compatibility",
      "Data validation frameworks",
      "Reliable transaction processing",
      "Custom integration support",
    ],
    stats: {
      integrations: { value: "50+", label: "INTEGRATIONS" },
      transactions: { value: "1M+ daily", label: "TRANSACTIONS" },
      latency: { value: "<100ms", label: "LATENCY" },
    },
    learnMoreUrl: "/products/databridge",
  },
  {
    id: "identitybloc",
    name: "IdentityBloc",
    description:
      "Self-sovereign identity platform that gives users control over their personal data.",
    imageUrl: "/images/products/identitybloc.png",
    keyFeatures: [
      "Decentralized credentials",
      "Privacy-preserving verification",
      "Cross-platform authentication",
      "Enterprise identity management",
      "Zero-knowledge proof integration",
    ],
    stats: {
      users: { value: "2M+", label: "USERS" },
      verifications: { value: "500K+ daily", label: "VERIFICATIONS" },
      partners: { value: "120+ orgs.", label: "PARTNERS" },
    },
    learnMoreUrl: "/products/identitybloc",
  },
];

const productIcons = {
  chainguard: <Shield className="h-5 w-5 text-purple-400" />,
  databridge: <Box className="h-5 w-5 text-blue-400" />,
  identitybloc: <Zap className="h-5 w-5 text-indigo-400" />,
};

export function ProductsTab() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
          Our Product Suite
        </h2>
        <p className="text-white/60 mt-2">
          Comprehensive blockchain solutions designed for security, scalability,
          and seamless integration
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-md font-medium">
                  Featured Products
                </CardTitle>
                <CardDescription>
                  Our flagship enterprise blockchain solutions
                </CardDescription>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 bg-white/5 border-white/10"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download product catalog</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardHeader>

            <CardContent className="p-4">
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/[0.07] transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-md bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                          {
                            productIcons[
                              product.id as keyof typeof productIcons
                            ]
                          }
                        </div>
                      </div>

                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">
                              {product.name}
                            </h3>
                            <p className="text-sm text-white/70 mt-0.5">
                              {product.description}
                            </p>
                          </div>

                          <Badge
                            variant="outline"
                            className="bg-purple-500/20 border-purple-500/30 text-purple-300"
                          >
                            Enterprise
                          </Badge>
                        </div>

                        <div className="mt-3 grid grid-cols-3 gap-3">
                          {Object.entries(product.stats).map(([key, stat]) => (
                            <div
                              key={key}
                              className="bg-white/5 p-2 rounded-md"
                            >
                              <div className="font-bold text-sm">
                                {stat.value}
                              </div>
                              <div className="text-[10px] text-white/60 uppercase tracking-wider">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 flex gap-2 flex-wrap">
                          {product.keyFeatures
                            .slice(0, 3)
                            .map((feature, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-1.5"></span>
                                {feature}
                              </span>
                            ))}
                          {product.keyFeatures.length > 3 && (
                            <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                              +{product.keyFeatures.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-3 pt-3 border-t border-white/10">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/5 border-white/10 text-white"
                      >
                        Learn more
                        <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-1"
        >
          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">
                Product Performance
              </CardTitle>
              <CardDescription>Market metrics and engagement</CardDescription>
            </CardHeader>

            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm">ChainGuard</span>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      98%
                    </Badge>
                  </div>
                  <Progress
                    value={98}
                    className="h-2 bg-white/10 [--progress-foreground:theme(colors.purple.600)]"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm">DataBridge</span>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      82%
                    </Badge>
                  </div>
                  <Progress
                    value={82}
                    className="h-2 bg-white/10 [--progress-foreground:theme(colors.blue.600)]"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm">IdentityBloc</span>
                    <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                      76%
                    </Badge>
                  </div>
                  <Progress
                    value={76}
                    className="h-2 bg-white/10 [--progress-foreground:theme(colors.indigo.600)]"
                  />
                </div>

                <div className="mt-6 pt-3 border-t border-white/10">
                  <h4 className="text-sm font-medium flex items-center gap-1.5 mb-3">
                    <Tag className="h-4 w-4 text-purple-400" />
                    Industry Recognition
                  </h4>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2.5 bg-white/5 rounded-md border border-white/10">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-amber-400" />
                        <span className="text-sm">
                          Blockchain Innovation Award
                        </span>
                      </div>
                      <span className="text-xs text-white/60">2025</span>
                    </div>

                    <div className="flex justify-between items-center p-2.5 bg-white/5 rounded-md border border-white/10">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-amber-400" />
                        <span className="text-sm">Security Excellence</span>
                      </div>
                      <span className="text-xs text-white/60">2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6"
          >
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
              <CardContent className="p-4">
                <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                  <BarChart4 className="h-5 w-5 text-purple-400 mb-2" />
                  <h3 className="font-medium mb-1">Analytics Platform</h3>
                  <p className="text-sm text-white/60 mb-3">
                    Track your blockchain infrastructure metrics in real-time
                  </p>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600">
                    Access Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
