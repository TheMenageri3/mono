/*
  Warnings:

  - Added the required column `seed` to the `DAO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DAO" ADD COLUMN     "seed" DECIMAL(65,30) NOT NULL;
