/*
  Warnings:

  - Added the required column `publicKey` to the `Backer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicKey` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seed` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Backer" ADD COLUMN     "publicKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "publicKey" TEXT NOT NULL,
ADD COLUMN     "seed" TEXT NOT NULL;
