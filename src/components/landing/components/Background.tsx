"use client";
import { motion } from "framer-motion";

export default function Background() {
  return (
    <>
      {/* Enhanced fidgety animated background gradients */}
      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{
            x: [0, 20, -10, 15, 0],
            y: [0, -15, 10, 5, 0],
            rotate: [0, 1, -1, 0.5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-[10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -25, 18, 0],
            y: [0, 20, -12, 0],
            rotate: [0, -1.5, 1, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[150px]"
        />

        <motion.div
          animate={{
            x: [0, 12, -8, -20, 8, 0],
            y: [0, 8, -15, 5, -10, 0],
            rotate: [0, 0.8, -0.5, 1.2, -0.8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[130px]"
        />

        <motion.div
          animate={{
            x: [0, 15, -12, 0],
            y: [0, -20, 18, 0],
            rotate: [0, 1, -1.5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[60%] left-[30%] w-[350px] h-[350px] bg-indigo-400/8 rounded-full blur-[100px]"
        />

        <motion.div
          animate={{
            x: [0, -18, 22, -5, 0],
            y: [0, -8, 15, -25, 0],
            rotate: [0, -1, 1.5, -0.5, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[20%] left-[60%] w-[300px] h-[300px] bg-pink-500/8 rounded-full blur-[110px]"
        />

        <motion.div
          animate={{
            x: [0, 8, -15, 0],
            y: [0, 20, -10, 0],
            rotate: [0, 0.5, -1, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[30%] left-[15%] w-[280px] h-[280px] bg-cyan-400/10 rounded-full blur-[90px]"
        />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-0" />
    </>
  );
}
