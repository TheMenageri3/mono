"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building,
  Award,
  CircleCheckBig,
  Zap,
  MapPin,
  Users,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Star,
  Globe,
  TrendingUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function OverviewTab() {
  const stats = [
    { value: "78", label: "PROJECTS COMPLETED" },
    { value: "42", label: "TEAM SIZE" },
    { value: "12", label: "COUNTRIES SERVED" },
    { value: "98%", label: "SATISFACTION RATE" },
  ];

  const globalPresence = [
    { id: 1, title: "Austin, TX", status: "HQ" },
    { id: 2, title: "San Francisco, CA", status: "" },
    { id: 3, title: "Boston, MA", status: "" },
    { id: 4, title: "London, UK", status: "" },
  ];

  const clients = [
    "Global Financial Corp",
    "Technovate Inc",
    "SecureID Systems",
    "Futurely",
    "DataTrust Networks",
    "Enterprise Solutions LLC",
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
          Company Overview
        </h2>
        <p className="text-white/60 mt-2">
          Blockchain solutions for enterprise and innovation leaders
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Main Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-purple-400" />
                <CardTitle className="text-lg font-medium">
                  About The Company
                </CardTitle>
              </div>
              <CardDescription>Our mission and values</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <p className="text-white/70 leading-relaxed">
                  We specialize in developing scalable blockchain solutions for
                  enterprises and startups, focusing on security, performance,
                  and user experience. Our team combines technical expertise
                  with business acumen to deliver products that drive real-world
                  adoption and value.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-purple-400" />
                  <h3 className="font-medium">Mission Statement</h3>
                </div>
                <p className="text-white/70 italic leading-relaxed">
                  To bridge the gap between traditional systems and blockchain
                  technology, creating accessible solutions that power the
                  future of finance, identity, and digital ownership.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-purple-400" />
                  <h3 className="font-medium">Company Culture</h3>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Our culture encourages innovation, lifelong learning, and
                  collaborative problem-solving. We maintain a flat
                  organizational structure where ideas are valued based on merit
                  rather than hierarchy.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400" />
                <CardTitle className="text-lg font-medium">
                  Top Clients
                </CardTitle>
              </div>
              <CardDescription>
                Enterprise partners who trust us
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {clients.map((client, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg text-center hover:bg-white/[0.07] transition-colors flex flex-col items-center justify-center"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-2">
                      <BadgeCheck className="h-5 w-5 text-purple-400" />
                    </div>
                    <span className="text-sm text-white/80">{client}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm text-white/60">
                  Serving 200+ companies worldwide
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white text-xs h-8"
                >
                  View all clients
                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Side - Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <CardTitle className="text-lg font-medium">
                  Key Metrics
                </CardTitle>
              </div>
              <CardDescription>Performance indicators</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm">Client Success Rate</span>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                      98%
                    </Badge>
                  </div>
                  <Progress
                    value={98}
                    className="h-1.5 bg-white/10 [--progress-foreground:theme(colors.emerald.600)]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm">Team Growth</span>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      78%
                    </Badge>
                  </div>
                  <Progress
                    value={78}
                    className="h-1.5 bg-white/10 [--progress-foreground:theme(colors.purple.600)]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CircleCheckBig className="h-5 w-5 text-purple-400" />
                <CardTitle className="text-lg font-medium">
                  Benefits & Perks
                </CardTitle>
              </div>
              <CardDescription>What we offer our team</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                {[
                  "Competitive compensation packages",
                  "Comprehensive health benefits",
                  "Flexible remote work policy",
                  "Continuous learning stipends",
                  "Equity options",
                  "Regular team-building retreats",
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5 transition-colors"
                  >
                    <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-purple-300" />
                    </div>
                    <span className="text-sm text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-400" />
                <CardTitle className="text-lg font-medium">
                  Global Presence
                </CardTitle>
              </div>
              <CardDescription>Our office locations</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                {globalPresence.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <MapPin className="h-3.5 w-3.5 text-blue-300" />
                      </div>
                      <span className="text-sm text-white/80">
                        {location.title}
                      </span>
                    </div>

                    {location.status && (
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs h-5">
                        {location.status}
                      </Badge>
                    )}
                  </div>
                ))}

                <div className="mt-3 pt-3 border-t border-white/10">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-white/5 border-white/10 text-white text-xs h-8 mt-1"
                  >
                    View all locations
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
