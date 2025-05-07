import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Connection {
  name: string;
  avatar: string;
  role: string;
  mutual: number;
}

interface ProfileConnectionsProps {
  connections: Connection[];
}

export function ProfileConnections({ connections }: ProfileConnectionsProps) {
  return (
    <div className="space-y-4">
      {connections.map((connection, index) => {
        const initials = connection.name
          .split(" ")
          .map((n) => n[0])
          .join("");

        return (
          <div key={index} className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={connection.avatar} alt={connection.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{connection.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {connection.role}
              </p>
            </div>

            {connection.mutual > 0 && (
              <Badge
                variant="outline"
                className="font-normal text-xs bg-secondary/40 border-secondary/40"
              >
                {connection.mutual} mutual
              </Badge>
            )}
          </div>
        );
      })}
    </div>
  );
}
