/*
  Warnings:

  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `responseId` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `reviewId` column on the `Star` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_responseId_fkey";

-- DropForeignKey
ALTER TABLE "Star" DROP CONSTRAINT "Star_reviewId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "responseId",
ADD COLUMN     "responseId" INTEGER,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Star" DROP COLUMN "reviewId",
ADD COLUMN     "reviewId" INTEGER;

-- CreateTable
CREATE TABLE "Notification_Detail" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Notification_Detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification_Active" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notificationId" INTEGER NOT NULL,

    CONSTRAINT "Notification_Active_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification_Complete" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notificationId" INTEGER NOT NULL,

    CONSTRAINT "Notification_Complete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Preferences" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "system" BOOLEAN NOT NULL DEFAULT true,
    "productUpdates" BOOLEAN NOT NULL DEFAULT true,
    "bookmarkUpdate" BOOLEAN NOT NULL DEFAULT true,
    "reviewUpdate" BOOLEAN NOT NULL DEFAULT true,
    "showReviews" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "User_Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookmarksByUser" (
    "propertyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookmarksByUser_pkey" PRIMARY KEY ("propertyId","userId")
);

-- CreateTable
CREATE TABLE "_Notification_ActiveToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Notification_CompleteToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Notification_ActiveToUser_AB_unique" ON "_Notification_ActiveToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_Notification_ActiveToUser_B_index" ON "_Notification_ActiveToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Notification_CompleteToUser_AB_unique" ON "_Notification_CompleteToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_Notification_CompleteToUser_B_index" ON "_Notification_CompleteToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Review_responseId_key" ON "Review"("responseId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Star" ADD CONSTRAINT "Star_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification_Active" ADD CONSTRAINT "Notification_Active_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification_Detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification_Complete" ADD CONSTRAINT "Notification_Complete_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification_Detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Preferences" ADD CONSTRAINT "User_Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarksByUser" ADD CONSTRAINT "BookmarksByUser_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarksByUser" ADD CONSTRAINT "BookmarksByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Notification_ActiveToUser" ADD CONSTRAINT "_Notification_ActiveToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Notification_Active"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Notification_ActiveToUser" ADD CONSTRAINT "_Notification_ActiveToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Notification_CompleteToUser" ADD CONSTRAINT "_Notification_CompleteToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Notification_Complete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Notification_CompleteToUser" ADD CONSTRAINT "_Notification_CompleteToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
