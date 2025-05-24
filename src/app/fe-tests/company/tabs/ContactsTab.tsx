"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Calendar,
  User,
  MessagesSquare,
  Video,
  ArrowRight,
  Globe,
  Share2,
  Building,
  HeartHandshake,
  Newspaper,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ContactsTab() {
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null);

  const teamMembers = [
    {
      id: 1,
      initials: "ER",
      name: "Elena Rivera",
      title: "Chief Technology Officer",
      email: "elena@blockchaindynamics.io",
      phone: "+1 (512) 555-0123",
      description:
        "Blockchain architecture expert with 12+ years in distributed systems. Previously led engineering at Consensys.",
      availability: "Available next week",
      avatar: "",
    },
    {
      id: 2,
      initials: "MW",
      name: "Marcus Wei",
      title: "Head of Business Development",
      email: "marcus@blockchaindynamics.io",
      phone: "+1 (512) 555-0187",
      description:
        "Strategic partnership specialist with deep connections in fintech and enterprise blockchain adoption.",
      availability: "Available tomorrow",
      avatar: "",
    },
    {
      id: 3,
      initials: "SJ",
      name: "Sophia Johnson",
      title: "Product Lead",
      email: "sophia@blockchaindynamics.io",
      phone: "+1 (512) 555-0199",
      description:
        "Product visionary focused on creating intuitive interfaces for complex blockchain systems.",
      availability: "Out of office until May 30",
      avatar: "",
    },
    {
      id: 4,
      initials: "JR",
      name: "James Rodriguez",
      title: "Head of Security",
      email: "james@blockchaindynamics.io",
      phone: "+1 (512) 555-0144",
      description:
        "Cybersecurity expert specializing in threat modeling and smart contract audits.",
      availability: "Available this week",
      avatar: "",
    },
  ];

  const contactChannels = [
    {
      name: "Enterprise Sales",
      description: "For large businesses and custom solutions",
      email: "enterprise@blockchaindynamics.io",
      phone: "+1 (512) 555-8000",
      icon: <Building className="h-5 w-5 text-purple-400" />,
    },
    {
      name: "Technical Support",
      description: "Help with implementation and troubleshooting",
      email: "support@blockchaindynamics.io",
      phone: "+1 (512) 555-8100",
      icon: <HeartHandshake className="h-5 w-5 text-blue-400" />,
    },
    {
      name: "Media Inquiries",
      description: "Press and partnership opportunities",
      email: "media@blockchaindynamics.io",
      phone: "+1 (512) 555-8200",
      icon: <Newspaper className="h-5 w-5 text-emerald-400" />,
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
          Key Contacts
        </h2>
        <p className="text-white/60 mt-2">
          Connect with our leadership team and specialized departments
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Leadership Team
              </CardTitle>
              <CardDescription>
                Connect with our blockchain experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() =>
                      setActiveTeamMember(
                        member.id === activeTeamMember ? null : member.id
                      )
                    }
                    className={`p-4 border rounded-lg transition-all cursor-pointer ${
                      activeTeamMember === member.id
                        ? "bg-white/10 border-purple-500/30"
                        : "bg-white/5 border-white/10 hover:bg-white/[0.07]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 rounded-lg border border-white/10 bg-gradient-to-br from-purple-500/30 to-blue-500/30">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-sm font-medium">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-purple-300">
                          {member.title}
                        </div>
                      </div>
                    </div>

                    {activeTeamMember === member.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 space-y-4 overflow-hidden"
                      >
                        <p className="text-sm text-white/70">
                          {member.description}
                        </p>

                        <div className="pt-2 border-t border-white/10">
                          <div className="text-xs text-white/50 mb-2">
                            Contact Information
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <a
                              href={`mailto:${member.email}`}
                              className="flex items-center gap-2 p-2 bg-white/5 rounded-md hover:bg-white/[0.07] transition-colors"
                            >
                              <Mail className="h-3.5 w-3.5 text-purple-400" />
                              <span className="text-xs overflow-hidden overflow-ellipsis">
                                {member.email}
                              </span>
                            </a>

                            <a
                              href={`tel:${member.phone}`}
                              className="flex items-center gap-2 p-2 bg-white/5 rounded-md hover:bg-white/[0.07] transition-colors"
                            >
                              <Phone className="h-3.5 w-3.5 text-blue-400" />
                              <span className="text-xs">{member.phone}</span>
                            </a>
                          </div>

                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 h-5 px-2">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span className="text-[10px]">
                                {member.availability}
                              </span>
                            </Badge>

                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs bg-white/5 border-white/10 px-2"
                            >
                              Schedule Meeting
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Departments</CardTitle>
              <CardDescription>
                Specialized teams for your needs
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {contactChannels.map((channel, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-md bg-white/10">
                        {channel.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{channel.name}</h3>
                        <p className="text-xs text-white/60">
                          {channel.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <a
                        href={`mailto:${channel.email}`}
                        className="text-xs flex items-center justify-center gap-1.5 p-1.5 bg-white/5 rounded-md hover:bg-white/[0.07] transition-colors"
                      >
                        <Mail className="h-3 w-3" />
                        <span>Email</span>
                      </a>
                      <a
                        href={`tel:${channel.phone}`}
                        className="text-xs flex items-center justify-center gap-1.5 p-1.5 bg-white/5 rounded-md hover:bg-white/[0.07] transition-colors"
                      >
                        <Phone className="h-3 w-3" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Quick Connect
              </CardTitle>
              <CardDescription>
                Available communication channels
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <TooltipProvider>
                  {[
                    {
                      icon: <Mail className="h-5 w-5" />,
                      label: "Email",
                    },
                    {
                      icon: <MessagesSquare className="h-5 w-5" />,
                      label: "Chat",
                    },
                    {
                      icon: <Video className="h-5 w-5" />,
                      label: "Video",
                    },
                    {
                      icon: <Share2 className="h-5 w-5" />,
                      label: "Share",
                    },
                    {
                      icon: <Globe className="h-5 w-5" />,
                      label: "Website",
                    },
                    {
                      icon: <Calendar className="h-5 w-5" />,
                      label: "Schedule",
                    },
                  ].map((item, idx) => (
                    <Tooltip key={idx}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-white/5 hover:bg-white/10 border-white/10 w-full py-6 gap-2 flex-col"
                        >
                          {item.icon}
                          <span className="text-xs">{item.label}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Connect via {item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>

              <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-lg text-center">
                <User className="h-5 w-5 text-purple-400 mx-auto mb-2" />
                <h3 className="font-medium mb-1 text-sm">
                  Need personalized help?
                </h3>
                <p className="text-xs text-white/60 mb-3">
                  Our team is ready to provide tailored solutions
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600">
                  Request Consultation
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 grid grid-cols-1 gap-6"
      >
        <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 mb-2">
                  Ready to transform your blockchain strategy?
                </h3>
                <p className="text-white/60 max-w-lg">
                  Schedule a call with our team to explore how our solutions can
                  meet your specific needs
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Demo
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/5 border-white/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Sales
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
