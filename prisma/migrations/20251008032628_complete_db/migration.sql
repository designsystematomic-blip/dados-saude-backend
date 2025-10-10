/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."BloodType" AS ENUM ('A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "bloodType" "public"."BloodType",
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "sex" TEXT,
ADD COLUMN     "socialName" TEXT;

-- CreateTable
CREATE TABLE "public"."Allergies" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "userId" VARCHAR(36),

    CONSTRAINT "Allergies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChronicDiseases" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "userId" VARCHAR(36),

    CONSTRAINT "ChronicDiseases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Medication" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "continuousUse" BOOLEAN,
    "userId" VARCHAR(36),

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HealthPlan" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "userId" VARCHAR(36),

    CONSTRAINT "HealthPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EmergencyContacts" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "degreeOfKinship" TEXT,
    "userId" VARCHAR(36),

    CONSTRAINT "EmergencyContacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "public"."User"("cpf");

-- AddForeignKey
ALTER TABLE "public"."Allergies" ADD CONSTRAINT "Allergies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChronicDiseases" ADD CONSTRAINT "ChronicDiseases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Medication" ADD CONSTRAINT "Medication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HealthPlan" ADD CONSTRAINT "HealthPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EmergencyContacts" ADD CONSTRAINT "EmergencyContacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
