import React from "react";
import CreateClassApplication from "./components/CreateClassApplication";
import { ListClassApplication } from "./components/ListClassApplication";

export default function EventPage() {
  return (
    <div>
      <CreateClassApplication />
      <ListClassApplication />
    </div>
  );
}
