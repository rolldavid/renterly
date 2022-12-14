/*
  Warnings:

  - Added the required column `citystate` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertySlug` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "citystate" TEXT NOT NULL,
ADD COLUMN     "propertySlug" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
