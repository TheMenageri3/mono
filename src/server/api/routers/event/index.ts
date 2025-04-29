import { createTRPCRouter } from "../../trpc";
import { createEvent } from "./create";
import { deleteEvent, restoreEvent } from "./delete";
import {
  getAllEvents,
  getEventById,
  getEventsByOrganiserId,
  getEventsByLocationId,
  getFeaturedEvents,
  getEventsByStatus,
  getEventsByType,
} from "./read";
import { updateEvent } from "./update";

export const eventRouter = createTRPCRouter({
  create: createEvent,
  delete: deleteEvent,
  restore: restoreEvent,
  readEventsByOrganiserId: getEventsByOrganiserId,
  readEventById: getEventById,
  readAllEvents: getAllEvents,
  readEventsByLocationId: getEventsByLocationId,
  readFeaturedEvents: getFeaturedEvents,
  readEventsByStatus: getEventsByStatus,
  readEventsByType: getEventsByType,
  update: updateEvent,
});
