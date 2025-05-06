import React from "react";
import CreateClassApplication from "./components/CreateClassApplication";
import ListClassApplication from "./components/ListClassApplication";
import DeleteClassApplication from "./components/DeleteClassApplication";
import RestoreClassApplication from "./components/RestoreClassApplication";
import UpdateClassApplication from "./components/UpdateClassApplication";

export default function EventPage() {
  return (
    <div>
      <CreateClassApplication />
      <UpdateClassApplication />
      <DeleteClassApplication />
      <RestoreClassApplication />
      <ListClassApplication />
    </div>
  );
}
