"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  Search,
  Calendar,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  RefreshCw,
  Filter,
} from "lucide-react";

// Mock data for the dashboard
const generateMockData = () => {
  // Daily wallet interaction data (May 3-12)
  const dailyWalletsData = [
    { date: "May 3", count: 145 },
    { date: "May 4", count: 167 },
    { date: "May 5", count: 178 },
    { date: "May 6", count: 142 },
    { date: "May 7", count: 189 },
    { date: "May 8", count: 201 },
    { date: "May 9", count: 176 },
    { date: "May 10", count: 184 },
    { date: "May 11", count: 192 },
    { date: "May 12", count: 210 },
  ];

  // Daily transaction data (May 3-12)
  const dailyTransactionsData = [
    { date: "May 3", count: 532 },
    { date: "May 4", count: 621 },
    { date: "May 5", count: 698 },
    { date: "May 6", count: 542 },
    { date: "May 7", count: 731 },
    { date: "May 8", count: 820 },
    { date: "May 9", count: 754 },
    { date: "May 10", count: 692 },
    { date: "May 11", count: 845 },
    { date: "May 12", count: 932 },
  ];

  // Daily Success vs Failed Transactions (May 3-12)
  const successFailData = [
    { date: "May 3", success: 489, failed: 43 },
    { date: "May 4", success: 576, failed: 45 },
    { date: "May 5", success: 645, failed: 53 },
    { date: "May 6", success: 498, failed: 44 },
    { date: "May 7", success: 682, failed: 49 },
    { date: "May 8", success: 768, failed: 52 },
    { date: "May 9", success: 700, failed: 54 },
    { date: "May 10", success: 631, failed: 61 },
    { date: "May 11", success: 781, failed: 64 },
    { date: "May 12", success: 859, failed: 73 },
  ];

  // Recent Successful Transactions
  const successfulTransactions = [
    { blockTime: "12:30:45", blockId: "8f61ec..3a2e", txId: "3Ba912..7F01" },
    { blockTime: "12:29:18", blockId: "7a42df..1c5f", txId: "6Fa548..2C13" },
    { blockTime: "12:28:02", blockId: "5c38ab..9f4e", txId: "1Db726..9A56" },
    { blockTime: "12:26:55", blockId: "2e16cd..7a8d", txId: "7Gc341..3B89" },
    { blockTime: "12:25:31", blockId: "9d24fe..5b3c", txId: "2Hd837..4C32" },
    { blockTime: "12:24:09", blockId: "4b32de..8c7f", txId: "9Ie529..6D45" },
    { blockTime: "12:22:47", blockId: "1e84af..4d2e", txId: "5Jf215..8E67" },
    { blockTime: "12:21:22", blockId: "6c53bd..2e1a", txId: "4Kg973..1F90" },
  ];

  // Recent Failed Transactions
  const failedTransactions = [
    { blockTime: "12:30:17", blockId: "3d72ef..8b2c", txId: "2La518..5G29" },
    { blockTime: "12:28:42", blockId: "1f54cd..6a3e", txId: "7Mb624..8H34" },
    { blockTime: "12:27:19", blockId: "9e36ab..4d2f", txId: "3Nc435..2I76" },
    { blockTime: "12:25:55", blockId: "5g18de..2c1b", txId: "8Od316..9J12" },
    { blockTime: "12:24:33", blockId: "2h90fg..1e8a", txId: "4Pe742..3K59" },
    { blockTime: "12:23:11", blockId: "7i72hi..9d5c", txId: "1Qf853..7L23" },
    { blockTime: "12:21:49", blockId: "4j54jk..7f3e", txId: "6Rg964..4M87" },
    { blockTime: "12:20:27", blockId: "8k36lm..5e2d", txId: "2Sh175..6N41" },
  ];

  // Transaction by Instruction
  const transactionsByInstruction = [
    { name: "swap", value: 78250 },
    { name: "removeLiquidity", value: 42100 },
    { name: "createAmm", value: 12500 },
    { name: "crankThatTwap", value: 25800 },
    { name: "addLiquidity", value: 34600 },
    { name: "Others", value: 8750 },
  ];

  // User Wallets by Instruction
  const walletsByInstruction = [
    { name: "swap", value: 245 },
    { name: "removeLiquidity", value: 187 },
    { name: "createAmm", value: 65 },
    { name: "crankThatTwap", value: 125 },
    { name: "addLiquidity", value: 156 },
    { name: "Others", value: 42 },
  ];

  // Wallet by transaction success rate group
  const successRateGroups = [
    { name: "0%", value: 23 },
    { name: "0-30%", value: 42 },
    { name: "30-50%", value: 87 },
    { name: "50-75%", value: 138 },
    { name: "75-100%", value: 210 },
  ];

  // Wallets by transaction count group
  const transactionCountGroups = [
    { name: "1", value: 175 },
    { name: "2-5", value: 142 },
    { name: "6-25", value: 98 },
    { name: "25-100", value: 56 },
    { name: "100+", value: 29 },
  ];

  // Top wallets
  const topWallets = [
    {
      wallet: "0x8a72...3f51",
      totalTx: 348,
      succeededTx: 338,
      failedTx: 10,
      failPercent: "2.9%",
    },
    {
      wallet: "0x4b91...2e78",
      totalTx: 287,
      succeededTx: 271,
      failedTx: 16,
      failPercent: "5.6%",
    },
    {
      wallet: "0x6d35...1c49",
      totalTx: 252,
      succeededTx: 248,
      failedTx: 4,
      failPercent: "1.6%",
    },
    {
      wallet: "0x2f86...9a34",
      totalTx: 214,
      succeededTx: 189,
      failedTx: 25,
      failPercent: "11.7%",
    },
    {
      wallet: "0x7c14...5b62",
      totalTx: 196,
      succeededTx: 182,
      failedTx: 14,
      failPercent: "7.1%",
    },
    {
      wallet: "0x1e53...8d27",
      totalTx: 183,
      succeededTx: 178,
      failedTx: 5,
      failPercent: "2.7%",
    },
    {
      wallet: "0x9h21...3i48",
      totalTx: 172,
      succeededTx: 150,
      failedTx: 22,
      failPercent: "12.8%",
    },
    {
      wallet: "0x3g75...7f92",
      totalTx: 167,
      succeededTx: 159,
      failedTx: 8,
      failPercent: "4.8%",
    },
    {
      wallet: "0x5d43...4e16",
      totalTx: 158,
      succeededTx: 151,
      failedTx: 7,
      failPercent: "4.4%",
    },
    {
      wallet: "0xe29...6c83",
      totalTx: 146,
      succeededTx: 132,
      failedTx: 14,
      failPercent: "9.6%",
    },
  ];

  return {
    dailyWalletsData,
    dailyTransactionsData,
    successFailData,
    successfulTransactions,
    failedTransactions,
    transactionsByInstruction,
    walletsByInstruction,
    successRateGroups,
    transactionCountGroups,
    topWallets,
  };
};

