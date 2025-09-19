/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "image",
ADD COLUMN     "available_for" TEXT,
ADD COLUMN     "join_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "profile_image" TEXT,
ADD COLUMN     "username" TEXT,
ADD COLUMN     "website_url" TEXT;
