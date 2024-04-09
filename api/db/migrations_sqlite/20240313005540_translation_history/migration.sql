-- CreateTable
CREATE TABLE "Translation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" TEXT NOT NULL,
    "inputLanguage" TEXT NOT NULL,
    "outputLanguage" TEXT NOT NULL,
    "inputCode" TEXT NOT NULL,
    "outputCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER NOT NULL
);
