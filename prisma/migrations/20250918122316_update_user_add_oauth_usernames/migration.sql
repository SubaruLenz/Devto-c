/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "username",
ADD COLUMN     "github_username" TEXT,
ADD COLUMN     "google_username" TEXT;
