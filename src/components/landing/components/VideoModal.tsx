"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function VideoModal({
  isVideoPlaying,
  setIsVideoPlaying,
}: {
  isVideoPlaying: boolean;
  setIsVideoPlaying: (playing: boolean) => void;
}) {
  return (
    <AnimatePresence>
      {isVideoPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsVideoPlaying(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-full max-w-4xl mx-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                Platform Demo
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVideoPlaying(false)}
                className="text-white hover:bg-white/10"
              >
                ×
              </Button>
            </div>
            <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center">
              <p className="text-white/70">Demo video would go here</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
