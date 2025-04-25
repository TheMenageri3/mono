import React from "react";
import CreateEvent from "./components/CreateEvent";
import ListEvent from "./components/ListEvent";

export const EventPage = () => {
  return (
    <div>
      <CreateEvent />
      <ListEvent />
    </div>
  );
};
