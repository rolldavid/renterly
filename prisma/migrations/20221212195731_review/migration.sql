/*
  Warnings:

  - The `stars` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `displayName` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "stars",
ADD COLUMN     "stars" INTEGER[];

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "displayName";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT,
ADD COLUMN     "citystate" TEXT,
ADD COLUMN     "state" TEXT;
