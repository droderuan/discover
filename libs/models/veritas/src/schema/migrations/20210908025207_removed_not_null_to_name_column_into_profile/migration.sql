-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_ibfk_1`;

-- AlterTable
ALTER TABLE `Profile` MODIFY `name` VARCHAR(64);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `fk_Profile_User1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `User.id_unique` TO `id_UNIQUE`;
