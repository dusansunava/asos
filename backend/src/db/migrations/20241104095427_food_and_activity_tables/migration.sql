/*
  Warnings:

  - You are about to drop the `Portfolio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_owner_id_fkey";

-- DropTable
DROP TABLE "Portfolio";

-- CreateTable
CREATE TABLE "FoodLog" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "foodItem" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "caloriesBurned" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoodLog" ADD CONSTRAINT "FoodLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
