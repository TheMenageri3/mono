import { publicProcedure } from "~/server/api/trpc";
import { type UnwrapArray, type UnwrapPromise } from "~/utils";
import { z } from "zod";

export const read = publicProcedure.query(({ ctx }) => {
  return ctx.db.university.findMany({
    orderBy: {
      name: "asc",
    },
  });
});

export const search = publicProcedure.input(z.object({
    query: z.string(),
})).query(({ ctx, input }) => {
    const { query } = input;
    return ctx.db.university.findMany({
        where: {
            name: { contains: query },
        },
    });
});

export type University = UnwrapArray<UnwrapPromise<ReturnType<typeof read>>>;
