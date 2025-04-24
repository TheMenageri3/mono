import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Skill {
  category: string;
  items: string[];
}

interface ProfileSkillsProps {
  skills: Skill[];
  displayType?: "list" | "grid";
}

export function ProfileSkills({
  skills,
  displayType = "list",
}: ProfileSkillsProps) {
  if (displayType === "grid") {
    return (
      <div className="space-y-6">
        {skills.map((skillGroup) => (
          <div key={skillGroup.category}>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              {skillGroup.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="rounded-md font-normal"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {skills.map((skillGroup) => (
        <div key={skillGroup.category} className="space-y-2">
          <h4 className="text-sm font-medium">{skillGroup.category}</h4>
          <div className="flex flex-wrap gap-1.5">
            {skillGroup.items.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="bg-secondary/50 border-secondary/50 text-secondary-foreground font-normal"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
