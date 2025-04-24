import { MapPin, Briefcase } from "lucide-react";

interface ProfileAboutProps {
  bio: string;
  role: string;
  location: string;
}

export function ProfileAbout({ bio, role, location }: ProfileAboutProps) {
  return (
    <div className="bg-background rounded-xl border p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-6">About</h3>
      <div className="space-y-6">
        <div className="text-muted-foreground leading-relaxed">{bio}</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-medium">{role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
