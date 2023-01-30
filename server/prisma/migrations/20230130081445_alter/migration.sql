-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "repostById" TEXT;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_repostById_fkey" FOREIGN KEY ("repostById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
