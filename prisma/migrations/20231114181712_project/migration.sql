-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "due" TIMESTAMP(3),
ALTER COLUMN "description" DROP NOT NULL;
