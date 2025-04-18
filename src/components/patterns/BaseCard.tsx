"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BaseCardProps {
  title: string;
  subtitle?: string;
  status?: string;
  imageUrl?: string;
  className?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function BaseCard({
  title,
  subtitle,
  status,
  imageUrl,
  className,
  actions,
  children,
}: BaseCardProps) {
  const initials = title
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center gap-4">
        <Avatar>
          {imageUrl ? (
            <AvatarImage src={imageUrl} alt={title} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{title}</h3>
            {status && <Badge>{status}</Badge>}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {children}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </Card>
  );
}
