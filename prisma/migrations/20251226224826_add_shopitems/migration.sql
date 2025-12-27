/*
  Warnings:

  - You are about to drop the column `image_first_url` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `image_second_url` on the `Article` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "image_first_url",
DROP COLUMN "image_second_url",
ADD COLUMN     "additional_images" TEXT[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- CreateTable
CREATE TABLE "ShopItems" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "featured_image_url" TEXT NOT NULL,
    "additional_images" TEXT[],

    CONSTRAINT "ShopItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShopItems_name_key" ON "ShopItems"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ShopItems_slug_key" ON "ShopItems"("slug");
