import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { LocationType } from "@/generated/prisma/client";

export const createLocation = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      addressLine1: z.string(),
      addressLine2: z.string().optional(),
      city: z.string(),
      stateProvince: z.string(),
      postalCode: z.string(),
      country: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      type: z.nativeEnum(LocationType),
      capacity: z.number().optional(),
      notes: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const location = await ctx.db.location.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return location;
    } catch (error) {
      console.error("Error creating location:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create location",
        cause: error,
      });
    }
  });
