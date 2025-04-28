import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { TEST_USER_EMAIL, TEST_USER_DATA, TEST_USERS } from "./data";

export const seed = protectedProcedure.mutation(async ({ ctx }) => {
  const userId = ctx.session.user.id;
  const db = ctx.db;

  // Check if database has already been seeded by looking for test user
  const existingTestUser = await db.user.findUnique({
    where: { email: TEST_USER_EMAIL },
  });

  if (existingTestUser) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Database has already been seeded",
    });
  }

  // Start a transaction to ensure atomicity
  return await db.$transaction(async (tx) => {
    try {
      // Create test users
      const testUser = await tx.user.create({
        data: TEST_USER_DATA,
      });

      // Create additional test users
      await tx.user.createMany({
        data: TEST_USERS,
      });

      // TODO: Add your seed data here
      // Example:
      // await tx.company.createMany({
      //   data: TEST_COMPANIES.map(company => ({
      //     ...company,
      //     createdById: testUser.id,
      //     updatedById: testUser.id,
      //   })),
      // });

      return { success: true };
    } catch (error) {
      // If anything fails, the transaction will be rolled back
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to seed database",
        cause: error,
      });
    }
  });
});
