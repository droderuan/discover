-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryProfile` (
    `categoryId` INTEGER NOT NULL,
    `profileId` INTEGER NOT NULL,

    INDEX `fk_CategoryProfile_Category1_idx`(`categoryId`),
    INDEX `fk_CategoryProfile_Profile1_idx`(`profileId`),
    PRIMARY KEY (`categoryId`, `profileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Follow` (
    `profileId` INTEGER NOT NULL,
    `followProfileId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_ProfileProfile_Profile1_idx`(`profileId`),
    INDEX `fk_ProfileProfile_Profile2_idx`(`followProfileId`),
    PRIMARY KEY (`profileId`, `followProfileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profileId` INTEGER NOT NULL,
    `title` VARCHAR(128) NOT NULL,
    `description` VARCHAR(512) NOT NULL,
    `startAt` DATETIME(0) NOT NULL,
    `endAt` DATETIME(0),
    `recurrent` TINYINT NOT NULL DEFAULT 0,
    `enabled` TINYINT DEFAULT 0,
    `hasEnded` TINYINT NOT NULL DEFAULT 0,
    `followCount` INTEGER NOT NULL DEFAULT 0,
    `bannerUrl` VARCHAR(4096),
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0),
    `categoryId` INTEGER NOT NULL,

    UNIQUE INDEX `Meet.id_unique`(`id`),
    INDEX `fk_Meet_Category1_idx`(`categoryId`),
    INDEX `fk_Meet_Profile1_idx`(`profileId`),
    PRIMARY KEY (`id`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MeetPlatform` (
    `meetId` INTEGER NOT NULL,
    `platformId` INTEGER NOT NULL,

    INDEX `fk_MeetPlatform_Meet1_idx`(`meetId`),
    INDEX `fk_MeetPlatform_Platform1_idx`(`platformId`),
    PRIMARY KEY (`meetId`, `platformId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MeetTag` (
    `meetId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    INDEX `fk_MeetTag_Meet1_idx`(`meetId`),
    INDEX `fk_MeetTag_Tag1_idx`(`tagId`),
    PRIMARY KEY (`meetId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Platform` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `platformLink` VARCHAR(128) NOT NULL,
    `icon` VARCHAR(128),

    UNIQUE INDEX `Platform.id_unique`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `secondName` VARCHAR(64),
    `description` VARCHAR(512),
    `profileImage` VARCHAR(128),
    `createdAt` DATETIME(0) DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription` (
    `profileId` INTEGER NOT NULL,
    `meetId` INTEGER NOT NULL,

    INDEX `fk_ProfileMeet_Meet1_idx`(`meetId`),
    INDEX `fk_ProfileMeet_Profile1_idx`(`profileId`),
    PRIMARY KEY (`profileId`, `meetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `icon` VARCHAR(512),
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0),

    UNIQUE INDEX `Tag.id_unique`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(36) NOT NULL DEFAULT 'uuid',
    `email` VARCHAR(128) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0),
    `profileId` INTEGER NOT NULL,

    UNIQUE INDEX `User.id_unique`(`id`),
    UNIQUE INDEX `User.email_unique`(`email`),
    INDEX `fk_User_Profile1_idx`(`profileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CategoryProfile` ADD FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryProfile` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD FOREIGN KEY (`followProfileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meet` ADD FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meet` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MeetPlatform` ADD FOREIGN KEY (`meetId`) REFERENCES `Meet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MeetPlatform` ADD FOREIGN KEY (`platformId`) REFERENCES `Platform`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MeetTag` ADD FOREIGN KEY (`meetId`) REFERENCES `Meet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MeetTag` ADD FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD FOREIGN KEY (`meetId`) REFERENCES `Meet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
