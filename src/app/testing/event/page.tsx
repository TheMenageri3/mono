import React from "react";
import { getServerAuthSession } from "@/server/auth/auth";
import CreateEvent from "./components/CreateEvent";
import { ListEvent } from "./components/ListEvent";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EventPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
        <h1 className="text-2xl font-bold mb-4">
          You must be signed in to access events.
        </h1>
        <Link href="/auth/login">
          <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <CreateEvent />
      <ListEvent />
    </div>
  );
}
