"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Send,
  Sparkles,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RotateCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  typing?: boolean;
}

interface PostEventChatBotProps {
  step: string;
}

// Post-event specific AI responses
const getPostEventAIResponse = (userMessage: string, step: string): string => {
  const responses: Record<string, Record<string, string>> = {
    rating: {
      help: "I'm here to help you reflect on your event experience! Your honest feedback helps us:\n\n🎯 **Improve future events** based on what worked\n📈 **Tailor recommendations** to your experience level\n🤝 **Build better communities** that match your vibe\n\nFeel free to be completely honest - your feedback is valuable!",
      feedback:
        "Your feedback is incredibly valuable! Here's why each rating matters:\n\n⭐ **Event Rating**: Helps us understand overall satisfaction\n🧭 **Feeling Lost**: Shows us where we need clearer guidance\n💎 **Benefit Rating**: Tells us if the content hit the mark\n🎉 **Community Vibe**: Helps us foster the right atmosphere\n\nTake your time and be honest!",
      honest:
        "Absolutely be honest! We want to know:\n\n✅ **What worked well** so we can do more of it\n❌ **What didn't work** so we can fix it\n💡 **What confused you** so we can clarify\n🚀 **What excited you** so we can amplify it\n\nHonest feedback makes everything better for everyone!",
      unsure:
        "Feeling unsure is totally normal! Consider:\n\n🤔 **Your first impression** when you arrived\n💭 **Moments you felt engaged** vs confused\n🗣️ **How comfortable you felt** asking questions\n⚡ **Energy level** throughout the event\n\nTrust your gut - first reactions are often most honest!",
      skip: "You can skip feedback, but here's what you'd miss:\n\n📊 **Personalized recommendations** based on your experience\n🎯 **Tailored learning paths** that match your level\n🤝 **Community connections** with similar backgrounds\n💫 **Better future events** shaped by your input\n\nJust a few clicks can really improve your journey!",
      default:
        "I'm here to help you share your honest thoughts about the event! Whether you loved it, felt confused, or have mixed feelings - your feedback helps shape better experiences for everyone. What questions do you have?",
    },
    "feedback-summary": {
      help: "Great job completing your feedback! Now I can help you understand:\n\n📊 **What your responses mean** for your learning path\n🎯 **Why we ask these questions** and how they help\n🗺️ **What comes next** in your personalized journey\n💡 **How to maximize** your Web3 learning experience\n\nWhat would you like to know more about?",
      understand:
        "Let me break down how your feedback shapes your journey:\n\n🎯 **Rating Analysis**: Shows your engagement level and learning style\n📈 **Experience Mapping**: Helps us match you with the right content difficulty\n🤝 **Community Fit**: Connects you with others at similar stages\n🚀 **Next Steps**: Determines whether you need foundations or can jump ahead\n\nYour responses create a personalized roadmap!",
      recommendations:
        "Your recommendations are based on:\n\n✅ **Your feedback scores** showing experience level\n📚 **Learning style preferences** from your responses\n⚡ **Engagement patterns** we observed\n🎯 **Success stories** from similar learners\n\nWe match you with paths that have the highest success rate for your profile!",
      next: "Here's what happens next:\n\n1️⃣ **Path Selection**: Choose between live events or self-paced classes\n2️⃣ **Timeline Review**: See your complete learning roadmap\n3️⃣ **Resource Access**: Get immediate access to recommended content\n4️⃣ **Community Join**: Connect with your learning cohort\n\nEach step builds on your feedback!",
      default:
        "Your feedback has been processed and we've created personalized recommendations just for you! I can explain how we determined your path, what each recommendation means, or help you understand what comes next. What interests you most?",
    },
    "content-selection": {
      help: "This is where you choose your learning approach! Let me help you understand:\n\n🎪 **Live Events**: Interactive, community-driven, scheduled sessions\n📚 **Self-Paced Classes**: Flexible, comprehensive, learn at your speed\n\nBoth paths lead to the same expertise - it's about how you learn best!",
      "live events":
        "Live events are perfect if you:\n\n✅ **Love real-time interaction** and asking questions\n✅ **Thrive in community settings** with peers\n✅ **Prefer structured schedules** to stay motivated\n✅ **Want networking opportunities** with other builders\n✅ **Learn best through discussion** and collaboration\n\nThink bootcamp energy with expert guidance!",
      "self-paced":
        "Self-paced classes are ideal if you:\n\n✅ **Have unpredictable schedules** or time constraints\n✅ **Like to replay content** and learn thoroughly\n✅ **Prefer deep, focused study** without distractions\n✅ **Want to move faster** through familiar topics\n✅ **Learn best through practice** and repetition\n\nThink comprehensive university course you control!",
      difference:
        "Here's the key difference:\n\n🎪 **Live Events**:\n• Real-time interaction\n• Cohort community\n• Fixed schedule\n• Group energy\n\n📚 **Self-Paced Classes**:\n• Learn anytime\n• Individual focus\n• Flexible timeline\n• Deep dive content\n\nBoth cover the same material - choose your style!",
      confused:
        "No worries! Consider your recent event experience:\n\n❓ **Did you enjoy** the live interaction and energy?\n❓ **Would you prefer** to revisit difficult concepts multiple times?\n❓ **Do you have** a consistent schedule for live sessions?\n❓ **Are you more motivated** by community or personal goals?\n\nYour answers point to the best path for you!",
      default:
        "This choice shapes your entire learning experience! I can help you understand the differences between live events and self-paced classes, what each path offers, or help you decide based on your learning style. What would help you choose?",
    },
    "learning-timeline": {
      help: "This timeline shows your complete Web3 journey! Each step builds perfectly on the previous one:\n\n🎯 **Foundation**: Solana fundamentals (start here)\n🚀 **Specialization**: Advanced development with Turbin3\n🏆 **Mastery**: Expert-level cohorts and real projects\n\nThe beauty is how each stage prepares you for the next!",
      foundation:
        "The foundation step is crucial because:\n\n📚 **Solana Fundamentals**: Learn the core concepts properly\n💻 **Hands-on Practice**: Build your first programs\n🧠 **Mental Models**: Understand how everything connects\n⚡ **Confidence Building**: Master basics before advancing\n\nSkipping this is like building on shaky ground!",
      turbin3:
        "Turbin3 Builders Cohort is where you:\n\n🏗️ **Build Real Projects**: Work on production-ready dApps\n👥 **Collaborate with Peers**: Learn from other developers\n🎯 **Expert Instruction**: Get guidance from industry pros\n📈 **Advanced Concepts**: Dive deep into complex patterns\n\nThis is where you become a true Solana developer!",
      magicblock:
        "Magicblock represents the cutting edge:\n\n🎮 **Web3 Gaming Focus**: Specialized gaming infrastructure\n⚡ **Ephemeral Rollups**: Next-generation scaling solutions\n🔬 **Research Level**: Work with the team creating new tech\n🌟 **Industry Recognition**: Build your reputation in the space\n\nThis is expert-level, taught by the creators themselves!",
      timeline:
        "The timeline is designed for optimal learning:\n\n📈 **Progressive Difficulty**: Each step builds on the last\n⏱️ **Realistic Pacing**: Enough time to master each level\n🎯 **Clear Milestones**: Know exactly what you've achieved\n🔄 **Flexible Entry**: Jump in at your appropriate level\n\nIt's a proven path to Web3 expertise!",
      skip: "You can start anywhere, but here's why the sequence matters:\n\n⚠️ **Skipping Foundation**: You'll struggle with advanced concepts\n⚠️ **Missing Turbin3**: You'll lack practical building experience\n⚠️ **Rushing to Magicblock**: Complex topics without proper prep\n\n💡 **Better approach**: Follow the path but accelerate through familiar topics!",
      default:
        "This learning timeline is your roadmap to Web3 mastery! Each step is carefully designed to build on the previous one. I can explain any step in detail, help you understand the progression, or answer questions about timing and prerequisites. What interests you most?",
    },
    "live-classes": {
      help: "Live classes offer the ultimate interactive experience! Here's what makes them special:\n\n👨‍🏫 **Expert Instructors**: Learn from industry leaders\n💬 **Real-time Q&A**: Get instant answers to your questions\n👥 **Peer Learning**: Collaborate with other motivated builders\n🎯 **Structured Curriculum**: Follow a proven learning path\n\nIt's like having a personal coding bootcamp!",
      schedule:
        "Live class schedules are designed for working professionals:\n\n📅 **Regular Sessions**: Consistent weekly meetings\n⏰ **Evening/Weekend Options**: Work around your day job\n🌍 **Multiple Time Zones**: Sessions for global accessibility\n📝 **Recorded Backup**: Miss a session? Catch up anytime\n\nWe make it work with your life!",
      interaction:
        "The interactive format is incredibly powerful:\n\n❓ **Ask Questions Live**: Get immediate clarification\n💻 **Code Together**: Pair programming with peers\n🎯 **Real-time Feedback**: Instructors see your work instantly\n🚀 **Group Problem Solving**: Tackle challenges as a team\n\nYou're never stuck or alone!",
      community:
        "The community aspect is game-changing:\n\n🤝 **Lifelong Connections**: Build relationships with fellow developers\n💡 **Knowledge Sharing**: Learn from everyone's experiences\n🎉 **Motivation**: Group energy keeps you engaged\n🌟 **Career Network**: Your classmates become your professional network\n\nMany students say the community is the best part!",
      nervous:
        "Feeling nervous about live classes is totally normal! Here's the reality:\n\n😊 **Supportive Environment**: Everyone's learning together\n❓ **No Stupid Questions**: Instructors encourage curiosity\n👶 **All Levels Welcome**: From beginners to experienced devs\n🎯 **Structured Support**: Clear guidelines and expectations\n\nYou'll feel comfortable within the first session!",
      default:
        "Live classes combine expert instruction with community energy to create an amazing learning experience! I can tell you about the schedule, interaction style, community benefits, or anything else you're curious about. What would you like to know?",
    },
    "turbin3-classes": {
      help: "Turbin3 represents advanced Solana development! This is where you:\n\n🏗️ **Build Complex dApps**: Real-world applications, not just tutorials\n⚡ **Master Advanced Concepts**: DeFi protocols, NFT marketplaces, DAOs\n👨‍💻 **Work with Anchor**: The leading Solana development framework\n🎯 **Create Portfolio Projects**: Showcase-worthy applications\n\nThis is serious developer training!",
      anchor:
        "Anchor is the React of Solana development:\n\n⚡ **Faster Development**: Write less boilerplate code\n🛡️ **Better Security**: Built-in safety features and best practices\n📚 **Great Documentation**: Comprehensive guides and examples\n🌟 **Industry Standard**: Used by top Solana projects\n\nMastering Anchor opens all doors in Solana development!",
      projects:
        "Your Turbin3 projects become your calling card:\n\n💼 **Portfolio Quality**: Showcase to potential employers\n🔍 **Code Reviews**: Get feedback from expert developers\n🚀 **Real Deployment**: Your apps run on actual Solana mainnet\n⭐ **Community Recognition**: Share your work with the ecosystem\n\nThese aren't just exercises - they're career builders!",
      difficulty:
        "Turbin3 is challenging but achievable:\n\n📈 **Step-by-step Progression**: Each lesson builds on the last\n👨‍🏫 **Expert Support**: Instructors available for complex questions\n👥 **Peer Collaboration**: Learn from other ambitious developers\n🛠️ **Practical Focus**: You're building, not just reading\n\nThe difficulty makes the achievement more valuable!",
      prereqs:
        "To succeed in Turbin3, you should have:\n\n✅ **Solana Fundamentals**: Understanding of accounts, programs, transactions\n✅ **Rust Basics**: Comfortable with Rust syntax and concepts\n✅ **Development Experience**: General programming and debugging skills\n✅ **Time Commitment**: Several hours per week for projects\n\nIf you have these, you're ready to level up!",
      default:
        "Turbin3 is where serious Solana developers are made! This advanced cohort focuses on building real applications with Anchor framework. I can tell you about the projects, prerequisites, difficulty level, or what makes it special. What interests you most?",
    },
    "pre-recorded-classes": {
      help: "Pre-recorded classes offer the ultimate flexibility! Perfect for:\n\n⏰ **Busy Schedules**: Learn whenever you have time\n🔄 **Multiple Reviews**: Replay difficult concepts until they click\n📈 **Personal Pace**: Speed up through familiar topics, slow down on new ones\n🎯 **Deep Focus**: No distractions, pure learning concentration\n\nIt's your personal Solana university!",
      flexible:
        "The flexibility is incredible:\n\n🌅 **Early Bird**: Study at 5 AM if that's your peak time\n🌙 **Night Owl**: Learn at midnight when the world is quiet\n✈️ **Travel Friendly**: Keep learning anywhere with internet\n⏸️ **Life Happens**: Pause for family, work, or emergencies\n\nYour schedule never conflicts with learning!",
      thorough:
        "Pre-recorded content is incredibly thorough:\n\n📚 **Comprehensive Coverage**: Every topic explored in detail\n🔍 **Multiple Angles**: Concepts explained different ways\n💻 **Code Walkthroughs**: Step-by-step programming guidance\n🎯 **Practice Exercises**: Hands-on reinforcement\n\nYou get university-level depth with practical focus!",
      replay:
        "The replay feature is a game-changer:\n\n🔄 **Difficult Concepts**: Watch complex explanations multiple times\n📝 **Note Taking**: Pause to write detailed notes\n💡 **Ah-ha Moments**: Replay when things suddenly click\n🎯 **Reference Material**: Come back months later for refreshers\n\nIt's like having a personal tutor available 24/7!",
      motivation:
        "Staying motivated in self-paced learning:\n\n🎯 **Set Clear Goals**: Daily or weekly learning targets\n📅 **Create Routine**: Consistent study times build habits\n🏆 **Track Progress**: Celebrate completed modules\n👥 **Join Community**: Connect with other self-paced learners\n\nSelf-discipline pays off with deep understanding!",
      default:
        "Pre-recorded classes give you complete control over your learning experience! They're comprehensive, flexible, and designed for thorough understanding. I can tell you about the content depth, flexibility benefits, or strategies for staying motivated. What would help you most?",
    },
  };

  const stepResponses = responses[step] || responses["rating"];

  // Simple keyword matching for demo purposes
  const message = userMessage.toLowerCase();

  for (const [keyword, response] of Object.entries(stepResponses)) {
    if (message.includes(keyword)) {
      return response;
    }
  }

  return (
    stepResponses["default"] ||
    "I'm here to help with your post-event journey! Ask me anything about your feedback, learning paths, or next steps."
  );
};

