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
  Bot,
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

interface ChatBotProps {
  step: string;
}

// Mock AI responses based on the current step
const getAIResponse = (userMessage: string, step: string): string => {
  const responses: Record<string, Record<string, string>> = {
    "wallet-setup": {
      help: "I'd be happy to help you set up your wallet! Here are the key steps:\n\n1. **Download Phantom Wallet** from the official website\n2. **Create a new wallet** and securely store your seed phrase\n3. **Add some SOL** to get started (you can buy from exchanges like Coinbase)\n\nNeed help with any specific step?",
      "seed phrase":
        "Your seed phrase is like the master key to your wallet! Here's how to keep it safe:\n\n• **Write it down** on paper (don't store digitally)\n• **Store in multiple secure locations**\n• **Never share it** with anyone\n• **Double-check** the spelling of each word\n\nRemember: Anyone with your seed phrase can access your funds!",
      phantom:
        "Phantom is one of the most popular Solana wallets! Here's why I recommend it:\n\n✅ **User-friendly interface**\n✅ **Strong security features**\n✅ **Wide dApp compatibility**\n✅ **Mobile and browser support**\n\nYou can download it from phantom.app - make sure you're on the official site!",
      secure:
        "Absolutely! Wallet security is our top priority:\n\n🔐 **Private keys** stay on your device\n🛡️ **Encrypted storage** for all sensitive data\n✅ **Open source** code for transparency\n🚫 **No server storage** of your credentials\n\nAlways verify you're on the official website!",
      examples:
        "Here are some popular wallet options:\n\n🟣 **Phantom** - Most popular, great UI\n🔵 **Solflare** - Advanced features\n🟡 **Backpack** - Built by developers\n🟢 **Glow** - Community favorite\n\nI recommend starting with Phantom for beginners!",
      skip: "You can skip wallet setup for now, but here's what you'll miss:\n\n❌ Can't interact with dApps\n❌ Can't hold crypto assets\n❌ Limited Web3 experience\n\n💡 **Recommendation**: Even a basic wallet takes just 5 minutes to set up and opens up the entire Web3 world!",
      next: "After wallet setup, we'll:\n\n1. **Install browser extension** for easy dApp access\n2. **Explore your interests** in Web3\n3. **Get personalized recommendations** for learning\n\nEach step builds on the previous one!",
      default:
        "I'm here to help with your wallet setup! I can assist with downloading Phantom, creating your wallet, securing your seed phrase, or funding your account. What specific question do you have?",
    },
    "chrome-extension": {
      help: "The browser extension makes Web3 so much easier! Here's what you need to know:\n\n🔧 **Installation**: Click the 'Install Extension' button above\n🔐 **Security**: It encrypts your wallet connection\n⚡ **Speed**: One-click transaction signing\n🌐 **Compatibility**: Works with all major dApps\n\nShould I walk you through the installation?",
      security:
        "Great question! Here's how the extension keeps you safe:\n\n🛡️ **Encrypted connections** to dApps\n🔐 **Local key storage** (never sent to servers)\n✅ **Transaction preview** before signing\n🚫 **Malicious site warnings**\n\nYour private keys never leave your device!",
      secure:
        "Yes, very secure! The extension:\n\n🔒 **Encrypts all connections** between your wallet and dApps\n🛡️ **Sandboxes** each dApp interaction\n👀 **Shows transaction details** before you sign\n🚨 **Warns about** suspicious websites\n\nIt's like a secure tunnel for your Web3 activities!",
      install:
        "Here's how to install the extension:\n\n1. **Click 'Install Extension'** button above\n2. **Allow permissions** when prompted\n3. **Connect your wallet** to the extension\n4. **Test the connection** on a simple dApp\n\nI'll guide you through each step!",
      examples:
        "Here's what you can do with the extension:\n\n🎨 **Mint NFTs** on OpenSea or Magic Eden\n💱 **Trade tokens** on Jupiter or Raydium\n🎮 **Play games** like Star Atlas or Aurory\n💰 **Provide liquidity** on DeFi protocols\n\nThe extension makes all of this seamless!",
      skip: "You can skip the extension, but here's what you'll miss:\n\n😓 **Manual wallet connection** for every dApp\n🐌 **Slower transaction signing**\n❌ **No security warnings**\n📱 **Mobile-only Web3** experience\n\n💡 The extension saves hours of hassle!",
      next: "After the extension, we'll:\n\n1. **Discover your interests** in Web3\n2. **Find communities** that match your goals\n3. **Get learning resources** tailored to you\n\nYou're building a complete Web3 toolkit!",
      default:
        "I can help you with the browser extension! I can explain the benefits, walk you through installation, or answer security questions. What would you like to know?",
    },
    interests: {
      help: "Let me help you discover Web3! Here are the main areas:\n\n🎨 **NFTs & Digital Art** - Create and collect unique digital assets\n💰 **DeFi** - Decentralized finance and yield farming\n🎮 **GameFi** - Play-to-earn games and virtual worlds\n🏗️ **Building** - Smart contracts and dApp development\n🏔️ **Communities** - DAOs and social networks\n\nWhat sounds most exciting to you?",
      unsure:
        "No worries! Let me help you discover what might interest you in Web3:\n\n🎨 **NFTs & Digital Art** - Create and collect unique digital assets\n💰 **DeFi** - Decentralized finance and yield farming\n🎮 **GameFi** - Play-to-earn games and virtual worlds\n🏗️ **Building** - Smart contracts and dApp development\n\nWhat sounds most exciting to you?",
      defi: "DeFi is fascinating! Here's what you can explore:\n\n💱 **DEXs** - Trade without intermediaries\n🏦 **Lending** - Earn yield on your crypto\n📊 **Yield Farming** - Maximize returns\n🔄 **Liquidity Pools** - Provide liquidity for rewards\n\nWant to learn about any specific area?",
      nft: "NFTs are more than just profile pictures! Here's the ecosystem:\n\n🎨 **Art & Collectibles** - Digital ownership\n🎵 **Music & Media** - Direct artist support\n🎮 **Gaming Items** - Tradeable game assets\n🏠 **Virtual Real Estate** - Metaverse properties\n\nWhich area interests you most?",
      gamefi:
        "GameFi combines gaming with earning! Here's what's available:\n\n⚔️ **RPG Games** - Level up and earn tokens\n🏆 **Competitive Gaming** - Tournaments with prizes\n🏘️ **Virtual Worlds** - Own land and assets\n🎯 **Casual Games** - Easy to play, fun to earn\n\nReady to start playing and earning?",
      building:
        "Web3 development is amazing! Here's where to start:\n\n🟢 **Solidity** - Ethereum smart contracts\n🔵 **Rust** - Solana program development\n⚛️ **Frontend** - React with Web3 libraries\n🔧 **Tools** - Hardhat, Anchor, and more\n\nWhat's your coding experience level?",
      secure:
        "Your interests data is completely private:\n\n🔒 **No tracking** of your selections\n🚫 **No data selling** to third parties\n💾 **Local storage** only for recommendations\n🎯 **Only used** to personalize your experience\n\nYour privacy is protected!",
      examples:
        "Here are some specific examples by interest:\n\n🎨 **NFT**: Mint art on Solana, collect on Magic Eden\n💰 **DeFi**: Lend on Solend, trade on Jupiter\n🎮 **Gaming**: Play Star Atlas, earn in Aurory\n🏗️ **Building**: Create smart contracts, build dApps\n\nWhich example excites you most?",
      skip: "You can skip this, but here's why it's helpful:\n\n🎯 **Personalized recommendations** based on interests\n🏘️ **Relevant communities** to join\n📚 **Targeted learning resources**\n🎪 **Events** that match your goals\n\n💡 Takes 30 seconds and saves hours later!",
      next: "After selecting interests, we'll:\n\n1. **Match you with communities** like MTN DAO\n2. **Recommend learning paths** like Turbin3\n3. **Suggest events** and networking opportunities\n\nYour interests shape your entire Web3 journey!",
      default:
        "I'm here to help you explore Web3 interests! Whether you're curious about DeFi, NFTs, gaming, or development, I can provide guidance and suggest learning paths. What catches your attention?",
    },
    recommendations: {
      help: "These recommendations are personalized for you! Here's what each offers:\n\n🏔️ **MTN DAO** - Community events and networking\n🎓 **Turbin3** - Structured learning programs\n📅 **Local Events** - In-person meetups and workshops\n💻 **Online Courses** - Self-paced learning\n\nWhich type interests you most?",
      "mtn dao":
        "MTN DAO is an amazing community! Here's what makes them special:\n\n🏔️ **Community Focus** - Building in the mountains\n🔨 **Builder-Centric** - For developers and creators\n🌐 **Solana Ecosystem** - Deep Solana expertise\n🤝 **Networking** - Connect with like-minded builders\n\nTheir events are perfect for learning and networking!",
      turbin3:
        "Turbin3 is one of the best Web3 education platforms! Here's why:\n\n🎓 **Comprehensive Curriculum** - From basics to advanced\n💻 **Hands-on Projects** - Build real applications\n👨‍🏫 **Expert Instructors** - Industry professionals\n🚀 **Job Placement** - Help finding Web3 roles\n\nTheir Solana 101 course is perfect for getting started!",
      events:
        "Web3 events are incredible for learning and networking! Here's what to expect:\n\n🎤 **Expert Talks** - Learn from industry leaders\n🤝 **Networking** - Meet builders and founders\n🛠️ **Workshops** - Hands-on learning\n🎉 **Community** - Join the Web3 family\n\nWhich type of event interests you most?",
      courses:
        "Online courses are a great way to learn Web3! Here's what to look for:\n\n📚 **Structured Learning** - Step-by-step progression\n💻 **Practical Projects** - Real-world applications\n👥 **Community Support** - Learn with others\n🏆 **Certification** - Validate your skills\n\nAny specific technology you want to focus on?",
      secure:
        "Your recommendations are based on:\n\n🎯 **Your selected interests** only\n📊 **General learning patterns** (anonymized)\n🏆 **Community ratings** and reviews\n🚫 **No personal data** is shared with partners\n\nWe prioritize your privacy while giving great suggestions!",
      examples:
        "Here are specific next steps you could take:\n\n🏔️ **MTN DAO**: Join their Discord, attend virtual meetups\n🎓 **Turbin3**: Enroll in Solana 101, build your first dApp\n📅 **Events**: Find local Web3 meetups in your area\n💻 **Courses**: Start with blockchain fundamentals\n\nWhich would you like to try first?",
      skip: "You can skip these recommendations, but here's what you'd miss:\n\n🚀 **Faster learning** with proven resources\n🤝 **Networking opportunities** with like-minded people\n🎯 **Structured path** instead of random exploration\n💡 **Expert guidance** from experienced builders\n\nThese suggestions could save you months of searching!",
      next: "After recommendations, you're all set to:\n\n🚀 **Start your Web3 journey** with confidence\n🏗️ **Begin building** or learning\n🤝 **Connect with communities**\n🎯 **Follow a clear path** to your goals\n\nYou've got everything you need to succeed!",
      default:
        "I can help you understand the recommendations! Whether you're curious about MTN DAO events, Turbin3 courses, or general Web3 learning paths, I'm here to guide you. What would you like to know more about?",
    },
    "developer-experience": {
      help: "I'm here to help you share your developer background! This helps us:\n\n👨‍💻 **Tailor learning paths** to your skill level\n🎯 **Recommend relevant projects** in your tech stack\n🤝 **Connect you** with developers using similar technologies\n📈 **Track progress** based on your experience\n\nWhat would you like to know about this step?",
      fullstack:
        "Full stack development is perfect for Web3! Here's why:\n\n🌐 **Frontend + Backend** knowledge is valuable\n⚛️ **React experience** transfers to Web3 UIs\n🔗 **API knowledge** helps with blockchain interactions\n💾 **Database skills** apply to decentralized storage\n\nYou're already 70% ready for Web3 development!",
      frontend:
        "Frontend developers are in high demand in Web3! Here's what you bring:\n\n⚛️ **React/Vue skills** transfer perfectly\n🎨 **UI/UX expertise** is crucial for dApp adoption\n📱 **Mobile development** opens Web3 mobile opportunities\n💻 **JavaScript mastery** is the foundation of Web3\n\nYour skills are directly applicable!",
      backend:
        "Backend developers have huge advantages in Web3:\n\n🔗 **API design** translates to smart contract architecture\n💾 **Database modeling** helps with blockchain data structures\n🔐 **Security focus** is critical in Web3\n⚡ **Performance optimization** matters for gas efficiency\n\nYou'll pick up Web3 concepts quickly!",
      years:
        "Every year of experience counts in Web3! Here's how it helps:\n\n🌱 **0-2 years**: Fresh perspective, quick to learn new paradigms\n🚀 **3-5 years**: Perfect balance of skills and adaptability\n💪 **6-10 years**: Strong foundation, can architect complex dApps\n🏆 **10+ years**: Veteran wisdom, can lead Web3 teams\n\nYour experience level is an asset!",
      technologies:
        "Great tech stack! Here's how your skills apply to Web3:\n\n📜 **JavaScript/TypeScript**: Essential for Web3 development\n⚛️ **React/Next.js**: Perfect for dApp frontends\n🟢 **Node.js**: Ideal for Web3 backend services\n🐍 **Python**: Great for blockchain analysis and automation\n🦀 **Rust/Go**: Perfect for blockchain development\n\nYou're already equipped for Web3!",
      secure:
        "Your developer information is completely private:\n\n🔒 **No data sharing** with third parties\n🎯 **Only used** for personalized recommendations\n💾 **Stored locally** in your browser session\n🚫 **No tracking** across other websites\n\nWe respect developer privacy!",
      examples:
        "Here's how your background shapes your Web3 path:\n\n👨‍💻 **Frontend Devs**: Start with Web3.js and dApp UIs\n🔧 **Backend Devs**: Jump into smart contracts and APIs\n📱 **Full Stack**: Build complete Web3 applications\n📊 **DevOps**: Focus on blockchain infrastructure\n\nYour path is customized to your strengths!",
      skip: "You can skip this step, but here's what you'd miss:\n\n🎯 **Personalized learning** based on your skills\n🤝 **Relevant community** connections\n📚 **Targeted resources** for your experience level\n🚀 **Faster onboarding** with familiar concepts\n\nSharing your background saves learning time!",
      next: "After sharing your experience, we'll:\n\n🎨 **Explore your interests** in Web3\n😰 **Address any concerns** you might have\n📚 **Recommend learning paths** that fit your background\n🤝 **Connect you** with relevant communities\n\nEach step builds on your existing skills!",
      default:
        "I'm here to help you share your developer background! Whether you're curious about how your skills transfer to Web3, want tips on the best learning path, or have questions about the process, just ask!",
    },
    "developer-hesitations": {
      help: "It's completely normal to have concerns about Web3! I'm here to address them:\n\n📚 **Documentation Issues**: We'll guide you to the best resources\n🛡️ **Security Concerns**: Learn safe practices step-by-step\n⚡ **Complexity Worries**: Break it down into manageable pieces\n💰 **Cost Concerns**: Find cost-effective learning methods\n\nWhat specific concern would you like to discuss?",
      documentation:
        "Don't worry about poor docs - you're not alone! Here's the reality:\n\n📊 **67% of developers** struggle with Web3 documentation\n📚 **We curate** the best learning materials\n🎯 **Step-by-step guides** replace confusing docs\n👥 **Community support** fills the gaps\n\nWe'll connect you with resources that actually make sense!",
      scam: "Security fears are 100% valid - everyone worries about this! Here's how we help:\n\n🛡️ **Safety-first approach** in all our recommendations\n🎯 **Scam detection training** through interactive quizzes\n🔒 **Best practices** for wallet security\n👥 **Community guidance** from experienced developers\n\nWe'll make sure you're protected while learning!",
      complexity:
        "Web3 complexity is manageable - 54% of developers feel this way initially:\n\n🧩 **Break concepts** into familiar programming patterns\n📈 **Progressive learning** from simple to advanced\n💡 **Real examples** instead of abstract theory\n🚀 **Hands-on projects** to reinforce learning\n\nWe'll make it as approachable as learning any new framework!",
      "gas fees":
        "Gas fees are a valid concern! Here's how to handle them smartly:\n\n💡 **43% worry** about transaction costs initially\n⚡ **Layer 2 solutions** offer much lower fees\n🟢 **Solana** and other chains have minimal costs\n📊 **Fee optimization** techniques we'll teach you\n🧪 **Testnets** for free practice and learning\n\nYou can learn and build without breaking the bank!",
      time: "Time constraints are real for busy developers! Here's our approach:\n\n⏰ **38% of developers** face time challenges\n📚 **Bite-sized lessons** that fit your schedule\n🎯 **Focused learning** on immediately useful skills\n⚡ **Quick wins** to build momentum\n📱 **Learn while commuting** with mobile-friendly content\n\nEven 15 minutes a day creates progress!",
      volatility:
        "Market volatility is concerning, but you're building, not trading!\n\n📈 **29% worry** about market instability\n🔨 **Focus on development** skills, not speculation\n🏗️ **Infrastructure building** is long-term valuable\n💼 **Career growth** independent of market swings\n🎯 **Skill development** compounds regardless of prices\n\nYour learning investment pays off in any market!",
      secure:
        "Your concerns are completely confidential:\n\n🔒 **Anonymous responses** - no personal identification\n📊 **Used only** to improve our support resources\n🚫 **No sharing** with third parties\n🎯 **Helps us** create better learning materials\n\nSharing concerns helps us help you better!",
      examples:
        "Here's how we address common developer concerns:\n\n📚 **Poor Docs**: Curated tutorials and clear examples\n🛡️ **Security**: Interactive safety training and best practices\n⚡ **Complexity**: Progressive learning with familiar concepts\n💰 **Costs**: Free resources and low-cost practice environments\n\nWe've got practical solutions for every worry!",
      skip: "You can skip this, but addressing concerns helps us:\n\n🎯 **Customize learning** to your specific worries\n📚 **Provide relevant** safety and security training\n🤝 **Connect you** with others who had similar concerns\n💡 **Offer solutions** proactively instead of reactively\n\nSharing concerns makes your learning journey smoother!",
      next: "After addressing concerns, we'll:\n\n📚 **Provide targeted resources** that address your worries\n🛡️ **Include extra security training** if needed\n🎯 **Customize recommendations** based on your concerns\n🤝 **Connect you** with supportive communities\n\nYou'll feel confident and prepared to start building!",
      default:
        "I'm here to address any concerns about Web3 development! Whether you're worried about security, complexity, documentation, costs, or anything else, let's talk through it. What's on your mind?",
    },
  };

  const stepResponses = responses[step] || responses["interests"];

  // Simple keyword matching for demo purposes
  const message = userMessage.toLowerCase();

  for (const [keyword, response] of Object.entries(stepResponses)) {
    if (message.includes(keyword)) {
      return response;
    }
  }

  return (
    stepResponses["default"] ||
    "I'm here to help! Could you please be more specific about what you'd like to know?"
  );
};

