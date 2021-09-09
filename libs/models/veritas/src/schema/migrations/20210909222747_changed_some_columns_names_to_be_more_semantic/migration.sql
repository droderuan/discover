/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Follow` DROP FOREIGN KEY `Follow_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Follow` DROP FOREIGN KEY `Follow_ibfk_2`;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_userId_unique` ON `Profile`(`userId`);

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_followProfileId_fkey` FOREIGN KEY (`followProfileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
