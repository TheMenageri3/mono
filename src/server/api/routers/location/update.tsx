import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { LocationTypeEnum } from "./create";

export const updateLocation = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      addressLine1: z.string().optional(),
      addressLine2: z.string().optional(),
      city: z.string().optional(),
      stateProvince: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      type: LocationTypeEnum.optional(),
      capacity: z.number().optional(),
      notes: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existing = await ctx.db.location.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Location already deleted",
      });
    }

    try {
      const location = await ctx.db.location.update({
        where: { id: input.id },
        data: {
          name: input.name,
          addressLine1: input.addressLine1,
          addressLine2: input.addressLine2,
          city: input.city,
          stateProvince: input.stateProvince,
          postalCode: input.postalCode,
          country: input.country,
          latitude: input.latitude,
          longitude: input.longitude,
          type: input.type,
          capacity: input.capacity,
          notes: input.notes,
          updatedById: userId,
        },
      });

      return location;
    } catch (error) {
      console.error("Error updating location:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update location",
        cause: error,
      });
    }
  });