export default function ChatBot({ step }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(step);
  // Initial greeting based on step
  useEffect(() => {
    const greetings: Record<string, string> = {
      "wallet-setup":
        "Hi! I'm here to help you set up your first Web3 wallet safely. Do you have any questions about the process?",
      "chrome-extension":
        "Hey! I can help you understand and install the browser extension. Any questions about security or installation?",
      "developer-experience":
        "Hello! I'm here to help you share your developer background so we can tailor the perfect Web3 learning path for you. Any questions about this step?",
      interests:
        "Hello! I'm here to help you discover what interests you most in Web3. What would you like to explore?",
      "developer-hesitations":
        "Hi there! It's completely normal to have concerns about Web3. I'm here to address any worries and help you feel confident about your journey. What's on your mind?",
      recommendations:
        "Hi there! I can help you understand these recommendations and why they're perfect for your Web3 journey. Any questions about the events or courses?",
    };

    const greeting =
      greetings[step] ||
      "Hi! I'm your Web3 assistant. How can I help you today?";

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

    const aiResponse = getAIResponse(userInput, step);

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
  return (
    <motion.div
      key={`chatbot-${step}`}
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
          {" "}
          <Button
            onClick={() => setIsExpanded(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-xl shadow-violet-500/25"
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
              {" "}
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                {" "}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 aspect-square rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI Assistant</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-xs text-white/60">Online</span>
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
                      {" "}
                      <div
                        className={`w-8 h-8 aspect-square rounded-full flex items-center justify-center shrink-0 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                            : "bg-gradient-to-r from-violet-500 to-purple-600"
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
                        {" "}
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
                      {" "}
                      <div className="w-8 h-8 aspect-square rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
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
              </div>{" "}
              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-violet-400"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!userInput.trim() || isTyping}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
                  >
                    <Send className="h-4 w-4" />
                  </Button>{" "}
                </div>

                {/* Quick Actions */}
                <div className="mt-3 relative">
                  <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUserInput("I need help")}
                      className="text-white/60 hover:text-white hover:bg-white/5 text-xs whitespace-nowrap flex-shrink-0"
                    >
                      💡 I need help
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUserInput("How does this work?")}
                      className="text-white/60 hover:text-white hover:bg-white/5 text-xs whitespace-nowrap flex-shrink-0"
                    >
                      ❓ How does this work?
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUserInput("Is this secure?")}
                      className="text-white/60 hover:text-white hover:bg-white/5 text-xs whitespace-nowrap flex-shrink-0"
                    >
                      🔒 Is this secure?
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUserInput("What's next?")}
                      className="text-white/60 hover:text-white hover:bg-white/5 text-xs whitespace-nowrap flex-shrink-0"
                    >
                      ➡️ What&apos;s next?
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUserInput("Show me examples")}
                      className="text-white/60 hover:text-white hover:bg-white/5 text-xs whitespace-nowrap flex-shrink-0"
                    >
                      📋 Show examples
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUserInput("Skip this step")}
                      className="text-white/60 hover:text-white hover:bg-white/5 text-xs whitespace-nowrap flex-shrink-0"
                    >
                      ⏭️ Skip this step
                    </Button>
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
