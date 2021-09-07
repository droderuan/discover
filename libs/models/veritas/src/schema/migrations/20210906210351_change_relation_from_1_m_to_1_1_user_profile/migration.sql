/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `profileId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_ibfk_1`;

-- AlterTable
ALTER TABLE `Profile` DROP PRIMARY KEY,
    ADD COLUMN `userId` VARCHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`, `userId`);

-- AlterTable
ALTER TABLE `User` DROP COLUMN `profileId`;

-- CreateIndex
CREATE INDEX `fk_Profile_User1_idx` ON `Profile`(`userId`);

-- AddForeignKey
ALTER TABLE `Profile` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
