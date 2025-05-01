import React from "react";
import CreateEvent from "./components/CreateEvent";
import { ListEvent } from "./components/ListEvent";

export default function EventPage() {
  return (
    <div>
      <CreateEvent />
      <ListEvent />
    </div>
  );
}
