import { createTRPCRouter } from "@/server/api/trpc";
import { createEventAttendee } from "./create";
import { deleteEventAttendee, restoreEventAttendee } from "./delete";
import {
  getEventAttendeeById,
  getEventAttendeesByEventId,
  getEventAttendeesByStatus,
  getEventAttendeesByType,
  getDeletedEventAttendees,
} from "./read";
import { updateEventAttendee } from "./update";

export const eventAttendeeRouter = createTRPCRouter({
  create: createEventAttendee,
  delete: deleteEventAttendee,
  restore: restoreEventAttendee,
  update: updateEventAttendee,
  getById: getEventAttendeeById,
  getByEventId: getEventAttendeesByEventId,
  getByStatus: getEventAttendeesByStatus,
  getByType: getEventAttendeesByType,
  getDeleted: getDeletedEventAttendees,
});
