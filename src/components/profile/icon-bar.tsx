import Link from "next/link";
import { Button } from "@/components/ui/button";

interface IconLink {
  icon: React.ReactNode;
  href: string;
}

interface IconBarProps {
  links: IconLink[];
}

export function IconBar({ links }: IconBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl h-9 w-9 border-muted-foreground/20 text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            {link.icon}
          </Button>
        </Link>
      ))}
    </div>
  );
}
