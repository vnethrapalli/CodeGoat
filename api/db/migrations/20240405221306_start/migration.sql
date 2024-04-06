-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "submissionPage" INTEGER NOT NULL,
    "outputPage" INTEGER NOT NULL,
    "translationAccuracy" INTEGER NOT NULL,
    "gptAvailability" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Translation" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "inputLanguage" TEXT NOT NULL,
    "outputLanguage" TEXT NOT NULL,
    "inputCode" TEXT NOT NULL,
    "outputCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT '200 OK',

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);
