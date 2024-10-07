import { read } from "./read";
import { createTRPCRouter } from "~/server/api/trpc";
import {
  create,
  createAdmin,
  createResponse,
  createResponseAdmin,
} from "./create";
import { likeFlick, saveFlick } from "./update";
import { unlikeFlick, unsaveFlick } from "./delete";

export const flickRouter = createTRPCRouter({
  read,
  create,
  createResponse,
  createAdmin,
  createResponseAdmin,
  saveFlick,
  unsaveFlick,
  likeFlick,
  unlikeFlick,
});
