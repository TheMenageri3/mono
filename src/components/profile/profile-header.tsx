import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  handle: string;
  avatar: string;
  role: string;
  location: string;
  status: string;
}

export function ProfileHeader({
  name,
  handle,
  avatar,
  role,
  location,
  status,
}: ProfileHeaderProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
      <Avatar className="h-24 w-24 border-4 border-background shadow-md">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="text-xl font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-muted-foreground">@{handle}</p>
          </div>

          <div className="sm:ml-auto flex flex-wrap gap-2 mt-2 sm:mt-0">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20"
            >
              {status}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-4 mt-2">
          <p className="font-medium">{role}</p>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 sm:mt-0 flex gap-2">
        <Button>Connect</Button>
        <Button variant="outline">Message</Button>
      </div>
    </div>
  );
}
