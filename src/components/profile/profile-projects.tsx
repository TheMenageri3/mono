import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  bgColor?: string;
  bgPattern?: string;
  icon?: string;
  tags: string[];
  link: string;
}

interface ProfileProjectsProps {
  projects: Project[];
}

export function ProfileProjects({ projects }: ProfileProjectsProps) {
  return (
    <div className="space-y-8">
      {projects.map((project, index) => (
        <div
          key={index}
          className="group relative bg-background rounded-xl border overflow-hidden transition-all hover:shadow-md"
        >
          <div className="flex flex-col md:flex-row">
            {/* Project icon/visual section */}
            <div
              className={cn(
                "w-full md:w-24 h-24 md:h-auto flex items-center justify-center",
                project.bgColor || "bg-primary/10"
              )}
              style={
                project.bgPattern ? { backgroundImage: project.bgPattern } : {}
              }
            >
              <span className="text-4xl">{project.icon}</span>
            </div>

            {/* Project content */}
            <div className="flex-1 p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <Link
                  href={project.link}
                  className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>View project</span>
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </div>

              <p className="text-muted-foreground mt-2 mb-4 text-sm">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="font-normal text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 border-2 border-transparent opacity-0 rounded-xl transition-opacity group-hover:opacity-100 group-hover:border-primary/20 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
