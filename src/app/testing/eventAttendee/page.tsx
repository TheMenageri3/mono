import React from "react";
import CreateEventAttendee from "./componenets/CreateEventAttendee";
import ListByButton from "./componenets/ListByButton";

const page = () => {
  return (
    <div className="space-y-6">
      <CreateEventAttendee />
      <ListByButton />
    </div>
  );
};

export default page;
