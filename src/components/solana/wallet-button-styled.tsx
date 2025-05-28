"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "./solana-provider";
import { motion } from "framer-motion";
import { Wallet, ChevronDown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function StyledWalletButton() {
  const { connected, publicKey, connecting } = useWallet();

  return (
    <motion.div
      className="relative inline-block"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="wallet-button-wrapper">
        <WalletButton />
      </div>

      {/* Enhanced styling for the wallet button */}
      <style jsx global>{`
        .wallet-button-wrapper .wallet-adapter-button {
          position: relative;
          overflow: hidden;
          font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-weight: 500 !important;
          letter-spacing: -0.01em !important;
        }

        /* Shimmer effect for connecting state */
        .wallet-button-wrapper
          .wallet-adapter-button.wallet-adapter-button-loading::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        /* Hover shimmer effect */
        .wallet-button-wrapper
          .wallet-adapter-button:not(.wallet-adapter-button-loading)::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: left 0.6s ease;
        }

        .wallet-button-wrapper .wallet-adapter-button:hover::before {
          left: 100%;
        }

        /* Disconnected state styling */
        .wallet-button-wrapper
          .wallet-adapter-button:not(.wallet-adapter-button-trigger) {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: rgba(255, 255, 255, 0.9) !important;
        }

        .wallet-button-wrapper
          .wallet-adapter-button:not(.wallet-adapter-button-trigger):hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          box-shadow: 0 8px 32px rgba(147, 51, 234, 0.15) !important;
        }

        /* Connected state styling */
        .wallet-button-wrapper
          .wallet-adapter-button.wallet-adapter-button-trigger {
          background: linear-gradient(
            135deg,
            rgba(147, 51, 234, 0.8),
            rgba(59, 130, 246, 0.8)
          ) !important;
          border: 1px solid rgba(147, 51, 234, 0.5) !important;
          color: white !important;
          position: relative;
        }

        .wallet-button-wrapper
          .wallet-adapter-button.wallet-adapter-button-trigger::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            rgba(147, 51, 234, 0.2),
            rgba(59, 130, 246, 0.2)
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .wallet-button-wrapper
          .wallet-adapter-button.wallet-adapter-button-trigger:hover {
          background: linear-gradient(
            135deg,
            rgba(147, 51, 234, 0.9),
            rgba(59, 130, 246, 0.9)
          ) !important;
          border-color: rgba(147, 51, 234, 0.7) !important;
          box-shadow: 0 8px 32px rgba(147, 51, 234, 0.25) !important;
        }

        .wallet-button-wrapper
          .wallet-adapter-button.wallet-adapter-button-trigger:hover::after {
          opacity: 1;
        }

        /* Loading state */
        .wallet-button-wrapper
          .wallet-adapter-button.wallet-adapter-button-loading {
          background: rgba(255, 255, 255, 0.08) !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          cursor: wait !important;
        }

        /* Focus states */
        .wallet-button-wrapper .wallet-adapter-button:focus-visible {
          outline: 2px solid rgba(147, 51, 234, 0.6) !important;
          outline-offset: 2px !important;
        }

        /* Icon styling */
        .wallet-button-wrapper .wallet-adapter-button-start-icon,
        .wallet-button-wrapper .wallet-adapter-button-end-icon {
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
        }

        /* Dropdown styling */
        .wallet-adapter-dropdown-list {
          transform: translateY(-4px) !important;
        }

        .wallet-adapter-dropdown-list-active {
          transform: translateY(0) !important;
        }
      `}</style>
    </motion.div>
  );
}
