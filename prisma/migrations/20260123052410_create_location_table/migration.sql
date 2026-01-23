-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "entryFee" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "open_time_from" TIMESTAMP(3) NOT NULL,
    "open_time_to" TIMESTAMP(3) NOT NULL,
    "open_day" TEXT[],
    "description" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_slug_key" ON "Location"("slug");
