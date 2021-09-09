/*
  Warnings:

  - You are about to drop the column `icon` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `typedName` to the `MeetTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MeetTag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `fk_Profile_User1`;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `enabled` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `MeetTag` ADD COLUMN `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `typedName` VARCHAR(128) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Tag` DROP COLUMN `icon`;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `fk_Profile_User1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
