import Link from "next/link";
import { FileText, Edit, Code, Package } from "lucide-react";

interface Activity {
  type: "project" | "article" | "contribution" | "release";
  title: string;
  date: string;
  description: string;
  link: string;
}

interface ProfileActivityProps {
  activities: Activity[];
}

export function ProfileActivity({ activities }: ProfileActivityProps) {
  // Function to get the appropriate icon for each activity type
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "project":
        return <Package className="h-5 w-5" />;
      case "article":
        return <FileText className="h-5 w-5" />;
      case "contribution":
        return <Code className="h-5 w-5" />;
      case "release":
        return <Edit className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <div key={index} className="flex gap-4">
          <div
            className={`mt-1 flex-shrink-0 p-1.5 rounded-md ${
              activity.type === "project"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                : activity.type === "article"
                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                : activity.type === "contribution"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
            }`}
          >
            {getActivityIcon(activity.type)}
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-1.5">
              <Link
                href={activity.link}
                className="font-medium hover:underline"
              >
                {activity.title}
              </Link>
              <span className="text-sm text-muted-foreground sm:ml-2">
                {activity.date}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {activity.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
