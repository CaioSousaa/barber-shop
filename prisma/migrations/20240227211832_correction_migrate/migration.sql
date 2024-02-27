/*
  Warnings:

  - You are about to drop the column `password` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "password" TEXT NOT NULL;
