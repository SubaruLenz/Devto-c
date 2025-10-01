-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "email_display" BOOLEAN NOT NULL DEFAULT false;
