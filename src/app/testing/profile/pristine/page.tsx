"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileAbout from "@/components/profile/pristine/profile-about";
import ProfileSkills from "@/components/profile/pristine/profile-skills";
import ProfileProjects from "@/components/profile/pristine/profile-projects";
import { cn } from "@/lib/utils";

// Mock data for the profile
const profile = {
  name: "Alex Morgan",
  handle: "alexmorgan",
  avatar: "https://github.com/shadcn.png",
  role: "Product Designer & Developer",
  location: "San Francisco, CA",
  status: "Available for projects",
  bio: "I build digital products with a focus on user experience and accessibility. Currently working on design systems and component libraries for web applications.",
  links: {
    github: "github.com/alexmorgan",
    twitter: "twitter.com/alexmorgan",
    linkedin: "linkedin.com/in/alexmorgan",
    email: "alex@example.com",
    resume: "/resume.pdf",
  },
  skills: [
    {
      category: "Design",
      items: [
        "UI/UX",
        "Design Systems",
        "User Research",
        "Wireframing",
        "Prototyping",
        "Figma",
      ],
    },
    {
      category: "Development",
      items: [
        "React",
        "TypeScript",
        "Next.js",
        "TailwindCSS",
        "Node.js",
        "GraphQL",
        "Frontend Architecture",
      ],
    },
    {
      category: "Tools",
      items: [
        "Git",
        "VS Code",
        "Storybook",
        "Jest",
        "Netlify",
        "Vercel",
        "GitHub Actions",
      ],
    },
  ],
  projects: [
    {
      title: "Design System Framework",
      description:
        "A cohesive system of components, guidelines, and tools for product teams",
      bgColor: "from-purple-400/20 to-blue-500/20",
      icon: "✨",
      tags: ["Design Systems", "React", "Documentation"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Data visualization interface with customizable widgets and real-time updates",
      bgColor: "from-indigo-400/20 to-purple-600/20",
      icon: "📊",
      tags: ["Dashboard", "Data Viz", "React"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=2070",
    },
    {
      title: "Mobile App Redesign",
      description: "Complete UX overhaul of a fintech mobile application",
      bgColor: "from-fuchsia-400/20 to-purple-400/20",
      icon: "📱",
      tags: ["Mobile", "UX Design", "Fintech"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1621111848501-8d3634f82336?q=80&w=1965",
    },
  ],
};

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Handle intersection observer for sections
  useEffect(() => {
    setMounted(true);

    // Create IntersectionObserver to track which section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -300px 0px", // Adjust for better section detection
        threshold: 0.3, // Trigger when 30% of the element is visible
      }
    );

    // Observe each section
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen  text-white selection:bg-purple-500/30 selection:text-white">
      {/* Background gradient effect */}
      <div className="fixed inset-0  z-[-2]">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-fuchsia-500/20 rounded-full blur-[100px]" />
      </div>

      {/* Subtle grid overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Main content container */}
      <div className="container max-w-5xl mx-auto px-4 py-16 sm:py-24">
        {/* About Section */}
        <section id="about" className="mb-24">
          <ProfileAbout
            profile={profile}
            activeSection={activeSection === "about"}
          />
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-24">
          <ProfileSkills
            skills={profile.skills}
            activeSection={activeSection === "skills"}
          />
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-16">
          <ProfileProjects
            projects={profile.projects}
            activeSection={activeSection === "projects"}
          />
        </section>

        {/* Subtle footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-white/50 pt-12 pb-4"
        >
          <p>
            © {new Date().getFullYear()} {profile.name} — Built with Next.js
          </p>
        </motion.footer>
      </div>

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-6">
          {["about", "skills", "projects"].map((section) => (
            <button
              key={section}
              onClick={() => {
                document.getElementById(section)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="group relative w-3 h-3"
              aria-label={`Navigate to ${section} section`}
            >
              <span
                className={cn(
                  "block w-2 h-2 rounded-full transition-all duration-300",
                  activeSection === section
                    ? "bg-purple-500 scale-150"
                    : "bg-white/30 group-hover:bg-white/70"
                )}
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-white text-xs capitalize whitespace-nowrap transition-opacity">
                {section}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
