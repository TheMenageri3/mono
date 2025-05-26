"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

// Mock data for charts
const TICKET_DISTRIBUTION = [
  { name: "Authentication", value: 35 },
  { name: "Billing", value: 25 },
  { name: "Features", value: 20 },
  { name: "Dashboard", value: 15 },
  { name: "Account", value: 5 },
];

const TICKET_TRENDS = [
  { name: "Mon", open: 4, resolved: 3 },
  { name: "Tue", open: 7, resolved: 5 },
  { name: "Wed", open: 5, resolved: 6 },
  { name: "Thu", open: 6, resolved: 4 },
  { name: "Fri", open: 8, resolved: 7 },
  { name: "Sat", open: 3, resolved: 5 },
  { name: "Sun", open: 2, resolved: 3 },
];

const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

interface TicketStatsProps {
  className?: string;
}

export default function TicketStats({ className }: TicketStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={className}
    >
      <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg">Ticket Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TICKET_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {TICKET_DISTRIBUTION.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      style={{
                        filter: "drop-shadow(0 0 3px rgba(255,255,255,0.1))",
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 15, 15, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "6px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    padding: "8px 12px",
                  }}
                  itemStyle={{ color: "rgba(255,255,255,0.9)" }}
                  labelStyle={{
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: "4px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={TICKET_TRENDS}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="name"
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 15, 15, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "6px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    padding: "8px 12px",
                  }}
                  itemStyle={{ color: "rgba(255,255,255,0.9)" }}
                  labelStyle={{
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: "4px",
                    fontWeight: 500,
                  }}
                  animationDuration={300}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{ paddingTop: "10px" }}
                />
                <defs>
                  <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorResolved"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Line
                  type="monotone"
                  dataKey="open"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorOpen)"
                  name="New Tickets"
                  activeDot={{
                    r: 5,
                    strokeWidth: 2,
                    stroke: "#121212",
                    fill: "#8b5cf6",
                    filter: "drop-shadow(0 0 3px rgba(139, 92, 246, 0.5))",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorResolved)"
                  name="Resolved"
                  activeDot={{
                    r: 5,
                    strokeWidth: 2,
                    stroke: "#121212",
                    fill: "#10b981",
                    filter: "drop-shadow(0 0 3px rgba(16, 185, 129, 0.5))",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-6">
            <div className="rounded-md p-2 text-center border border-purple-500/20 bg-purple-500/5">
              <div className="text-xs text-white/60">Open</div>
              <div className="text-lg font-semibold text-white">12</div>
            </div>
            <div className="rounded-md p-2 text-center border border-blue-500/20 bg-blue-500/5">
              <div className="text-xs text-white/60">In Progress</div>
              <div className="text-lg font-semibold text-white">8</div>
            </div>
            <div className="rounded-md p-2 text-center border border-green-500/20 bg-green-500/5">
              <div className="text-xs text-white/60">Resolved</div>
              <div className="text-lg font-semibold text-white">24</div>
            </div>
            <div className="rounded-md p-2 text-center border border-white/10 bg-white/5">
              <div className="text-xs text-white/60">Total</div>
              <div className="text-lg font-semibold text-white">44</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
