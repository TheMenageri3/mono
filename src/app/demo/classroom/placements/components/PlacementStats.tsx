"use client";

import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  Building2,
  Star,
  TrendingUp,
  DollarSign,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const PLACEMENT_STATS = {
  totalPlacements: 156,
  activePlacements: 89,
  pendingPlacements: 23,
  completedPlacements: 44,
  totalStudents: 234,
  availableStudents: 78,
  placedStudents: 156,
  averageSalary: 98500,
  totalJobPostings: 45,
  activeJobPostings: 12,
  companies: 28,
  placementRate: 85.2,
  monthlyGrowth: 12.5,
  topSkills: [
    { skill: "Blockchain", count: 45, growth: "+15%" },
    { skill: "React", count: 67, growth: "+8%" },
    { skill: "Solidity", count: 34, growth: "+22%" },
    { skill: "Node.js", count: 56, growth: "+5%" },
  ],
  recentMetrics: {
    weeklyPlacements: 8,
    avgTimeToPlace: 14, // days
    studentSatisfaction: 4.7,
    employerSatisfaction: 4.5,
  },
};

interface StatCardProps {
  icon: React.ComponentType<any>;
  title: string;
  value: string | number;
  subtitle?: string;
  color: string;
  trend?: string;
  isLoading?: boolean;
}

const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color,
  trend,
  isLoading = false,
}: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="relative overflow-hidden backdrop-blur-md bg-white/[0.01] border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
      {" "}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/60">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white mb-1">
          {isLoading ? (
            <div className="h-8 w-20 bg-white/10 rounded animate-pulse" />
          ) : (
            value
          )}
        </div>
        {subtitle && (
          <div className="flex items-center space-x-2 text-xs">
            <p className="text-white/50">{subtitle}</p>
            {trend && (
              <Badge
                variant="secondary"
                className={`text-xs ${
                  trend.startsWith("+")
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-red-100 text-red-800 border-red-200"
                }`}
              >
                {trend}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 ${color} opacity-20`}
      />
    </Card>
  </motion.div>
);

export default function PlacementStats() {
  return (
    <div className="space-y-6">
      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {" "}
        <StatCard
          icon={Users}
          title="Total Students"
          value={PLACEMENT_STATS.totalStudents.toLocaleString()}
          subtitle={`${PLACEMENT_STATS.availableStudents} available`}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          trend="+12%"
        />
        <StatCard
          icon={Briefcase}
          title="Active Placements"
          value={PLACEMENT_STATS.activePlacements.toLocaleString()}
          subtitle={`${PLACEMENT_STATS.pendingPlacements} pending`}
          color="bg-gradient-to-r from-green-500 to-green-600"
          trend="+8%"
        />{" "}
        <StatCard
          icon={Building2}
          title="Partner Companies"
          value={PLACEMENT_STATS.companies.toLocaleString()}
          subtitle={`${PLACEMENT_STATS.activeJobPostings} active jobs`}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          trend="+5%"
        />
        <StatCard
          icon={DollarSign}
          title="Avg. Salary"
          value={`$${(PLACEMENT_STATS.averageSalary / 1000).toFixed(0)}k`}
          subtitle="Annual starting salary"
          color="bg-gradient-to-r from-yellow-500 to-yellow-600"
          trend="+8.5%"
        />
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          icon={TrendingUp}
          title="Placement Rate"
          value={`${PLACEMENT_STATS.placementRate}%`}
          color="bg-gradient-to-r from-emerald-500 to-emerald-600"
          trend={`+${PLACEMENT_STATS.monthlyGrowth}%`}
        />{" "}
        <StatCard
          icon={Calendar}
          title="Weekly Placements"
          value={PLACEMENT_STATS.recentMetrics.weeklyPlacements}
          subtitle="This week"
          color="bg-gradient-to-r from-indigo-500 to-indigo-600"
          trend="+2"
        />
        <StatCard
          icon={Clock}
          title="Avg. Time to Place"
          value={`${PLACEMENT_STATS.recentMetrics.avgTimeToPlace} days`}
          subtitle="From application"
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          trend="-3 days"
        />{" "}
        <StatCard
          icon={Star}
          title="Student Rating"
          value={PLACEMENT_STATS.recentMetrics.studentSatisfaction.toFixed(1)}
          subtitle="Satisfaction score"
          color="bg-gradient-to-r from-pink-500 to-pink-600"
          trend="+0.2"
        />
        <StatCard
          icon={Award}
          title="Employer Rating"
          value={PLACEMENT_STATS.recentMetrics.employerSatisfaction.toFixed(1)}
          subtitle="Satisfaction score"
          color="bg-gradient-to-r from-cyan-500 to-cyan-600"
          trend="+0.1"
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {" "}
        {/* Placement Status Overview */}
        <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span>Placement Status</span>
            </CardTitle>
            <CardDescription className="text-white/60">
              Current status of all student placements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-white">Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-white/60">
                    {PLACEMENT_STATS.activePlacements}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {(
                      (PLACEMENT_STATS.activePlacements /
                        PLACEMENT_STATS.totalPlacements) *
                      100
                    ).toFixed(1)}
                    %
                  </Badge>
                </div>
              </div>
              <Progress
                value={
                  (PLACEMENT_STATS.activePlacements /
                    PLACEMENT_STATS.totalPlacements) *
                  100
                }
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-sm font-medium text-white">
                    Pending
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-white/60">
                    {PLACEMENT_STATS.pendingPlacements}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {(
                      (PLACEMENT_STATS.pendingPlacements /
                        PLACEMENT_STATS.totalPlacements) *
                      100
                    ).toFixed(1)}
                    %
                  </Badge>
                </div>
              </div>
              <Progress
                value={
                  (PLACEMENT_STATS.pendingPlacements /
                    PLACEMENT_STATS.totalPlacements) *
                  100
                }
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-sm font-medium text-white">
                    Completed
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-white/60">
                    {PLACEMENT_STATS.completedPlacements}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {(
                      (PLACEMENT_STATS.completedPlacements /
                        PLACEMENT_STATS.totalPlacements) *
                      100
                    ).toFixed(1)}
                    %
                  </Badge>
                </div>
              </div>
              <Progress
                value={
                  (PLACEMENT_STATS.completedPlacements /
                    PLACEMENT_STATS.totalPlacements) *
                  100
                }
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
        {/* Top Skills */}
        <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Award className="w-5 h-5 text-purple-400" />
              <span>Top Skills in Demand</span>
            </CardTitle>
            <CardDescription className="text-white/60">
              Most requested skills by employers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {PLACEMENT_STATS.topSkills.map((skill, index) => (
                <motion.div
                  key={skill.skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/10 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-500/20 rounded-full">
                      <span className="text-sm font-semibold text-blue-400">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{skill.skill}</p>
                      <p className="text-sm text-white/50">
                        {skill.count} students
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-500/20 text-green-400 border-green-500/30"
                  >
                    {skill.growth}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
