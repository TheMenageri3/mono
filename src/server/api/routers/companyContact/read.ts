import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readCompanyContactsByCompanyId = publicProcedure
  .input(z.object({ companyId: z.string() }))
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.companyContact.findMany({
        where: {
          companyId: input.companyId,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read company contacts",
        cause: error,
      });
    }
  });

export const readDeletedCompanyContactsByCompanyId = publicProcedure
  .input(z.object({ companyId: z.string() }))
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.companyContact.findMany({
        where: {
          companyId: input.companyId,
          deletedAt: { not: null },
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted company contacts",
        cause: error,
      });
    }
  });

export const readCompanyContactsByUserId = publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.companyContact.findMany({
        where: {
          userId: input.userId,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read company contacts by user",
        cause: error,
      });
    }
  });

export const readCompanyContactsByProfileId = publicProcedure
  .input(z.object({ profileId: z.string() }))
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.companyContact.findMany({
        where: {
          profileId: input.profileId,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read company contacts by profile",
        cause: error,
      });
    }
  });

export const readCompanyContactById = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.companyContact.findUnique({
        where: {
          id: input.id,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read company contact",
        cause: error,
      });
    }
  });

export const readCompanyContacts = publicProcedure.query(async ({ ctx }) => {
  try {
    return await ctx.db.companyContact.findMany({
      where: {
        deletedAt: null,
      },
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read company contacts",
      cause: error,
    });
  }
});

export const readDeletedCompanyContacts = publicProcedure.query(
  async ({ ctx }) => {
    try {
      return await ctx.db.companyContact.findMany({
        where: {
          deletedAt: { not: null },
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted company contacts",
        cause: error,
      });
    }
  }
);
