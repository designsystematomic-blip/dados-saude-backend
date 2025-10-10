-- CreateEnum
CREATE TYPE "public"."Specialty" AS ENUM ('CARDIOLOGY', 'ENDOCRINOLOGY', 'GYNECOLOGY_OBSTETRICS', 'UROLOGY', 'DERMATOLOGY', 'GASTROENTEROLOGY', 'ORTHOPEDICS_RHEUMATOLOGY', 'NEUROLOGY', 'OPHTHALMOLOGY', 'OTORHINOLARYNGOLOGY', 'PULMONOLOGY', 'NEPHROLOGY', 'HEMATOLOGY', 'ONCOLOGY', 'PEDIATRICS', 'PSYCHIATRY_PSYCHOLOGY', 'GENERAL_CLINIC', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ExamType" AS ENUM ('BLOOD_TEST', 'URINE_TEST', 'STOOL_TEST', 'XRAY', 'ULTRASOUND', 'CT_SCAN', 'MRI', 'ECG', 'ECHOCARDIOGRAM', 'MAMMOGRAM', 'COLONOSCOPY', 'ENDOSCOPY', 'PAP_SMEAR', 'OTHER');

-- CreateTable
CREATE TABLE "public"."Exam" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."ExamType",
    "date" TIMESTAMP(3) NOT NULL,
    "specialty" "public"."Specialty",
    "observations" TEXT NOT NULL,
    "userId" VARCHAR(36),

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."File" (
    "id" VARCHAR(36) NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT,
    "url" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "examId" VARCHAR(36),

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Exam" ADD CONSTRAINT "Exam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."File" ADD CONSTRAINT "File_examId_fkey" FOREIGN KEY ("examId") REFERENCES "public"."Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;
