import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", newTickets: 4, resolved: 3 },
  { day: "Tue", newTickets: 7, resolved: 5 },
  { day: "Wed", newTickets: 5, resolved: 6 },
  { day: "Thu", newTickets: 6, resolved: 4 },
  { day: "Fri", newTickets: 8, resolved: 7 },
  { day: "Sat", newTickets: 3, resolved: 5 },
  { day: "Sun", newTickets: 2, resolved: 3 },
];

export default function WeeklyTicketsChart() {
  return (
    <div className="h-[220px] mt-[-125px] mb-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorNewTickets" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            style={{
              fontSize: "0.75rem",
              fill: "rgba(255,255,255,0.6)",
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            style={{
              fontSize: "0.75rem",
              fill: "rgba(255,255,255,0.6)",
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 15, 15, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            itemStyle={{ color: "rgba(255,255,255,0.9)" }}
            labelStyle={{
              color: "rgba(255,255,255,0.7)",
              marginBottom: "4px",
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ paddingTop: "10px" }}
          />
          <Line
            type="monotone"
            dataKey="newTickets"
            name="New Tickets"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{
              r: 3,
              strokeWidth: 1,
              stroke: "#8b5cf6",
              fill: "#1e1e1e",
            }}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: "#121212",
              fill: "#8b5cf6",
            }}
          />
          <Line
            type="monotone"
            dataKey="resolved"
            name="Resolved"
            stroke="#10b981"
            strokeWidth={2}
            dot={{
              r: 3,
              strokeWidth: 1,
              stroke: "#10b981",
              fill: "#1e1e1e",
            }}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: "#121212",
              fill: "#10b981",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
