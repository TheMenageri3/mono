"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileAbout from "@/components/profile/enhanced/profile-about";
import ProfileSkills from "@/components/profile/enhanced/profile-skills";
import ProfileProjects from "@/components/profile/enhanced/profile-projects";
import ProfileExperience from "@/components/profile/enhanced/profile-experience";
import ProfileEducation from "@/components/profile/enhanced/profile-education";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for the profile
const profile = {
  name: "Alex Morgan",
  handle: "alexmorgan",
  avatar: "https://github.com/shadcn.png",
  role: "Product Designer & Developer",
  location: "San Francisco, CA",
  status: "Available for projects",
  bio: "I build digital products with a focus on user experience and accessibility. man i dont wanna write more stuff man",
  experience: [
    {
      position: "Senior Product Designer",
      company: "DesignSphere",
      period: "2021 - Present",
      description:
        "Leading design initiatives for enterprise clients and mentoring junior designers.",
    },
    {
      position: "UI Developer",
      company: "TechFront",
      period: "2018 - 2021",
      description:
        "Built component libraries and implemented design systems across multiple products.",
    },
  ],
  education: {
    degree: "B.S. in Computer Science",
    institution: "University of California",
    year: "2018",
  },
  links: {
    github: "github.com/alexmorgan",
    twitter: "twitter.com/alexmorgan",
    linkedin: "linkedin.com/in/alexmorgan",
    email: "alex@example.com",
    resume: "/resume.pdf",
    website: "alexmorgan.design",
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
        "Adobe XD",
        "User Testing",
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
        "Responsive Design",
        "CSS-in-JS",
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
        "Jira",
        "Notion",
      ],
    },
  ],
  projects: [
    {
      title: "Design System Framework",
      description:
        "A cohesive system of components, guidelines, and tools for product teams. Implemented across 5 different product lines with 30% improvement in design-to-development handoff efficiency.",
      bgColor: "from-purple-400/20 to-blue-500/20",
      icon: "✨",
      tags: ["Design Systems", "React", "Documentation", "Accessibility"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064",
      category: "projects",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Data visualization interface with customizable widgets and real-time updates. Used by marketing teams to track campaign performance with custom reporting features.",
      bgColor: "from-indigo-400/20 to-purple-600/20",
      icon: "📊",
      tags: ["Dashboard", "Data Viz", "React", "State Management"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=2070",
      category: "projects",
    },
    {
      title: "Mobile App Redesign",
      description:
        "Complete UX overhaul of a fintech mobile application. Resulted in 45% increase in user engagement and 25% reduction in support tickets related to usability issues.",
      bgColor: "from-fuchsia-400/20 to-purple-400/20",
      icon: "📱",
      tags: ["Mobile", "UX Design", "Fintech", "React Native"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1621111848501-8d3634f82336?q=80&w=1965",
      category: "projects",
    },
    {
      title: "Open Source Design Library",
      description:
        "Contributed UI components and documentation to a popular open source design system. Added accessible form components and dark mode support.",
      bgColor: "from-emerald-400/20 to-green-500/20",
      icon: "🧩",
      tags: ["Open Source", "Accessibility", "Documentation"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070",
      category: "contributions",
    },
    {
      title: "Healthcare Portal",
      description:
        "Led frontend development for a healthcare provider's patient portal. Implemented secure authentication and real-time appointment scheduling.",
      bgColor: "from-blue-400/20 to-cyan-500/20",
      icon: "🏥",
      tags: ["Healthcare", "Security", "UX Research"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070",
      category: "projects",
    },
    {
      title: "AI Assistant Hackathon",
      description:
        "48-hour hackathon project creating a voice-controlled design assistant. Won first place for innovation and technical execution.",
      bgColor: "from-orange-400/20 to-amber-500/20",
      icon: "🤖",
      tags: ["Hackathon", "AI", "Voice UI", "Rapid Prototyping"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070",
      category: "hackathons",
    },
    {
      title: "Climate Change Datathon",
      description:
        "Created interactive visualizations for climate data during a weekend datathon. Developed a tool to show environmental impact of daily choices.",
      bgColor: "from-green-400/20 to-emerald-500/20",
      icon: "🌍",
      tags: ["Hackathon", "Data Science", "Climate", "D3.js"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2070",
      category: "hackathons",
    },
  ],
};

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [projectCategory, setProjectCategory] = useState("projects");

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

  // Filter projects based on selected category
  const filteredProjects = profile.projects.filter(
    (project) => project.category === projectCategory
  );

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

      {/* Main content container - increased max-width to use more space */}
      <div className="container max-w-6xl mx-auto px-4 py-12 sm:py-20">
        {/* About Section with new layout structure */}
        <section id="about" className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main about information */}
            <div className="lg:col-span-2">
              <ProfileAbout
                profile={profile}
                activeSection={activeSection === "about"}
              />
            </div>

            {/* Experience and education in the sidebar */}
            <div className="space-y-6">
              <ProfileExperience
                experience={profile.experience}
                activeSection={activeSection === "about"}
              />
              <ProfileEducation
                education={profile.education}
                activeSection={activeSection === "about"}
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-20">
          <ProfileSkills
            skills={profile.skills}
            activeSection={activeSection === "skills"}
          />
        </section>

        {/* Projects Section with category tabs */}
        <section id="projects" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6"
          >
            <h2 className="text-3xl font-bold inline-block mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Work & Contributions
              </span>
            </h2>
            <p className="mt-1 mb-6 text-white/60 max-w-3xl">
              A selection of my most impactful work, open source contributions,
              and hackathon projects.
            </p>

            {/* Category tabs */}
            <Tabs
              defaultValue="projects"
              value={projectCategory}
              onValueChange={setProjectCategory}
              className="mb-6"
            >
              <TabsList className="bg-white/5 border border-white/10">
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="contributions"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
                >
                  Contributions
                </TabsTrigger>
                <TabsTrigger
                  value="hackathons"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
                >
                  Hackathons
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={projectCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileProjects
                projects={filteredProjects}
                activeSection={activeSection === "projects"}
                category={projectCategory}
              />
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-12 text-center"
            >
              <p className="text-white/70">
                No {projectCategory} to display at this time.
              </p>
            </motion.div>
          )}
        </section>

        {/* Subtle footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-white/50 pt-10 pb-4"
        >
          <p>
            © {new Date().getFullYear()} {profile.name} — Built with Next.js &
            TailwindCSS
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
