import { createTRPCRouter } from "@/server/api/trpc";
import { createPlacementFeedback } from "./create";
import {
  readPlacementFeedback,
  readDeletedPlacementFeedbacks,
  getPlacementFeedbackById,
  getPlacementFeedbackByData,
} from "./read";
import { updatePlacementFeedback } from "./update";
import { deletePlacementFeedback, restorePlacementFeedback } from "./delete";

export const placementFeedbackRouter = createTRPCRouter({
  create: createPlacementFeedback,
  read: readPlacementFeedback,
  readDeleted: readDeletedPlacementFeedbacks,
  getById: getPlacementFeedbackById,
  getByData: getPlacementFeedbackByData,
  update: updatePlacementFeedback,
  delete: deletePlacementFeedback,
  restore: restorePlacementFeedback,
});
