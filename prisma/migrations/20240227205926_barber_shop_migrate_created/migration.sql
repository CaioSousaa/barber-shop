-- CreateEnum
CREATE TYPE "DyeHair" AS ENUM ('highlights', 'streaks', 'snowed');

-- CreateEnum
CREATE TYPE "Cutting" AS ENUM ('social', 'fade', 'razor');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('M', 'F', 'N');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "gender" "Sex" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment" (
    "id" SERIAL NOT NULL,
    "startAt" TEXT NOT NULL,
    "endAt" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cut" "Cutting",
    "dye_hair" "DyeHair",
    "eyebrows" TEXT,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
