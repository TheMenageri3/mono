"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  Download,
  Shield,
  Key,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  Monitor,
  Chrome,
} from "lucide-react";

interface WalletSetupGuideProps {
  onNext: () => void;
}

const walletOptions = [
  {
    name: "MetaMask",
    type: "Browser Extension",
    icon: "🦊",
    description: "Most popular Web3 wallet with excellent browser integration",
    platforms: ["Chrome", "Firefox", "Edge"],
    pros: ["Easy to use", "Wide compatibility", "Strong security"],
    downloadUrl: "https://metamask.io/download/",
    recommended: true,
  },
  {
    name: "Phantom",
    type: "Multi-Platform",
    icon: "👻",
    description: "Beautiful Solana-focused wallet with multi-chain support",
    platforms: ["Chrome", "iOS", "Android"],
    pros: ["Great UX", "Solana native", "Mobile support"],
    downloadUrl: "https://phantom.app/",
    recommended: false,
  },
  {
    name: "Coinbase Wallet",
    type: "Mobile First",
    icon: "🔵",
    description: "User-friendly wallet backed by Coinbase exchange",
    platforms: ["iOS", "Android", "Chrome"],
    pros: ["Beginner friendly", "Exchange integration", "Good support"],
    downloadUrl: "https://www.coinbase.com/wallet",
    recommended: false,
  },
];

export default function WalletSetupGuide({ onNext }: WalletSetupGuideProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<
    "choose" | "install" | "secure"
  >("choose");

  const handleWalletSelect = (walletName: string) => {
    setSelectedWallet(walletName);
    setCurrentStep("install");
  };

  const handleInstallComplete = () => {
    setCurrentStep("secure");
  };

  const selectedWalletData = walletOptions.find(
    (w) => w.name === selectedWallet
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      {/* Step 1: Choose Wallet */}
      {currentStep === "choose" && (
        <motion.div
          key="choose"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <Wallet className="h-16 w-16 mx-auto mb-4 text-violet-400" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your Web3 Wallet
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              A crypto wallet is your gateway to Web3. It stores your digital
              assets and lets you interact with decentralized applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {walletOptions.map((wallet) => (
              <motion.div
                key={wallet.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleWalletSelect(wallet.name)}
                className="cursor-pointer"
              >
                <Card
                  className={`bg-white/5 backdrop-blur-xl border-white/10 transition-all duration-300 hover:bg-white/10 ${
                    wallet.recommended ? "ring-2 ring-violet-500/50" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    {wallet.recommended && (
                      <Badge className="mb-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white">
                        Recommended
                      </Badge>
                    )}

                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">{wallet.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {wallet.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs text-white/60 border-white/20"
                      >
                        {wallet.type}
                      </Badge>
                    </div>

                    <p className="text-white/70 text-sm mb-4 text-center">
                      {wallet.description}
                    </p>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white font-medium text-sm mb-2">
                          Platforms:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {wallet.platforms.map((platform) => (
                            <Badge
                              key={platform}
                              variant="secondary"
                              className="text-xs bg-white/10 text-white/80"
                            >
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium text-sm mb-2">
                          Key Benefits:
                        </h4>
                        <ul className="space-y-1">
                          {wallet.pros.map((pro, index) => (
                            <li
                              key={index}
                              className="text-white/60 text-xs flex items-center gap-2"
                            >
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/50 text-sm">
              Don&apos;t worry - you can always add more wallets later.
              Let&apos;s start with one!
            </p>
          </div>
        </motion.div>
      )}

      {/* Step 2: Installation Guide */}
      {currentStep === "install" && selectedWalletData && (
        <motion.div
          key="install"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{selectedWalletData.icon}</div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Install {selectedWalletData.name}
                </h2>
                <p className="text-white/70 text-lg">
                  Follow these steps to install and set up your wallet
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Download className="h-5 w-5 text-violet-400" />
                      Installation Steps
                    </h3>

                    <div className="space-y-3">
                      {[
                        "Visit the official website",
                        "Click 'Download' or 'Install'",
                        "Add to your browser/device",
                        "Create a new wallet",
                        "Save your seed phrase securely",
                      ].map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <span className="text-white/80">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      Security Tips
                    </h3>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                      <h4 className="text-yellow-400 font-semibold mb-2">
                        ⚠️ Important:
                      </h4>
                      <ul className="space-y-2 text-white/70 text-sm">
                        <li>• Never share your seed phrase with anyone</li>
                        <li>
                          • Write it down on paper (don&apos;t store digitally)
                        </li>
                        <li>• Keep it in a safe, secure location</li>
                        <li>• Only download from official sources</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-6">
                  <Button
                    size="lg"
                    onClick={() =>
                      window.open(selectedWalletData.downloadUrl, "_blank")
                    }
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Install {selectedWalletData.name}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleInstallComplete}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    I&apos;ve Installed It
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Step 3: Security Setup */}
      {currentStep === "secure" && selectedWalletData && (
        <motion.div
          key="secure"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Shield className="h-16 w-16 mx-auto mb-4 text-green-400" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Secure Your Wallet
                </h2>
                <p className="text-white/70 text-lg">
                  Let&apos;s make sure your wallet is properly secured
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Key className="h-5 w-5 text-violet-400" />
                      Backup Your Seed Phrase
                    </h3>
                    <p className="text-white/60 text-sm mb-4">
                      Your seed phrase is like a master key. If you lose it, you
                      lose access to your wallet forever.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Write it down on paper
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Store in multiple safe locations
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Never share with anyone
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-400" />
                      Enable Security Features
                    </h3>
                    <p className="text-white/60 text-sm mb-4">
                      Enable all available security features to protect your
                      assets.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Set a strong password
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Enable biometric unlock
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Review permissions carefully
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
                  <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                    🎉 You&apos;re Almost Ready!
                  </h3>
                  <p className="text-white/70 text-sm">
                    Once you&apos;ve secured your wallet, you&apos;ll have full
                    control over your digital assets and can safely interact
                    with Web3 applications.
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={onNext}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8"
                  >
                    My Wallet is Secured
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
