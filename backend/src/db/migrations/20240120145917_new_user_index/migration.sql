-- DropIndex
DROP INDEX "User_username_email_idx";

-- CreateIndex
CREATE INDEX "User_username_email_refreshToken_idx" ON "User"("username", "email", "refreshToken");
