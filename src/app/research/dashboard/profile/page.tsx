import React from "react";
import ProfileForm from "~/_components/final/Profile/ProfileForm";
import { Button } from "~/_components/final/ui/button";
import Link from "next/link";

export default async function UpdateProfilePage() {
  const userData = await getUserData();

  return (
    <>
      <div className="mb-6 flex flex-shrink-0 items-center justify-end">
        <Link href="/research/profile">
          <Button className="bg-zinc-600 text-xs text-white hover:bg-zinc-500">
            Go to your public profile
          </Button>
        </Link>
      </div>
      <div className="flex-grow">
        <ProfileForm initialData={userData} />
      </div>
    </>
  );
}

// TODO: Fetch user data
async function getUserData() {
  return {
    name: "",
    email: "",
    organization: "",
    socialLinks: "",
    bio: "",
    isVerified: true,
    id: "",
  };
}
