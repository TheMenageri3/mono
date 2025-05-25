import React from "react";
import { LineChart, Line, XAxis, YAxis, Legend } from "recharts";

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
    <LineChart
      width={300}
      height={200}
      data={data}
      className="mt-[-130px] mb-2"
    >
      <XAxis
        dataKey="day"
        axisLine={true}
        tickLine={true}
        tick={{ fill: "#888", fontSize: 12 }}
      />
      <YAxis
        ticks={[0, 2, 4, 6, 8]}
        axisLine={true}
        tickLine={true}
        tick={{ fill: "#888", fontSize: 12 }}
        domain={[0, 8]}
      />
      <Legend
        verticalAlign="top"
        height={36}
        iconType="line"
        wrapperStyle={{
          paddingBottom: "20px",
          fontSize: "14px",
        }}
      />
      <Line
        type="monotone"
        dataKey="newTickets"
        stroke="#8B5CF6"
        strokeWidth={2}
        dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
        name="New Tickets"
      />
      <Line
        type="monotone"
        dataKey="resolved"
        stroke="#10B981"
        strokeWidth={2}
        dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
        name="Resolved"
      />
    </LineChart>
  );
}
