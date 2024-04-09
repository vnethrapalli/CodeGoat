-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Translation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" TEXT NOT NULL,
    "inputLanguage" TEXT NOT NULL,
    "outputLanguage" TEXT NOT NULL,
    "inputCode" TEXT NOT NULL,
    "outputCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT '200 OK'
);
INSERT INTO "new_Translation" ("createdAt", "id", "inputCode", "inputLanguage", "outputCode", "outputLanguage", "rating", "uid") SELECT "createdAt", "id", "inputCode", "inputLanguage", "outputCode", "outputLanguage", "rating", "uid" FROM "Translation";
DROP TABLE "Translation";
ALTER TABLE "new_Translation" RENAME TO "Translation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
