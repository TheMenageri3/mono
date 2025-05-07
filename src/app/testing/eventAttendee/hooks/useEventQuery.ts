import { api } from "@/trpc/react";
import type { z } from "zod";
import { getAllEventsSchema } from "@/schemas";

type ReadEventsInput = z.infer<typeof getAllEventsSchema>;

export const useEventQuery = (
  input: ReadEventsInput = { limit: 10, offset: 0 }
) => {
  return api.event.readAllEvents.useQuery(input);
};
