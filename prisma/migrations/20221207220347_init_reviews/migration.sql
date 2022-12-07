-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "landlordRating" TEXT,
    "safetyRating" TEXT,
    "moveoutRating" TEXT,
    "votes" INTEGER,
    "responseId" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_responseId_key" ON "Review"("responseId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;
