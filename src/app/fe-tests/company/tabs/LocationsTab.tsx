"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

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
    <div className="backdrop-blur-md to-black min-h-screen mb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Global Presence</h2>
          <p className="text-gray-400 mt-6">
            Our offices around the world help us serve customers and drive
            innovation globally
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <Card
              key={index}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col items-center"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <MapPin
                      size={24}
                      color={
                        location.type === "Headquarters" ? "#3B82F6" : "#A855F7"
                      }
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {location.city}, {location.state}
                    </h3>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        location.type === "Headquarters"
                          ? "bg-blue-900/60 text-blue-300"
                          : ""
                      }`}
                    >
                      {location.type}
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-800 flex justify-between items-center">
                  <button className="text-gray-400 text-sm hover:text-white transition">
                    Contact Office
                  </button>
                  <div className="text-gray-500 text-sm bg-gray-800/70 px-3 py-1 rounded-full">
                    {location.employees} employees
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
