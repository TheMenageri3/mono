"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  Building,
  Award,
  CircleCheckBig,
  Zap,
  MapPin,
  Users,
} from "lucide-react";

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
  ];

  return (
    <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="md:col-span-2 space-y-6">
        <Card className="backdrop-blur-md bg-white/5 border border-white/10 space-y-6 p-12">
          <div>
            <div className="text-2xl flex items-center gap-2 mb-4">
              <Building color="#DF73FF" size={20} />
              <span>About BlockChain Dynamics</span>
            </div>
            <p style={{ color: "lightgray" }}>
              We specialize in developing scalable blockchain solutions for
              enterprises and startups, focusing on security, performance, and
              user experience. Our team combines technical expertise with
              business acumen to deliver products that drive real-world adoption
              and value.
            </p>
          </div>
          <hr className="border-muted" />
          <div>
            <div className="text-2xl flex items-center gap-2 mb-3">
              <Zap color="#DF73FF" size={20} />
              <span>Mission Statement</span>
            </div>
            <p style={{ color: "lightgray" }} className="italic">
              {`To bridge the gap between traditional systems and blockchain
              technology, creating accessible solutions that power the future of
              finance, identity, and digital ownership.`}
            </p>
          </div>
          <hr className="border-muted" />
          <div>
            <div className="text-2xl flex items-center gap-2 mb-3">
              <Users color="#DF73FF" size={20} />
              <span>Company Culture</span>
            </div>
            <p style={{ color: "lightgray" }}>
              Our culture encourages innovation, lifelong learning, and
              collaborative problem-solving. We maintain a flat organizational
              structure where ideas are valued based on merit rather than
              hierarchy.
            </p>
          </div>
          <hr className="border-muted" />

          <h2 className="text-xl font-semibold mb-4">TRUSTED BY</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Global Financial Corp",
              "Technovate Inc",
              "SecureID Systems",
              "Futurely",
              "DataTrust Networks",
              "Enterprise Solutions LLC",
            ].map((client, index) => (
              <span
                style={{ color: "lightgray" }}
                key={index}
                className="px-3 py-1 bg-muted text-sm rounded-md border border-border"
              >
                {client}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Right Column */}
      <div className="space-y-6 self-start">
        <Card className="max-w-sm backdrop-blur-md bg-white/5 border border-white/10 p-6">
          <div className="text-lg flex items-center gap-2 mb-4">
            <Award color="#1e90ff" size={20} />
            <span>Company Achievements</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="max-w-sm backdrop-blur-md bg-white/5 border border-white/10 p-6">
          <div className="text-lg flex items-center gap-2 mb-4">
            <CircleCheckBig color="#DF73FF" size={20} />
            <span>Benefits & Perks</span>
          </div>
          <ul
            style={{ color: "lightgray" }}
            className="list-disc list-inside text-sm leading-relaxed"
          >
            <li>Competitive compensation packages</li>
            <li>Comprehensive health benefits</li>
            <li>Flexible remote work policy</li>
            <li>Continuous learning stipends</li>
            <li>Equity options</li>
            <li>Regular team-building retreats</li>
          </ul>
        </Card>

        <Card className="max-w-sm backdrop-blur-md bg-white/5 border border-white/10 p-6">
          <h2 className="text-lg font-semibold mb-4">Global Presence</h2>
          <div className="space-y-3">
            {globalPresence.map((location) => (
              <div
                key={location.id}
                style={{ color: "lightgray" }}
                className="flex items-center text-sm"
              >
                <MapPin
                  color="#1e90ff"
                  className="w-4 h-4 mr-2 text-muted-foreground"
                />
                <span>{location.title}</span>
                {location.status && (
                  <span className="ml-2 text-xs text-muted-foreground border px-2 py-0.5 rounded-md">
                    {location.status}
                  </span>
                )}
              </div>
            ))}
            <div className="text-sm text-muted-foreground">
              + 1 more locations
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
