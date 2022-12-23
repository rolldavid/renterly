/*
  Warnings:

  - You are about to drop the `Notification_Active` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification_Complete` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification_Detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Preferences` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Notification_ActiveToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Notification_CompleteToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification_Active" DROP CONSTRAINT "Notification_Active_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "Notification_Complete" DROP CONSTRAINT "Notification_Complete_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "User_Preferences" DROP CONSTRAINT "User_Preferences_userId_fkey";

-- DropForeignKey
ALTER TABLE "_Notification_ActiveToUser" DROP CONSTRAINT "_Notification_ActiveToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_Notification_ActiveToUser" DROP CONSTRAINT "_Notification_ActiveToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_Notification_CompleteToUser" DROP CONSTRAINT "_Notification_CompleteToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_Notification_CompleteToUser" DROP CONSTRAINT "_Notification_CompleteToUser_B_fkey";

-- DropTable
DROP TABLE "Notification_Active";

-- DropTable
DROP TABLE "Notification_Complete";

-- DropTable
DROP TABLE "Notification_Detail";

-- DropTable
DROP TABLE "User_Preferences";

-- DropTable
DROP TABLE "_Notification_ActiveToUser";

-- DropTable
DROP TABLE "_Notification_CompleteToUser";

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "propertyId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationActive" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notificationId" INTEGER NOT NULL,

    CONSTRAINT "NotificationActive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationComplete" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notificationId" INTEGER NOT NULL,

    CONSTRAINT "NotificationComplete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "system" BOOLEAN NOT NULL DEFAULT true,
    "productUpdates" BOOLEAN NOT NULL DEFAULT true,
    "bookmarkUpdate" BOOLEAN NOT NULL DEFAULT true,
    "reviewUpdate" BOOLEAN NOT NULL DEFAULT true,
    "showReviews" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NotificationActiveToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_NotificationCompleteToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NotificationActiveToUser_AB_unique" ON "_NotificationActiveToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_NotificationActiveToUser_B_index" ON "_NotificationActiveToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NotificationCompleteToUser_AB_unique" ON "_NotificationCompleteToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_NotificationCompleteToUser_B_index" ON "_NotificationCompleteToUser"("B");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationActive" ADD CONSTRAINT "NotificationActive_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationComplete" ADD CONSTRAINT "NotificationComplete_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationActiveToUser" ADD CONSTRAINT "_NotificationActiveToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "NotificationActive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationActiveToUser" ADD CONSTRAINT "_NotificationActiveToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationCompleteToUser" ADD CONSTRAINT "_NotificationCompleteToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "NotificationComplete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationCompleteToUser" ADD CONSTRAINT "_NotificationCompleteToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
