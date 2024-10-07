import { publicProcedure } from "~/server/api/trpc";
import { type UnwrapArray, type UnwrapPromise } from "~/utils";
import { z } from "zod";

export const read = publicProcedure.query(({ ctx }) => {
  return ctx.db.dAO.findMany({
    include: {
      creator: true,
      proposals: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
});

export const search = publicProcedure
  .input(
    z.object({
      query: z.string(),
    }),
  )
  .query(({ ctx, input }) => {
    const { query } = input;
    return ctx.db.entry.findMany({
      where: {
        term: { contains: query, mode: "insensitive" },
        hidden: false,
      },
    });
  });

export type DAO = UnwrapArray<UnwrapPromise<ReturnType<typeof read>>>;
export type DAOSearchResult = UnwrapArray<
  UnwrapPromise<ReturnType<typeof search>>
>;
export type Proposal = DAO["proposals"][number];
