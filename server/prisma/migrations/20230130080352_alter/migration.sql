-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "repostParentId" TEXT;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_repostParentId_fkey" FOREIGN KEY ("repostParentId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
