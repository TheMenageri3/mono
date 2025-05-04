import React from "react";
import CreateClassroom from "./components/CreateClassroom";
import UpdateClassroom from "./components/UpdateClassroom";
import DeleteClassroom from "./components/DeleteClassroom";
import RestoreClassroom from "./components/RestoreClassroom";
import ListClassroom from "./components/ListClassroom";

export default function ClassroomPage() {
  return (
    <div>
      <CreateClassroom />
      <UpdateClassroom />
      <DeleteClassroom />
      <RestoreClassroom />
      <ListClassroom />
    </div>
  );
}
