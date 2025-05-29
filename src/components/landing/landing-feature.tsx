"use client";

import { useState } from "react";

// Import all components in the correct order
import Background from "./components/Background";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import Integrations from "./components/Integrations";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTASection";
import VideoModal from "./components/VideoModal";

export default function LandingFeature() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background component for animated gradients and grid */}
      <Background />

      {/* Main content sections in order */}
      <Hero setIsVideoPlaying={setIsVideoPlaying} />
      <Features />
      <Problem />
      <Solution />
      <Integrations />
      <Testimonials />
      <CTASection setIsVideoPlaying={setIsVideoPlaying} />

      {/* Video Modal that appears when triggered */}
      <VideoModal
        isVideoPlaying={isVideoPlaying}
        setIsVideoPlaying={setIsVideoPlaying}
      />
    </div>
  );
}
