import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readSections = protectedProcedure.query(async ({ ctx }) => {
  try {
	const sections = await ctx.db.section.findMany({
	  where: {
		deletedAt: null,
	  },
	  orderBy: {
		updatedAt: "desc",
	  },
	});
	return sections;
  } catch (error) {
	console.error("Error reading sections:", error);
	throw new TRPCError({
	  code: "INTERNAL_SERVER_ERROR",
	  message: "Failed to read sections",
	  cause: error,
	});
  }
});

export const readDeletedSections = protectedProcedure.query(async ({ ctx }) => {
  try {
	const sections = await ctx.db.section.findMany({
	  where: {
		deletedAt: { not: null },
	  },
	  orderBy: {
		updatedAt: "desc",
	  },
	});
	return sections;
  } catch (error) {
	console.error("Error reading sections:", error);
	throw new TRPCError({
	  code: "INTERNAL_SERVER_ERROR",
	  message: "Failed to read deleted sections",
	  cause: error,
	});
  }
});

export const getSectionById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
	try {
	  const section = await ctx.db.section.findUnique({
		where: {
		  id: input.id,
		  deletedAt: null,
		},
	  });
	  return section;
	} catch (error) {
	  console.error("Error getting section by id:", error);
	  throw new TRPCError({
		code: "INTERNAL_SERVER_ERROR",
		message: "Failed to get section",
		cause: error,
	  });
	}
  });
