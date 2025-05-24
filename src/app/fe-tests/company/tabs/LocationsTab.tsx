"use client";

import React from "react";
import {
  MapPin,
  ExternalLink,
  Users,
  Phone,
  Building,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Types
interface LocationData {
  city: string;
  state: string;
  type: "Headquarters" | "Regional Office";
  employees: string;
}

// LocationsTab Component
export function LocationsTab() {
  // Location data
  const locations: LocationData[] = [
    {
      city: "Austin",
      state: "TX",
      type: "Headquarters",
      employees: "120+",
    },
    {
      city: "San Francisco",
      state: "CA",
      type: "Regional Office",
      employees: "45+",
    },
    {
      city: "Boston",
      state: "MA",
      type: "Regional Office",
      employees: "30+",
    },
    {
      city: "London",
      state: "UK",
      type: "Regional Office",
      employees: "10+",
    },
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
          Global Presence
        </h2>
        <p className="text-white/60 mt-2">
          Our offices around the world help us serve customers and drive
          innovation globally
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1"
        >
          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-md font-medium">
                  Locations Overview
                </CardTitle>
                <CardDescription>
                  Regional distribution and workforce
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
                    <p>Export location data</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardHeader>

            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="h-48 backdrop-blur-md flex items-center justify-center bg-white/5 rounded-md border border-white/10">
                  <p className="text-center text-white/60">
                    Location map visualization
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col justify-center">
                    <div className="text-3xl font-bold">4</div>
                    <div className="text-sm text-white/60">Global Offices</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col justify-center">
                    <div className="text-3xl font-bold">205+</div>
                    <div className="text-sm text-white/60">Team Members</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-medium mb-2">
                    Regional Breakdown
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-purple-500 rounded-sm"></div>
                        <span className="text-sm">North America</span>
                      </div>
                      <span className="text-sm">75%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-blue-500 rounded-sm"></div>
                        <span className="text-sm">Europe</span>
                      </div>
                      <span className="text-sm">25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-1"
        >
          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">
                Office Locations
              </CardTitle>
              <CardDescription>
                Details about our global facilities
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4">
              <div className="space-y-3">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/[0.07] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-md ${
                            location.type === "Headquarters"
                              ? "bg-purple-500/20"
                              : "bg-blue-500/20"
                          }`}
                        >
                          <MapPin
                            className={`h-4 w-4 ${
                              location.type === "Headquarters"
                                ? "text-purple-400"
                                : "text-blue-400"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="font-medium">
                            {location.city}, {location.state}
                            {location.type === "Headquarters" && (
                              <span className="ml-2 text-xs bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded-full">
                                HQ
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-white/60 flex items-center gap-1.5">
                            <Users className="h-3 w-3" />
                            {location.employees} employees
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/5 border-white/10 text-white h-8 px-2.5"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
              <CardContent className="p-4">
                <div className="p-4 border border-white/10 rounded-lg bg-white/5 text-center">
                  <Building className="h-5 w-5 text-purple-400 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">Expanding Our Reach</h3>
                  <p className="text-sm text-white/60 mb-3">
                    We&apos;re planning to open new offices in Tokyo and Berlin
                    in Q3 2025
                  </p>
                  <Button
                    variant="outline"
                    className="bg-white/5 border-white/10 text-white text-sm"
                  >
                    View Expansion Plans
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
