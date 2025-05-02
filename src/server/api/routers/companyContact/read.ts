import { publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  readCompanyContactsByCompanyIdSchema,
  readDeletedCompanyContactsByCompanyIdSchema,
  readCompanyContactsByUserIdSchema,
  readCompanyContactsByProfileIdSchema,
  readCompanyContactByIdSchema,
  readCompanyContactsSchema,
  readDeletedCompanyContactsSchema,
} from "@/schemas";

export const readCompanyContactsByCompanyId = publicProcedure
  .input(readCompanyContactsByCompanyIdSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.companyContact.findMany({
        where: {
          companyId: input.companyId,
          deletedAt: null,
        },
        take: input.limit,
        skip: input.offset,
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
  .input(readDeletedCompanyContactsByCompanyIdSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.companyContact.findMany({
        where: {
          companyId: input.companyId,
          deletedAt: { not: null },
        },
        take: input.limit,
        skip: input.offset,
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
  .input(readCompanyContactsByUserIdSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.companyContact.findMany({
        where: {
          userId: input.userId,
          deletedAt: null,
        },
        take: input.limit,
        skip: input.offset,
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
  .input(readCompanyContactsByProfileIdSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.companyContact.findMany({
        where: {
          profileId: input.profileId,
          deletedAt: null,
        },
        take: input.limit,
        skip: input.offset,
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
  .input(readCompanyContactByIdSchema)
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

export const readCompanyContacts = publicProcedure
  .input(readCompanyContactsSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.companyContact.findMany({
        where: {
          deletedAt: null,
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read company contacts",
        cause: error,
      });
    }
  });

export const readDeletedCompanyContacts = publicProcedure
  .input(readDeletedCompanyContactsSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.companyContact.findMany({
        where: {
          deletedAt: { not: null },
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted company contacts",
        cause: error,
      });
    }
  });
