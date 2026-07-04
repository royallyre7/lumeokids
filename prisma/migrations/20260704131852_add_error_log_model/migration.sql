-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "level" TEXT NOT NULL DEFAULT 'error',
    "message" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'client',
    "url" TEXT NOT NULL DEFAULT '',
    "userId" TEXT,
    "stack" TEXT,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "ErrorLog_createdAt_idx" ON "ErrorLog"("createdAt");

-- CreateIndex
CREATE INDEX "ErrorLog_level_idx" ON "ErrorLog"("level");
