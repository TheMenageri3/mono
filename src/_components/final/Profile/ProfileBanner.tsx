/* eslint-disable @next/next/no-img-element */
import { Pen, Save } from "lucide-react";

import { Button } from "~/_components/ui/button";
import { VerifyBadge } from "~/_components/VerifyBadge";
import { ProfileBK } from "./ProfileBK";

interface ProfileBannerProps {
  avatarSrc: string;
  onEditClick: () => void;
  onSaveClick: () => void;
  isVerified?: boolean;
  backgroundImage: string | null;
  isNewBackgroundImage: boolean;
}

export function ProfileBanner({
  avatarSrc,
  onEditClick,
  onSaveClick,
  isVerified = false,
  backgroundImage,
  isNewBackgroundImage,
}: ProfileBannerProps) {
  return (
    <div className="relative mb-16">
      <div className="h-52 overflow-hidden">
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt="Profile background"
            className="h-full w-full object-cover"
          />
        ) : (
          <ProfileBK className="h-full w-full" />
        )}
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
        <div className="relative h-24 w-24 rounded-full border-4 border-white">
          <img
            src={avatarSrc}
            alt="Profile avatar"
            className="h-full w-full rounded-full object-cover"
          />
          {isVerified && (
            <div className="absolute -right-1 bottom-2">
              <VerifyBadge className="text-secondary" />
            </div>
          )}
        </div>
      </div>

      {/* Edit and Save Profile Buttons */}
      <div className="absolute right-4 top-4 flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-zinc-800 hover:bg-zinc-700"
          onClick={onEditClick}
        >
          <Pen className="h-4 w-4 text-white" />
        </Button>
        {isNewBackgroundImage && (
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-green-600 hover:bg-green-700"
            onClick={onSaveClick}
          >
            <Save className="h-4 w-4 text-white" />
          </Button>
        )}
      </div>
    </div>
  );
}
