/*
  Warnings:

  - Made the column `userId` on table `Exam` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Exam" DROP CONSTRAINT "Exam_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Exam" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Exam" ADD CONSTRAINT "Exam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
