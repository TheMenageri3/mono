"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Heart,
  Target,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MoreGreatEvents from "./MoreGreatEvents";

interface EventsResultsPageProps {
  userChoice: any;
  onNext: () => void;
}

export default function EventsResultsPage({
  userChoice,
  onNext,
}: EventsResultsPageProps) {
  const router = useRouter();
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  // MtnDAO as the featured/recommended event
  const featuredEvent = {
    id: "mtndao-build",
    title: "MtnDAO Builder Bootcamp",
    provider: "MtnDAO",
    description:
      "mtnDAO is a month long, action packed startup experience that takes place in Salt Lake City for the month of August. Come to connect with some of the best minds in the space, and start your next venture!",
    matchScore: 94,
    location: "Salt Lake City, UT",
    date: "August 1st-28",
    time: "24/7",
    price: "Free",
    difficulty: "Beginner to Expert",
    category: "Development",
    attendees: 500,
    maxAttendees: "No Limit",
    tags: ["Solidity", "DeFi", "Smart Contracts", "Networking"],
    highlights: [
      "Week 2 (8-14th) is centered around gaming",
      "Multiple former FAANG employees you can connect with",
      "Workshops for new solana developers",
      "Founders working in the GameFi space will be there",
    ],
    speakers: [
      {
        name: "Gabrielle Picco",
        role: "Founder",
        company: "Magicblock",
        avatar: "👩‍💼",
      },
      {
        name: "spacemandev",
        role: "Founder",
        company: "Spaceman Gaming",
        avatar: "👨‍🚀",
      },
    ],
    agenda: [
      { time: "9:00 AM", title: "Welcome & Web3 Landscape" },
      { time: "10:30 AM", title: "Solidity Fundamentals" },
      { time: "2:00 PM", title: "Building Your First DApp" },
      { time: "4:30 PM", title: "Networking & Project Showcase" },
    ],
  };
  // Other rotating events
  const otherEvents = [
    {
      id: "eth-denver",
      title: "ETHDenver 2024",
      provider: "SporkDAO",
      description:
        "The largest Web3 #BUIDLathon in the world! Join 20,000+ builders, creators, and enthusiasts for a week of innovation.",
      longDescription:
        "ETHDenver is the premier Web3 event bringing together builders, creators, and innovators from around the globe. Experience hands-on workshops, inspiring talks, and unparalleled networking opportunities in the heart of Colorado's tech scene.",
      matchScore: 89,
      location: "Denver, CO",
      date: "February 23 - March 3, 2024",
      category: "Conference",
      price: "$299",
      format: "In-Person + Virtual",
      difficulty: "All Levels",
      tags: ["Hackathon", "Networking", "Innovation", "Blockchain"],
      attendees: 20000,
      maxAttendees: 25000,
      reasons: [
        "Perfect for networking with 20,000+ Web3 enthusiasts",
        "Hands-on building experience with top-tier mentors",
        "Access to latest blockchain tools and technologies",
        "Opportunity to win significant prizes and funding",
      ],
      highlights: [
        "10-day immersive experience",
        "$1M+ in prizes and grants",
        "200+ speakers and mentors",
        "Exclusive access to Web3 companies",
      ],
    },
    {
      id: "web3-women",
      title: "Women in Web3 Summit",
      provider: "Web3 Women",
      description:
        "Empowering women in blockchain technology through education, networking, and mentorship opportunities.",
      longDescription:
        "Join a supportive community of women breaking barriers in Web3. This summit focuses on leadership development, technical skills, and creating lasting connections in the blockchain space.",
      matchScore: 87,
      location: "San Francisco, CA",
      date: "April 12-13, 2024",
      category: "Networking",
      price: "Free",
      format: "Hybrid",
      difficulty: "Beginner to Advanced",
      tags: ["Diversity", "Leadership", "Community", "Mentorship"],
      attendees: 500,
      maxAttendees: 600,
      reasons: [
        "Strong focus on diversity and inclusion in Web3",
        "Excellent mentorship and career development opportunities",
        "Supportive community of women leaders",
        "Technical workshops tailored for different skill levels",
      ],
      highlights: [
        "1:1 mentorship sessions",
        "Leadership masterclasses",
        "Career fair with top Web3 companies",
        "Ongoing community support",
      ],
    },
    {
      id: "defi-summit",
      title: "DeFi Summit 2024",
      provider: "DeFi Alliance",
      description:
        "Deep dive into decentralized finance protocols, yield farming strategies, and the future of financial infrastructure.",
      longDescription:
        "The most comprehensive DeFi event of the year. Learn from protocol founders, understand complex strategies, and discover emerging opportunities in decentralized finance.",
      matchScore: 85,
      location: "New York, NY",
      date: "May 8-10, 2024",
      category: "Finance",
      price: "$199",
      format: "In-Person",
      difficulty: "Intermediate to Advanced",
      tags: ["DeFi", "Protocols", "Finance", "Yield Farming"],
      attendees: 800,
      maxAttendees: 1000,
      reasons: [
        "Deep technical knowledge from DeFi protocol creators",
        "Advanced strategies for yield optimization",
        "Networking with DeFi professionals and investors",
        "Early access to new protocol launches",
      ],
      highlights: [
        "Protocol founder roundtables",
        "Hands-on strategy workshops",
        "Institutional DeFi insights",
        "Alpha group access",
      ],
    },
    {
      id: "nft-creators",
      title: "NFT Creators Workshop",
      provider: "OpenSea",
      description:
        "Learn to create, mint, and market your own NFT collections. From art to utility, discover what makes projects successful.",
      longDescription:
        "A comprehensive workshop for aspiring NFT creators. Learn the entire process from concept to launch, including technical setup, marketing strategies, and community building.",
      matchScore: 82,
      location: "Los Angeles, CA + Virtual",
      date: "March 28-29, 2024",
      category: "Creative",
      price: "$149",
      format: "Hybrid",
      difficulty: "Beginner to Intermediate",
      tags: ["NFTs", "Art", "Marketplace", "Creative"],
      attendees: 300,
      maxAttendees: 400,
      reasons: [
        "Complete NFT creation and launch guidance",
        "Direct mentorship from successful NFT artists",
        "Technical and marketing strategy training",
        "Access to OpenSea's creator tools and platform",
      ],
      highlights: [
        "Live minting workshops",
        "1:1 creator feedback sessions",
        "Marketing playbook included",
        "OpenSea partnership benefits",
      ],
    },
  ];

  const toggleEventSelection = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const MatchScoreCard = ({
    score,
    title,
  }: {
    score: number;
    title: string;
  }) => (
    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
          <Target className="h-4 w-4 text-white" />
        </div>
        <div className="text-white/80 text-sm font-semibold">{title}</div>
      </div>
      <div className="text-3xl font-bold text-green-400 mb-2">{score}%</div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <motion.div
          className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );

  const EventHighlights = ({ highlights }: { highlights: string[] }) => (
    <div className="space-y-3">
      {highlights.map((highlight, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-3 text-white/80"
        >
          <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
          <span className="text-sm">{highlight}</span>
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Calendar className="h-8 w-8 text-violet-400" />
            <h1 className="text-4xl font-bold text-white">
              Perfect Event Matches
            </h1>
            <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-3 py-1">
              Events First
            </Badge>
          </div>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Based on your preferences, we&apos;ve found amazing Web3 events
            where you can learn, connect, and grow
          </p>
        </motion.div>
      </div>
      {/* Featured Event - MtnDAO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="h-7 w-7 text-violet-400" />
          <h2 className="text-3xl font-bold text-white">Your Top Match</h2>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1">
            {featuredEvent.matchScore}% Match
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Event Card */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.01 }}
              onClick={() => toggleEventSelection(featuredEvent.id)}
              className="cursor-pointer"
            >
              <Card
                className={`transition-all duration-300 h-full ${
                  selectedEvents.includes(featuredEvent.id)
                    ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/50 shadow-xl shadow-green-500/20"
                    : "bg-white/[0.02] border border-white/10 hover:border-green-500/30 hover:bg-white/[0.05]"
                }`}
              >
                <CardContent className="p-8">
                  {" "}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">
                          {featuredEvent.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                          <Image
                            src="/mntdaopfp.png"
                            alt="MtnDAO"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-green-300 font-semibold text-lg">
                          {featuredEvent.provider}
                        </p>
                      </div>
                    </div>

                    {selectedEvents.includes(featuredEvent.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center"
                      >
                        <CheckCircle className="h-6 w-6 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-white/70 text-base mb-6 leading-relaxed">
                    {featuredEvent.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-white/70">
                      <Clock className="h-5 w-5 text-green-400" />
                      <div>
                        <div className="text-sm font-medium text-white">
                          {featuredEvent.date}
                        </div>
                        <div className="text-xs">{featuredEvent.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <MapPin className="h-5 w-5 text-green-400" />
                      <div>
                        <div className="text-sm font-medium text-white">
                          {featuredEvent.location}
                        </div>
                      </div>
                    </div>{" "}
                    <div className="flex items-center gap-3 text-white/70">
                      <Users className="h-5 w-5 text-green-400" />
                      <div>
                        <div className="text-sm font-medium text-white">
                          {featuredEvent.attendees}+ attending
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Star className="h-5 w-5 text-green-400" />
                      <div>
                        <div className="text-sm font-medium text-white">
                          {featuredEvent.difficulty}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredEvent.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-green-300 border-green-500/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {/* Highlights */}{" "}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">
                      Reasons to Go
                    </h4>
                    <EventHighlights highlights={featuredEvent.highlights} />
                  </div>
                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-green-400 font-bold text-lg">
                      {featuredEvent.price}
                    </span>
                    <Button
                      size="lg"
                      onClick={() => router.push("/demo/event")}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white"
                    >
                      View Event
                      <ExternalLink className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Side Information */}
          <div className="space-y-6">
            <MatchScoreCard
              score={featuredEvent.matchScore}
              title="Event Match"
            />
            {/* Speakers */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>{" "}
                <div className="text-white/80 text-sm font-semibold">
                  People You May Want To Meet
                </div>
              </div>
              <div className="space-y-3">
                {featuredEvent.speakers.map((speaker, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-lg">{speaker.avatar}</div>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">
                        {speaker.name}
                      </div>
                      <div className="text-violet-300 text-xs mb-1">
                        {speaker.role}
                      </div>
                      <div className="text-white/60 text-xs">
                        {speaker.company}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>{" "}
            {/* Why This Event */}
            <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="h-5 w-5 text-violet-400" />
                <div className="text-white/80 text-sm font-semibold">
                  Why This Event?
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                Based on your developer background and interest in{" "}
                <strong className="text-violet-300">Web3 Gaming</strong>, this
                bootcamp is perfect for you:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                  <span>
                    Dedicated{" "}
                    <strong className="text-violet-300">gaming workshop</strong>{" "}
                    on building Web3 game economies
                  </span>
                </div>
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                  <span>
                    Learn{" "}
                    <strong className="text-violet-300">NFT integration</strong>{" "}
                    for in-game assets and rewards
                  </span>
                </div>
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                  <span>
                    Connect with{" "}
                    <strong className="text-violet-300">
                      gaming-focused builders
                    </strong>{" "}
                    and studios
                  </span>{" "}
                </div>
              </div>
            </div>
            {/* Market Stability & Veteran Guidance */}
            <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
                <div className="text-white/80 text-sm font-semibold">
                  Trusted Veterans & Market Guidance
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                Since you&apos;re concerned about{" "}
                <strong className="text-orange-300">
                  market volatility and scams
                </strong>
                , this event is perfect:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-orange-300">
                      Long-term veterans
                    </strong>{" "}
                    with 5+ years in crypto will attend
                  </span>
                </div>
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                  <span>
                    Learn to{" "}
                    <strong className="text-orange-300">identify scams</strong>{" "}
                    and avoid common pitfalls
                  </span>
                </div>
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                  <span>
                    Get insights on{" "}
                    <strong className="text-orange-300">
                      navigating market cycles
                    </strong>{" "}
                    safely
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>{" "}
      {/* More Great Events Section */}
      <MoreGreatEvents
        events={otherEvents}
        selectedEvents={selectedEvents}
        onToggleSelection={toggleEventSelection}
      />
      {/* Complete Onboarding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="text-center"
      >
        <div className="max-w-md mx-auto">
          <p className="text-white/70 text-sm mb-6">
            {selectedEvents.length > 0
              ? `Great! You've selected ${selectedEvents.length} event${
                  selectedEvents.length > 1 ? "s" : ""
                }. Ready to explore more?`
              : "Find events that match your interests and take your Web3 journey to the next level."}
          </p>
          <Button
            size="lg"
            onClick={onNext}
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-8"
          >
            Complete Onboarding
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <p className="text-white/50 text-sm mt-4">
            You can always explore classes and more events from your dashboard
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
