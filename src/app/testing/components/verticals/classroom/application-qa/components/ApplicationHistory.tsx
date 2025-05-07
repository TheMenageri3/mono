import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Download, Eye, XCircle } from "lucide-react";

interface Application {
  id: string;
  applicant: {
    name: string;
    email: string;
    avatar?: string;
  };
  submittedAt: string;
  status: "completed" | "in_progress" | "abandoned";
  completionRate: number;
  reviewStatus?: "pending" | "approved" | "rejected";
}

interface ApplicationHistoryProps {
  applications: Application[];
  onView: (id: string) => void;
  onExport: (id: string) => void;
}

export function ApplicationHistory({
  applications,
  onView,
  onExport,
}: ApplicationHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Submissions</CardTitle>
        <CardDescription>
          Recent application submissions and their statuses
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y">
          {applications.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between p-4 hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={app.applicant.avatar}
                    alt={app.applicant.name}
                  />
                  <AvatarFallback>
                    {app.applicant.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="font-medium">{app.applicant.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {app.applicant.email}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {app.status === "completed" ? (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="h-3 w-3" />
                        <span>Completed</span>
                      </Badge>
                    ) : app.status === "in_progress" ? (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" />
                        <span>{app.completionRate}% Completed</span>
                      </Badge>
                    ) : (
                      <Badge
                        variant="destructive"
                        className="flex items-center gap-1"
                      >
                        <XCircle className="h-3 w-3" />
                        <span>Abandoned</span>
                      </Badge>
                    )}

                    {app.reviewStatus && (
                      <Badge
                        variant={
                          app.reviewStatus === "pending"
                            ? "outline"
                            : app.reviewStatus === "approved"
                            ? "default"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {app.reviewStatus.charAt(0).toUpperCase() +
                          app.reviewStatus.slice(1)}
                      </Badge>
                    )}

                    <span className="text-xs text-muted-foreground">
                      {app.submittedAt}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onView(app.id)}
                  title="View Application"
                >
                  <Eye className="h-4 w-4" />
                </Button>

                {app.status === "completed" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onExport(app.id)}
                    title="Export as PDF"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
