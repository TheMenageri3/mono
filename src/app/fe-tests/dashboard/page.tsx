"use client";

import { useState, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  User,
  Star,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ArrowUpRight,
  Clock8,
  Send,
  Check,
  ChevronRight,
  MessageCircle,
  FileText,
  Globe,
  Settings,
  Bot,
  Edit2,
  Hexagon,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock customer data
const customers = [
  {
    id: "cust_001",
    name: "Emma Johnson",
    company: "TechFlow Solutions",
    email: "emma@techflow.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://github.com/shadcn.png",
    status: "active", // active, at-risk, inactive
    value: 158000,
    lastContact: "2 hours ago",
    nextMeeting: "Tomorrow, 11:30 AM",
    tags: ["Enterprise", "SaaS", "High Value"],
    interactions: [
      {
        type: "email",
        date: "May 10, 2025",
        content: "Sent follow-up on implementation timeline",
        sentiment: "positive",
      },
      {
        type: "call",
        date: "May 8, 2025",
        content: "Discussed renewal options and potential upgrades",
        sentiment: "positive",
      },
      {
        type: "meeting",
        date: "May 5, 2025",
        content:
          "Quarterly review - client expressed satisfaction with product",
        sentiment: "positive",
      },
    ],
    notes:
      "Key decision-maker is Emma. Renewal coming up in 3 months. Looking to expand to additional departments.",
  },
  {
    id: "cust_002",
    name: "Michael Chen",
    company: "Innovate Financial",
    email: "mchen@innovatefin.com",
    phone: "+1 (555) 987-6543",
    avatar: "https://github.com/shadcn.png",
    status: "at-risk",
    value: 89500,
    lastContact: "6 days ago",
    nextMeeting: "Not scheduled",
    tags: ["Financial", "Mid-Market", "Integration Issues"],
    interactions: [
      {
        type: "support",
        date: "May 7, 2025",
        content: "Opened ticket #4582 regarding API connection failures",
        sentiment: "negative",
      },
      {
        type: "email",
        date: "May 3, 2025",
        content: "Expressed frustration with recent downtime",
        sentiment: "negative",
      },
      {
        type: "call",
        date: "April 28, 2025",
        content:
          "Discussed ongoing technical issues - client considering alternatives",
        sentiment: "negative",
      },
    ],
    notes:
      "URGENT: Schedule technical review. Client experiencing integration issues and has mentioned competitor offerings.",
  },
  {
    id: "cust_003",
    name: "Sarah Wilson",
    company: "Global Retail Group",
    email: "swilson@grgroup.com",
    phone: "+1 (555) 333-9876",
    avatar: "https://github.com/shadcn.png",
    status: "active",
    value: 215000,
    lastContact: "Yesterday",
    nextMeeting: "May 18, 2025",
    tags: ["Retail", "Enterprise", "Expansion Opportunity"],
    interactions: [
      {
        type: "meeting",
        date: "May 11, 2025",
        content: "Strategic planning for Q3 rollout to additional stores",
        sentiment: "positive",
      },
      {
        type: "email",
        date: "May 9, 2025",
        content: "Requested additional user licenses for new department",
        sentiment: "positive",
      },
      {
        type: "call",
        date: "May 5, 2025",
        content: "Discussed feature requests for next product update",
        sentiment: "neutral",
      },
    ],
    notes:
      "Expansion opportunity - client looking to implement in 20+ additional store locations in Q3.",
  },
  {
    id: "cust_004",
    name: "David Rodriguez",
    company: "Rodriguez & Associates",
    email: "david@rodriguezlaw.com",
    phone: "+1 (555) 444-5555",
    avatar: "https://github.com/shadcn.png",
    status: "inactive",
    value: 42000,
    lastContact: "3 weeks ago",
    nextMeeting: "Not scheduled",
    tags: ["Legal", "Small Business", "Churn Risk"],
    interactions: [
      {
        type: "email",
        date: "April 22, 2025",
        content: "No response to renewal notification",
        sentiment: "negative",
      },
      {
        type: "call",
        date: "April 15, 2025",
        content: "Left voicemail regarding upcoming contract expiration",
        sentiment: "neutral",
      },
      {
        type: "meeting",
        date: "March 30, 2025",
        content: "Expressed concerns about ROI and user adoption",
        sentiment: "negative",
      },
    ],
    notes:
      "Contract expires in 30 days. Multiple attempts to contact with no response. Usage metrics show significant decline in past quarter.",
  },
  {
    id: "cust_005",
    name: "Jennifer Lopez",
    company: "HealthFirst Medical",
    email: "jlopez@healthfirst.org",
    phone: "+1 (555) 777-9999",
    avatar: "https://github.com/shadcn.png",
    status: "active",
    value: 178500,
    lastContact: "4 days ago",
    nextMeeting: "May 15, 2025",
    tags: ["Healthcare", "Enterprise", "Compliance"],
    interactions: [
      {
        type: "email",
        date: "May 8, 2025",
        content: "Requested updated compliance documentation for audit",
        sentiment: "neutral",
      },
      {
        type: "meeting",
        date: "May 4, 2025",
        content: "Security review with IT team - passed all requirements",
        sentiment: "positive",
      },
      {
        type: "call",
        date: "April 29, 2025",
        content: "Discussed potential expansion to research department",
        sentiment: "positive",
      },
    ],
    notes:
      "HIPAA compliance critical. Main contact transitioning to new role - need to establish relationship with replacement.",
  },
];

export default function CRMDashboardPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomersForMessage, setSelectedCustomersForMessage] =
    useState<string[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState("email");
  const [messageContent, setMessageContent] = useState("");
  const [messageSubject, setMessageSubject] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("none");
  const [showMessageComposer, setShowMessageComposer] = useState(false);

  // Get customer details when selected
  const selectedCustomerData = customers.find((c) => c.id === selectedCustomer);

  // Filter customers based on active tab and search query
  const filteredCustomers = customers.filter((customer) => {
    const matchesTab = activeTab === "all" || customer.status === activeTab;
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Status helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500";
      case "at-risk":
        return "bg-amber-500";
      case "inactive":
        return "bg-rose-500";
      default:
        return "bg-slate-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "at-risk":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "inactive":
        return <XCircle className="h-4 w-4 text-rose-500" />;
      default:
        return null;
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90 } },
  };

  // Toggle customer selection for messaging
  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomersForMessage((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  const isAllCustomersSelected =
    filteredCustomers.length > 0 &&
    filteredCustomers.every((customer) =>
      selectedCustomersForMessage.includes(customer.id)
    );

  const toggleSelectAllCustomers = () => {
    if (isAllCustomersSelected) {
      setSelectedCustomersForMessage([]);
    } else {
      setSelectedCustomersForMessage(
        filteredCustomers.map((customer) => customer.id)
      );
    }
  };

  // Mock message templates
  const messageTemplates = [
    {
      id: "none",
      name: "No Template",
      subject: "",
      content: "",
    },
    {
      id: "follow_up",
      name: "Follow-up Meeting",
      subject: "Following up on our recent discussion",
      content:
        "Hi {name},\n\nI hope this message finds you well. I wanted to follow up on our recent conversation about {topic}. Have you had a chance to review the materials I sent over?\n\nLooking forward to your thoughts.\n\nBest regards,\nYour Name",
    },
    {
      id: "product_update",
      name: "Product Update",
      subject: "Important update to our services",
      content:
        "Hi {name},\n\nI'm excited to share some important updates to our platform that I believe will benefit {company}.\n\nWe've recently launched new features that address some of the challenges we discussed in our last meeting, specifically around {topic}.\n\nWould you be available for a quick call this week to discuss how these updates can support your goals?\n\nBest regards,\nYour Name",
    },
    {
      id: "web3",
      name: "Web3 Integration",
      subject: "Blockchain integration opportunities",
      content:
        "Hi {name},\n\nI noticed {company} has been exploring web3 technologies, and I wanted to share how our blockchain solutions can enhance your current infrastructure.\n\nOur seamless wallet integration and smart contract management tools could provide significant advantages for your upcoming projects.\n\nWould you be interested in a demo focused on your specific use case?\n\nBest regards,\nYour Name",
    },
  ];

  // Handle template selection
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = messageTemplates.find((t) => t.id === templateId);
    if (template && template.id !== "none") {
      setMessageSubject(template.subject);
      setMessageContent(template.content);
    }
  };

  const handleSendMessage = () => {
    // This would integrate with a real messaging system
    console.log("Sending message to:", selectedCustomersForMessage);
    console.log("Platform:", selectedPlatform);
    console.log("Subject:", messageSubject);
    console.log("Content:", messageContent);

    // Reset after sending
    setShowMessageComposer(false);
    setMessageSubject("");
    setMessageContent("");
    setSelectedTemplate("none");
    // Optionally clear selected customers if you want
    // setSelectedCustomersForMessage([]);
  };

  // Get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "discord":
        return <MessageCircle className="h-4 w-4" />;
      case "telegram":
        return <Send className="h-4 w-4" />;
      case "wallet":
        return <Hexagon className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Background gradient effect */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-fuchsia-500/20 rounded-full blur-[100px]" />
      </div>

      {/* Subtle grid overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Main content container */}
      <div className="container max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Customer Relations
          </h1>
          <p className="text-white/60 mt-2">
            Track customer interactions, status, and opportunities
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer List */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
              <CardHeader className="bg-white/5 p-4 border-b border-white/5">
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <div className="flex-1">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input
                        placeholder="Search customers..."
                        className="bg-white/5 border-white/10 pl-10 text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/10 text-white"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </CardHeader>

              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <CardContent className="p-0 pt-0">
                  <div className="flex justify-between items-center bg-white/[0.01] border-b border-white/5 px-4">
                    <TabsList className="bg-white/[0.01] w-full justify-start rounded-none p-0 border-0">
                      <TabsTrigger
                        value="all"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-white/5 data-[state=active]:text-white py-3 px-4 text-white/70"
                      >
                        All
                      </TabsTrigger>
                      <TabsTrigger
                        value="active"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-white/5 data-[state=active]:text-white py-3 px-4 text-white/70"
                      >
                        Active
                      </TabsTrigger>
                      <TabsTrigger
                        value="at-risk"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-white/5 data-[state=active]:text-white py-3 px-4 text-white/70"
                      >
                        At Risk
                      </TabsTrigger>
                      <TabsTrigger
                        value="inactive"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-rose-500 data-[state=active]:bg-white/5 data-[state=active]:text-white py-3 px-4 text-white/70"
                      >
                        Inactive
                      </TabsTrigger>
                    </TabsList>

                    {selectedCustomersForMessage.length > 0 && (
                      <Button
                        size="sm"
                        onClick={() => setShowMessageComposer(true)}
                        className="bg-purple-600 hover:bg-purple-700 my-1"
                      >
                        <Send className="h-3.5 w-3.5 mr-1.5" />
                        Message ({selectedCustomersForMessage.length})
                      </Button>
                    )}
                  </div>
                </CardContent>

                <TabsContent value={activeTab} className="m-0 p-0">
                  <div className="p-2 flex items-center gap-2 bg-white/[0.03] border-b border-white/5">
                    <Checkbox
                      id="select-all"
                      checked={isAllCustomersSelected}
                      onCheckedChange={toggleSelectAllCustomers}
                      className="border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <label
                      htmlFor="select-all"
                      className="text-xs text-white/60"
                    >
                      Select All
                    </label>
                  </div>
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="divide-y divide-white/5"
                  >
                    {filteredCustomers.length === 0 && (
                      <div className="p-6 text-center text-white/60">
                        No customers found matching your criteria
                      </div>
                    )}

                    {filteredCustomers.map((customer) => (
                      <motion.div
                        key={customer.id}
                        variants={item}
                        className={cn(
                          "p-4 hover:bg-white/5 transition-colors flex items-center gap-4",
                          customer.id === selectedCustomer ? "bg-white/5" : ""
                        )}
                      >
                        <Checkbox
                          checked={selectedCustomersForMessage.includes(
                            customer.id
                          )}
                          onCheckedChange={() =>
                            toggleCustomerSelection(customer.id)
                          }
                          className="border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />

                        <div
                          className="flex items-center gap-4 flex-1 cursor-pointer"
                          onClick={() =>
                            setSelectedCustomer(
                              customer.id === selectedCustomer
                                ? null
                                : customer.id
                            )
                          }
                        >
                          <div className="relative">
                            <Avatar className="h-12 w-12 border border-white/10">
                              <AvatarImage
                                src={customer.avatar}
                                alt={customer.name}
                              />
                              <AvatarFallback className="bg-purple-900/50 text-white">
                                {customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            {/* Status indicator with glow effect and subtle animation */}
                            <div className="absolute -bottom-0.5 -right-0.5">
                              <div
                                className={cn(
                                  "flex items-center justify-center h-4 w-4 rounded-full",
                                  customer.status === "active"
                                    ? "bg-[#121212]"
                                    : customer.status === "at-risk"
                                    ? "bg-[#121212]"
                                    : "bg-[#121212]"
                                )}
                              >
                                <div
                                  className={cn(
                                    "h-2.5 w-2.5 rounded-full animate-pulse shadow-md",
                                    customer.status === "active"
                                      ? "bg-emerald-500 shadow-emerald-500/30"
                                      : customer.status === "at-risk"
                                      ? "bg-amber-500 shadow-amber-500/30"
                                      : "bg-rose-500 shadow-rose-500/30"
                                  )}
                                ></div>
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium truncate">
                                {customer.name}
                              </h3>
                              <Badge
                                variant="outline"
                                className="ml-2 border-white/10 text-xs whitespace-nowrap"
                              >
                                ${(customer.value / 1000).toFixed(0)}k
                              </Badge>
                            </div>
                            <div className="text-sm text-white/60 truncate">
                              {customer.company}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {customer.tags.slice(0, 2).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="bg-white/5 text-white/80 border-white/10 text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {customer.tags.length > 2 && (
                                <Badge
                                  variant="outline"
                                  className="bg-white/5 text-white/60 border-white/10 text-xs"
                                >
                                  +{customer.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>

          {/* Customer Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 h-full">
              <CardHeader className="bg-white/5 p-4 border-b border-white/5">
                <CardTitle className="text-lg font-medium">
                  Customer Details
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                {!selectedCustomerData ? (
                  <div className="h-96 flex flex-col items-center justify-center text-white/40 p-6">
                    <User className="h-12 w-12 mb-4 opacity-50" />
                    <p className="text-center">
                      Select a customer to view their details
                    </p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 border-b border-white/5">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-16 w-16 border-2 border-white/10">
                          <AvatarImage
                            src={selectedCustomerData.avatar}
                            alt={selectedCustomerData.name}
                          />
                          <AvatarFallback className="bg-purple-900/50 text-white text-lg">
                            {selectedCustomerData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-xl font-semibold">
                            {selectedCustomerData.name}
                          </h2>
                          <p className="text-white/60">
                            {selectedCustomerData.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(selectedCustomerData.status)}
                        <span className="capitalize">
                          {selectedCustomerData.status === "at-risk"
                            ? "At Risk"
                            : selectedCustomerData.status}
                        </span>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-white/60" />
                          <a
                            href={`mailto:${selectedCustomerData.email}`}
                            className="text-sm hover:underline"
                          >
                            {selectedCustomerData.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-white/60" />
                          <a
                            href={`tel:${selectedCustomerData.phone}`}
                            className="text-sm hover:underline"
                          >
                            {selectedCustomerData.phone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-white/60" />
                          <span className="text-sm">
                            Last contact: {selectedCustomerData.lastContact}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-white/60" />
                          <span className="text-sm">
                            Next meeting: {selectedCustomerData.nextMeeting}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border-b border-white/5">
                      <h3 className="font-medium mb-3">Recent Interactions</h3>
                      <div className="space-y-4">
                        {selectedCustomerData.interactions.map(
                          (interaction, i) => (
                            <div key={i} className="relative pl-6">
                              <div className="absolute left-0 top-1.5">
                                {interaction.type === "email" && (
                                  <Mail className="h-4 w-4 text-white/60" />
                                )}
                                {interaction.type === "call" && (
                                  <Phone className="h-4 w-4 text-white/60" />
                                )}
                                {interaction.type === "meeting" && (
                                  <Calendar className="h-4 w-4 text-white/60" />
                                )}
                                {interaction.type === "support" && (
                                  <MessageSquare className="h-4 w-4 text-white/60" />
                                )}
                              </div>

                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium capitalize">
                                    {interaction.type}
                                  </span>
                                  <span className="text-xs text-white/60">
                                    {interaction.date}
                                  </span>
                                </div>
                                <p className="text-sm text-white/80">
                                  {interaction.content}
                                </p>
                                <div className="mt-1">
                                  <Badge
                                    className={cn(
                                      "text-xs px-1.5 py-0",
                                      interaction.sentiment === "positive"
                                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                        : interaction.sentiment === "negative"
                                        ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                                        : "bg-white/10 text-white/70 border-white/20"
                                    )}
                                  >
                                    {interaction.sentiment}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-medium mb-2">Notes</h3>
                      <p className="text-sm text-white/70">
                        {selectedCustomerData.notes}
                      </p>
                    </div>
                  </motion.div>
                )}
              </CardContent>

              <CardFooter className="px-6 py-4 border-t border-white/5 flex justify-between">
                <Button
                  disabled={!selectedCustomerData}
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button
                  disabled={!selectedCustomerData}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6"
        >
          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-sm uppercase tracking-wider opacity-70">
                  Active Customers
                </h3>
                <div className="bg-emerald-500/20 p-1.5 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">68%</span>
                <span className="text-emerald-400 text-sm flex items-center">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> +2.4%
                </span>
              </div>
              <p className="text-xs text-white/60 mt-1">
                132 of 194 customers active
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-sm uppercase tracking-wider opacity-70">
                  At Risk
                </h3>
                <div className="bg-amber-500/20 p-1.5 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">19%</span>
                <span className="text-rose-400 text-sm flex items-center">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> +5.1%
                </span>
              </div>
              <p className="text-xs text-white/60 mt-1">
                37 customers need attention
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-sm uppercase tracking-wider opacity-70">
                  Monthly Revenue
                </h3>
                <div className="bg-indigo-500/20 p-1.5 rounded-full">
                  <RefreshCw className="h-5 w-5 text-indigo-400" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">$683k</span>
                <span className="text-emerald-400 text-sm flex items-center">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> +8.2%
                </span>
              </div>
              <p className="text-xs text-white/60 mt-1">Updated 2 hours ago</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-sm uppercase tracking-wider opacity-70">
                  Pending Tasks
                </h3>
                <div className="bg-purple-500/20 p-1.5 rounded-full">
                  <Clock8 className="h-5 w-5 text-purple-400" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">28</span>
                <span className="text-amber-400 text-sm flex items-center">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> +4
                </span>
              </div>
              <p className="text-xs text-white/60 mt-1">
                12 high priority tasks
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <div className="mt-6" />

        {/* Message Composer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />

            <CardHeader className="bg-white/5 border-b border-white/5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  Multi-Platform Messaging
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/5 border-white/10 text-white"
                  onClick={() => setShowMessageComposer(!showMessageComposer)}
                >
                  {showMessageComposer ? "Hide" : "Show"}
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${
                      showMessageComposer ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>
              <CardDescription className="text-white/60">
                Send targeted messages across multiple platforms to your
                selected customers
              </CardDescription>
            </CardHeader>

            <AnimatePresence>
              {showMessageComposer && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Left Column - Recipients */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-3 flex items-center">
                            <User className="h-4 w-4 mr-2 text-purple-400" />
                            Recipients
                          </h3>
                          <div className="bg-white/5 rounded-lg border border-white/10 p-3 max-h-[200px] overflow-y-auto">
                            {selectedCustomersForMessage.length === 0 ? (
                              <p className="text-white/40 text-sm text-center py-6">
                                No recipients selected
                              </p>
                            ) : (
                              <div className="flex flex-wrap gap-2">
                                {selectedCustomersForMessage.map(
                                  (customerId) => {
                                    const customer = customers.find(
                                      (c) => c.id === customerId
                                    );
                                    if (!customer) return null;

                                    return (
                                      <Badge
                                        key={customer.id}
                                        className="bg-purple-500/20 text-purple-300 border-purple-500/30 py-1 px-2 flex items-center gap-1.5"
                                      >
                                        <span className="max-w-[150px] truncate">
                                          {customer.name}
                                        </span>
                                        <button
                                          onClick={() =>
                                            toggleCustomerSelection(customer.id)
                                          }
                                          className="hover:text-white"
                                        >
                                          <XCircle className="h-3 w-3" />
                                        </button>
                                      </Badge>
                                    );
                                  }
                                )}
                              </div>
                            )}
                          </div>
                          <div className="mt-2 text-xs text-white/60">
                            {selectedCustomersForMessage.length} recipient(s)
                            selected
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3 flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-purple-400" />
                            Platform
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    className={cn(
                                      "p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-colors",
                                      selectedPlatform === "email"
                                        ? "bg-purple-500/20 border-purple-500/30 text-purple-300"
                                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                                    )}
                                    onClick={() => setSelectedPlatform("email")}
                                  >
                                    <Mail className="h-5 w-5" />
                                    <span className="text-xs">Email</span>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  <p>Send via email</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    className={cn(
                                      "p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-colors",
                                      selectedPlatform === "discord"
                                        ? "bg-purple-500/20 border-purple-500/30 text-purple-300"
                                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                                    )}
                                    onClick={() =>
                                      setSelectedPlatform("discord")
                                    }
                                  >
                                    <MessageCircle className="h-5 w-5" />
                                    <span className="text-xs">Discord</span>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  <p>Send via Discord DM</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    className={cn(
                                      "p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-colors",
                                      selectedPlatform === "telegram"
                                        ? "bg-purple-500/20 border-purple-500/30 text-purple-300"
                                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                                    )}
                                    onClick={() =>
                                      setSelectedPlatform("telegram")
                                    }
                                  >
                                    <Send className="h-5 w-5" />
                                    <span className="text-xs">Telegram</span>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  <p>Send via Telegram</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild></TooltipTrigger>
                                <TooltipContent side="bottom">
                                  <p>Send to web3 wallet</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3 flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-purple-400" />
                            Templates
                          </h3>
                          <Select
                            value={selectedTemplate}
                            onValueChange={handleTemplateChange}
                          >
                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                              <SelectValue placeholder="Select a template" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-white/10 text-white">
                              {messageTemplates.map((template) => (
                                <SelectItem
                                  key={template.id}
                                  value={template.id}
                                  className="focus:bg-purple-900/30 focus:text-white"
                                >
                                  {template.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Right Column - Message Content */}
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <h3 className="font-medium mb-3 flex items-center">
                            <Edit2 className="h-4 w-4 mr-2 text-purple-400" />
                            Message
                          </h3>

                          {selectedPlatform === "email" && (
                            <div className="mb-4">
                              <label className="block text-sm text-white/60 mb-1">
                                Subject
                              </label>
                              <Input
                                value={messageSubject}
                                onChange={(e) =>
                                  setMessageSubject(e.target.value)
                                }
                                placeholder="Enter email subject..."
                                className="bg-white/5 border-white/10 text-white"
                              />
                            </div>
                          )}

                          <Textarea
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            placeholder="Write your message..."
                            className="min-h-[200px] bg-white/5 border-white/10 text-white"
                          />

                          <div className="text-xs text-white/40 mt-2 flex items-center gap-1.5">
                            <Bot className="h-3.5 w-3.5" />
                            <span>
                              Use {"{name}"} and {"{company}"} as placeholders
                              for personalization
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                          <div className="flex items-center">
                            <Badge
                              variant="outline"
                              className="bg-white/5 border-white/10 flex items-center"
                            >
                              {getPlatformIcon(selectedPlatform)}
                              <span className="ml-1 capitalize">
                                {selectedPlatform}
                              </span>
                            </Badge>
                            <span className="text-white/60 text-sm mx-2">
                              •
                            </span>
                            <span className="text-white/60 text-sm">
                              {selectedCustomersForMessage.length} recipient(s)
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="bg-white/5 border-white/10 text-white"
                              onClick={() => {
                                setMessageSubject("");
                                setMessageContent("");
                                setSelectedTemplate("none");
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Clear
                            </Button>
                            <Button
                              className="bg-purple-600 hover:bg-purple-700"
                              onClick={handleSendMessage}
                              disabled={
                                selectedCustomersForMessage.length === 0 ||
                                messageContent.trim() === ""
                              }
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Send
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>

            {!showMessageComposer && (
              <CardFooter className="px-6 py-4 border-t border-white/5 flex justify-between">
                <div className="text-white/60 text-sm">
                  Select recipients and send messages across multiple platforms
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/5 border-white/10 text-white"
                  onClick={() => setShowMessageComposer(true)}
                >
                  Open Composer
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
