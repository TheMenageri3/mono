import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const seed = protectedProcedure.mutation(async ({ ctx }) => {
  const userId = ctx.session.user.id;
  const db = ctx.db;

  // Check if database has already been seeded
  const existingSeed = await db.seedStatus.findFirst();
  if (existingSeed) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Database has already been seeded",
    });
  }

  // Start a transaction to ensure atomicity
  return await db.$transaction(async (tx) => {
    try {
      // Create seed status record first to prevent concurrent seeding
      await tx.seedStatus.create({
        data: {
          seededBy: userId,
          version: "1.0.0", // Update this version when seed data changes
        },
      });

      // TODO: Add your seed data here
      // Example:
      // await tx.user.createMany({
      //   data: [
      //     {
      //       email: "admin@example.com",
      //       name: "Admin User",
      //       role: "ADMIN",
      //       status: "ACTIVE",
      //     },
      //   ],
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
