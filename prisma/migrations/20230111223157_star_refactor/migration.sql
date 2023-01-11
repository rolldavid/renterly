/*
  Warnings:

  - You are about to drop the column `bookmarkUpdate` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `reviewUpdate` on the `UserPreferences` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reviewId]` on the table `Star` will be added. If there are existing duplicate values, this will fail.
  - Made the column `reviewId` on table `Star` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Star" ALTER COLUMN "reviewId" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserPreferences" DROP COLUMN "bookmarkUpdate",
DROP COLUMN "reviewUpdate",
ADD COLUMN     "bookmarkUpdates" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "reviewUpdates" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "authorId" INTEGER NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "excerpt" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Star_reviewId_key" ON "Star"("reviewId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
