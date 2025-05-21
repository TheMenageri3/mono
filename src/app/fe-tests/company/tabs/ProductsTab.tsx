"use client";

import React from "react";
import { CheckCircle, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

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

export function ProductsTab() {
  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="text-center my-10">
        <h2
          color="#808080"
          className="text-2xl md:text-3xl font-semibold text-white"
        >
          Our Product Suite
        </h2>
        <p className="text-sm md:text-base text-gray-400 mt-5">
          Comprehensive blockchain solutions designed for security, scalability,
          and seamless integration
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="backdrop-blur-md bg-white/5 border border-white/10 space-y-6 p-12"
          >
            {/* Product Image Area */}
            <div className="h-48 backdrop-blur-md flex items-center justify-center">
              <p className="text-gray-500 text-sm">
                Product Image ({product.name})
              </p>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col space-y-4">
              {/* Title and Description */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-300 text-sm">{product.description}</p>
              </div>
              {/* Key Features */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                    <CheckCircle size={16} color="white" />
                  </div>
                  <span className="ml-2 text-white font-medium">
                    Key Features
                  </span>
                </div>
              </div>
              <ul className="space-y-1 pl-5">
                {product.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-1.5 mr-2"></div>
                    <span className="text-gray-300 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats Area */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {Object.entries(product.stats).map(([key, stat]) => (
                <div
                  key={key}
                  className="bg-purple-900/50 p-2 text-center rounded"
                >
                  <div className="text-white font-bold">{stat.value}</div>
                  <div className="text-gray-400 text-xs uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Learn More Button */}
            <div className="mt-4 flex justify-start">
              <a
                href={product.learnMoreUrl}
                className="inline-flex items-center px-4 py-2 text-sm border border-purple-700 rounded text-white hover:bg-purple-800 transition-colors"
              >
                Learn more
                <ArrowUpRight size={14} className="ml-1" />
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
