-- CreateTable
CREATE TABLE "Races" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "factor" INTEGER NOT NULL,
    "wildCardPos" INTEGER NOT NULL,

    CONSTRAINT "Races_pkey" PRIMARY KEY ("id")
);
