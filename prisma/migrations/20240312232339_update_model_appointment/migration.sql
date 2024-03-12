/*
  Warnings:

  - The `endAt` column on the `appointment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `startAt` on the `appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "startAt",
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endAt",
ADD COLUMN     "endAt" TIMESTAMP(3);
