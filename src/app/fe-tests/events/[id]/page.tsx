"use client";

import { useParams } from "next/navigation";
import EventPage from "../../eventpage/page";

export default function DynamicEventPage() {
  const params = useParams();
  const id = params?.id as string;

  // In a real app, you would fetch the event data based on the id
  // For now, we're reusing the mock event page

  return <EventPage />;
}
