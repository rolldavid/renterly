/*
  Warnings:

  - You are about to drop the column `propertyId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "propertyId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "NotificationActive" ADD COLUMN     "propertyId" TEXT;

-- AlterTable
ALTER TABLE "NotificationComplete" ADD COLUMN     "propertyId" TEXT;

-- AddForeignKey
ALTER TABLE "NotificationActive" ADD CONSTRAINT "NotificationActive_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationComplete" ADD CONSTRAINT "NotificationComplete_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
