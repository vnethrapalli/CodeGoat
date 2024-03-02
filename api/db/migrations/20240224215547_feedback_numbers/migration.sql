/*
  Warnings:

  - You are about to drop the `UserExample` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserExample";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Feedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "submissionPage" INTEGER NOT NULL,
    "outputPage" INTEGER NOT NULL,
    "translationAccuracy" INTEGER NOT NULL,
    "gptAvailability" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "comments" TEXT NOT NULL
);
