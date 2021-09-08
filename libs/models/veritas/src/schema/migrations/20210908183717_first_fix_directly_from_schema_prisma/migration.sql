/*
  Warnings:

  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Meet` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Platform` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Tag` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Category` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Follow` ADD COLUMN `deletedAt` DATETIME(0),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Meet` ADD COLUMN `deletedAt` DATETIME(0),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Platform` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(0),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `deletedAt` DATETIME(0),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Tag` MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `updatedAt` DATETIME(3) NOT NULL;