export default function PostEventChatBot({ step }: PostEventChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(step);

  // Post-event specific greetings
  useEffect(() => {
    const greetings: Record<string, string> = {
      rating:
        "Hi! Thanks for attending the event! 🎉 I'm here to help you reflect on your experience and share honest feedback. Your thoughts will help shape your personalized learning path - so feel free to be completely candid!",
      "feedback-summary":
        "Great job completing your feedback! 📊 I can help you understand what your responses mean and how they'll shape your personalized Web3 journey. What questions do you have about your results?",
      "content-selection":
        "Now comes the fun part - choosing your learning style! 🎯 I can help you understand the difference between live events and self-paced classes. Both paths lead to Web3 mastery, but the experience is quite different!",
      "learning-timeline":
        "Welcome to your personalized learning roadmap! 🗺️ This timeline shows your complete journey from fundamentals to mastery. Each step builds perfectly on the previous one. Want to explore any particular stage?",
      "live-classes":
        "Live classes offer an incredible interactive experience! 🎪 You'll learn alongside other motivated developers with expert instructors guiding every step. Ready to dive into what makes live learning so powerful?",
      "turbin3-classes":
        "Turbin3 is where serious Solana developers are made! 🚀 This advanced cohort focuses on building real-world applications with industry-standard tools. Let me tell you what makes this program special!",
      "pre-recorded-classes":
        "Pre-recorded classes give you ultimate flexibility and depth! 📚 Learn at your own pace, replay difficult concepts, and build expertise on your schedule. Perfect for busy professionals who want thorough understanding!",
    };

    const greeting =
      greetings[step] ||
      "Hi! I'm your post-event assistant. I'm here to help you navigate your Web3 learning journey after the event. How can I assist you today?";

    // Reset messages with new greeting when step changes
    setMessages([
      {
        id: `greeting-${step}-${Date.now()}`,
        content: greeting,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);

    setCurrentStep(step);
  }, [step]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );

    const aiResponse = getPostEventAIResponse(userInput, step);

    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Post-event specific quick actions
  const getQuickActions = (step: string) => {
    const actions: Record<string, string[]> = {
      rating: [
        "💡 Why is feedback important?",
        "❓ Should I be honest?",
        "⏭️ What happens next?",
        "🤔 I'm feeling unsure",
      ],
      "feedback-summary": [
        "📊 What do my scores mean?",
        "🎯 How are recommendations made?",
        "➡️ What comes next?",
        "💡 Help me understand",
      ],
      "content-selection": [
        "🎪 Tell me about live events",
        "📚 What are self-paced classes?",
        "❓ What's the difference?",
        "🤔 Help me choose",
      ],
      "learning-timeline": [
        "📚 Why start with foundation?",
        "🚀 Tell me about Turbin3",
        "🏆 What's Magicblock?",
        "⏭️ Can I skip steps?",
      ],
      "live-classes": [
        "📅 How does scheduling work?",
        "👥 Tell me about community",
        "💬 What's the interaction like?",
        "😰 I'm feeling nervous",
      ],
      "turbin3-classes": [
        "🏗️ What projects will I build?",
        "⚡ What is Anchor?",
        "📈 How difficult is it?",
        "✅ What are the prerequisites?",
      ],
      "pre-recorded-classes": [
        "⏰ How flexible is it really?",
        "🔄 Can I replay content?",
        "🎯 How do I stay motivated?",
        "📚 How thorough is the content?",
      ],
    };

    return (
      actions[step] || [
        "💡 I need help",
        "❓ How does this work?",
        "🔒 Is this secure?",
        "➡️ What's next?",
      ]
    );
  };

  return (
    <motion.div
      key={`post-event-chatbot-${step}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Chat Toggle Button */}
      {!isExpanded && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Button
            onClick={() => setIsExpanded(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-xl shadow-blue-500/25"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/uni.svg"
                alt="AI Assistant"
                width={32}
                height={32}
                className="text-white"
              />
            </motion.div>
          </Button>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-96 h-[500px] bg-white/10 backdrop-blur-xl border-white/20 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                {" "}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 aspect-square rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center shrink-0">
                    <Image
                      src="/uni.svg"
                      alt="AI Assistant"
                      width={20}
                      height={20}
                      className="text-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      Post-Event Assistant
                    </h3>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-xs text-white/60">
                        Ready to help
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  ×
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-start gap-2 max-w-[80%] ${
                        message.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 aspect-square rounded-full flex items-center justify-center shrink-0 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                            : "bg-gradient-to-r from-blue-500 to-cyan-600"
                        }`}
                      >
                        {" "}
                        {message.sender === "user" ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Image
                            src="/uni.svg"
                            alt="AI Assistant"
                            width={16}
                            height={16}
                            className="text-white"
                          />
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-blue-600/80 text-white"
                            : "bg-white/10 text-white border border-white/10"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">
                          {message.content
                            .split(/(\*\*.*?\*\*)/)
                            .map((part, idx) => {
                              if (
                                part.startsWith("**") &&
                                part.endsWith("**")
                              ) {
                                return (
                                  <strong key={idx}>{part.slice(2, -2)}</strong>
                                );
                              }
                              return part;
                            })}
                        </p>
                        <span className="text-xs opacity-60 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    {" "}
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 aspect-square rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center shrink-0">
                        <Image
                          src="/uni.svg"
                          alt="AI Assistant"
                          width={16}
                          height={16}
                          className="text-white"
                        />
                      </div>
                      <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about your next steps..."
                    className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-400"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!userInput.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="mt-3 relative">
                  <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {getQuickActions(step).map((action, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setUserInput(
                            action
                              .replace(
                                /^[🎪📚❓🤔💡⏭️🔒➡️📊🎯💬😰🏗️⚡📈✅⏰🔄]/g,
                                ""
                              )
                              .trim()
                          )
                        }
                        className="text-white/60 hover:text-white hover:bg-white/5 text-xs whitespace-nowrap flex-shrink-0"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/30 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