export default function SmartContractDashboardPage() {
  const [programId, setProgramId] = useState(
    "DGYPDnxB8hE5Gfqrmrgt7BtLTdgjRF4wGQgYEo3dN49B"
  );
  const [startDate, setStartDate] = useState("2025-05-03");
  const [endDate, setEndDate] = useState("2025-05-12");
  const [period, setPeriod] = useState("daily");

  // Generate mock data for the dashboard
  const {
    dailyWalletsData,
    dailyTransactionsData,
    successFailData,
    successfulTransactions,
    failedTransactions,
    transactionsByInstruction,
    walletsByInstruction,
    successRateGroups,
    transactionCountGroups,
    topWallets,
  } = generateMockData();

  // Calculate totals and rates
  const totalWallets = dailyWalletsData.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const totalTransactions = dailyTransactionsData.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const totalSuccessfulTx = successFailData.reduce(
    (sum, item) => sum + item.success,
    0
  );
  const totalFailedTx = successFailData.reduce(
    (sum, item) => sum + item.failed,
    0
  );
  const successRate = (
    (totalSuccessfulTx / (totalSuccessfulTx + totalFailedTx)) *
    100
  ).toFixed(1);

  return (
    <div className="min-h-screen selection:bg-purple-500/30 selection:text-white">
      {/* Background gradient effect */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[150px] animate-pulse-slower" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[130px] animate-pulse-medium" />
        <div className="absolute top-[60%] left-[30%] w-[350px] h-[350px] bg-indigo-400/10 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      {/* Subtle grid overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Main content container */}
      <div className="container max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8 text-white">
            Smart Contract Dashboard
          </h1>
        </motion.div>

        {/* Input Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="space-y-2">
            <Label htmlFor="programId" className="text-white">
              Program ID
            </Label>
            <Input
              id="programId"
              value={programId}
              onChange={(e) => setProgramId(e.target.value)}
              className="bg-white/5 border-white/20 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-white">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white/5 border-white/20 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-white">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-white/5 border-white/20 text-white"
            />
          </div>
        </motion.div>

        {/* Line Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Daily Wallets Interacting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1"
          >
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 h-full overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium flex justify-between items-center">
                  <span>Daily Wallets Interacting</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 bg-white/5 border-white/10 hover:bg-white/10"
                  >
                    <Download className="h-4 w-4 text-white/70" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dailyWalletsData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorWallets"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b5cf6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
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
                      <Line
                        type="monotone"
                        dataKey="count"
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
                        fillOpacity={1}
                        fill="url(#colorWallets)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Daily Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1"
          >
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 h-full overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium flex justify-between items-center">
                  <span>Daily Transactions</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 bg-white/5 border-white/10 hover:bg-white/10"
                  >
                    <Download className="h-4 w-4 text-white/70" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dailyTransactionsData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorTransactions"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
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
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{
                          r: 3,
                          strokeWidth: 1,
                          stroke: "#3b82f6",
                          fill: "#1e1e1e",
                        }}
                        activeDot={{
                          r: 5,
                          strokeWidth: 2,
                          stroke: "#121212",
                          fill: "#3b82f6",
                        }}
                        fillOpacity={1}
                        fill="url(#colorTransactions)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Success vs Failed Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-1"
          >
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 h-full overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium flex justify-between items-center">
                  <span>Success vs Failed Transactions</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 bg-white/5 border-white/10 hover:bg-white/10"
                  >
                    <Download className="h-4 w-4 text-white/70" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={successFailData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorSuccess"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorFailed"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#ef4444"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#ef4444"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
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
                        dataKey="success"
                        name="Successful"
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
                      <Line
                        type="monotone"
                        dataKey="failed"
                        name="Failed"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{
                          r: 3,
                          strokeWidth: 1,
                          stroke: "#ef4444",
                          fill: "#1e1e1e",
                        }}
                        activeDot={{
                          r: 5,
                          strokeWidth: 2,
                          stroke: "#121212",
                          fill: "#ef4444",
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Contract User Wallets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 pointer-events-none" />
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-sm uppercase tracking-wider opacity-70">
                    Contract User Wallets
                  </h3>
                  <div className="bg-purple-500/20 p-1.5 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-purple-400" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {dailyWalletsData.length > 0
                      ? (totalWallets / dailyWalletsData.length).toFixed(0)
                      : 0}
                  </span>
                  <span className="text-emerald-400 text-sm flex items-center">
                    <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> +12.4%
                  </span>
                </div>
                <p className="text-xs text-white/60 mt-1">
                  Average daily active wallets
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contract Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 pointer-events-none" />
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-sm uppercase tracking-wider opacity-70">
                    Contract Transactions
                  </h3>
                  <div className="bg-blue-500/20 p-1.5 rounded-full">
                    <RefreshCw className="h-5 w-5 text-blue-400" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {dailyTransactionsData.length > 0
                      ? (
                          totalTransactions / dailyTransactionsData.length
                        ).toFixed(0)
                      : 0}
                  </span>
                  <span className="text-emerald-400 text-sm flex items-center">
                    <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> +8.7%
                  </span>
                </div>
                <p className="text-xs text-white/60 mt-1">
                  Average daily transactions
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transaction Success Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-teal-600/5 pointer-events-none" />
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-sm uppercase tracking-wider opacity-70">
                    Transaction Success Rate
                  </h3>
                  <div className="bg-emerald-500/20 p-1.5 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{successRate}%</span>
                  <span className="text-emerald-400 text-sm flex items-center">
                    <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> +1.2%
                  </span>
                </div>
                <div className="mt-2">
                  <Progress
                    value={parseFloat(successRate)}
                    className="h-1.5 bg-white/10 [--progress-foreground:theme(colors.emerald.500)]"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Transaction Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Recent Successful Contract Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium flex items-center gap-2">
                  <span className="bg-emerald-500/20 p-1 rounded">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </span>
                  Recent Successful Contract Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="rounded-md border border-white/10 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="py-2 px-3 text-left font-medium text-white/70">
                          Block Time
                        </th>
                        <th className="py-2 px-3 text-left font-medium text-white/70">
                          Block ID
                        </th>
                        <th className="py-2 px-3 text-left font-medium text-white/70">
                          TX_ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {successfulTransactions.map((tx, index) => (
                        <tr
                          key={index}
                          className="border-t border-white/10 hover:bg-white/5"
                        >
                          <td className="py-2 px-3">{tx.blockTime}</td>
                          <td className="py-2 px-3 text-white/70">
                            {tx.blockId}
                          </td>
                          <td className="py-2 px-3 text-blue-400">{tx.txId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Failed Contract Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium flex items-center gap-2">
                  <span className="bg-rose-500/20 p-1 rounded">
                    <XCircle className="h-4 w-4 text-rose-400" />
                  </span>
                  Recent Failed Contract Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="rounded-md border border-white/10 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="py-2 px-3 text-left font-medium text-white/70">
                          Block Time
                        </th>
                        <th className="py-2 px-3 text-left font-medium text-white/70">
                          Block ID
                        </th>
                        <th className="py-2 px-3 text-left font-medium text-white/70">
                          TX_ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {failedTransactions.map((tx, index) => (
                        <tr
                          key={index}
                          className="border-t border-white/10 hover:bg-white/5"
                        >
                          <td className="py-2 px-3">{tx.blockTime}</td>
                          <td className="py-2 px-3 text-white/70">
                            {tx.blockId}
                          </td>
                          <td className="py-2 px-3 text-rose-400">{tx.txId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contract Instruction Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">
            Contract Instruction Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contract Transaction By Instruction */}
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium">
                  Contract Transaction By Instruction
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={transactionsByInstruction}
                      margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        style={{
                          fontSize: "0.75rem",
                          fill: "rgba(255,255,255,0.6)",
                        }}
                        angle={-15}
                        textAnchor="end"
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
                        formatter={(value) =>
                          new Intl.NumberFormat().format(Number(value))
                        }
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                        {transactionsByInstruction.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              [
                                "#8b5cf6",
                                "#3b82f6",
                                "#ec4899",
                                "#14b8a6",
                                "#f59e0b",
                                "#6366f1",
                              ][index % 6]
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Contract User Wallets by Instruction */}
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium">
                  Contract User Wallets by Instruction
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={walletsByInstruction}
                      margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        style={{
                          fontSize: "0.75rem",
                          fill: "rgba(255,255,255,0.6)",
                        }}
                        angle={-15}
                        textAnchor="end"
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
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                        {walletsByInstruction.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              [
                                "#8b5cf6",
                                "#3b82f6",
                                "#ec4899",
                                "#14b8a6",
                                "#f59e0b",
                                "#6366f1",
                              ][index % 6]
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Contract User Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">
            Contract User Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Wallet by transaction success rate group */}
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium">
                  Wallet by Transaction Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={successRateGroups}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
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
                      <Bar
                        dataKey="value"
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                        fill="#8b5cf6"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Wallets by transaction count group */}
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium">
                  Wallets by Transaction Count
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={transactionCountGroups}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
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
                      <Bar
                        dataKey="value"
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                        fill="#3b82f6"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contract User Wallet Metrics Table */}
          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">
                Contract User Wallet Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="rounded-md border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="py-2 px-3 text-left font-medium text-white/70">
                        Wallet
                      </th>
                      <th className="py-2 px-3 text-left font-medium text-white/70">
                        Total Transactions
                      </th>
                      <th className="py-2 px-3 text-left font-medium text-white/70">
                        Succeeded Transactions
                      </th>
                      <th className="py-2 px-3 text-left font-medium text-white/70">
                        Failed Transactions
                      </th>
                      <th className="py-2 px-3 text-left font-medium text-white/70">
                        Fail Percent
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topWallets.map((wallet, index) => (
                      <tr
                        key={index}
                        className="border-t border-white/10 hover:bg-white/5"
                      >
                        <td className="py-2 px-3 text-blue-400">
                          {wallet.wallet}
                        </td>
                        <td className="py-2 px-3">{wallet.totalTx}</td>
                        <td className="py-2 px-3 text-emerald-400">
                          {wallet.succeededTx}
                        </td>
                        <td className="py-2 px-3 text-rose-400">
                          {wallet.failedTx}
                        </td>
                        <td className="py-2 px-3">
                          <Badge
                            variant="outline"
                            className={`${
                              parseFloat(wallet.failPercent) < 5
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-300/20"
                                : parseFloat(wallet.failPercent) < 10
                                ? "bg-amber-500/20 text-amber-300 border-amber-300/20"
                                : "bg-rose-500/20 text-rose-300 border-rose-300/20"
                            }`}
                          >
                            {wallet.failPercent}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
