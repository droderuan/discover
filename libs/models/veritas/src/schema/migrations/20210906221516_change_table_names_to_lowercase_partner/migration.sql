/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MeetPlatform` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MeetTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Platform` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CategoryProfile` DROP FOREIGN KEY `CategoryProfile_ibfk_1`;

-- DropForeignKey
ALTER TABLE `CategoryProfile` DROP FOREIGN KEY `CategoryProfile_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Follow` DROP FOREIGN KEY `Follow_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Follow` DROP FOREIGN KEY `Follow_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Meet` DROP FOREIGN KEY `Meet_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Meet` DROP FOREIGN KEY `Meet_ibfk_2`;

-- DropForeignKey
ALTER TABLE `MeetPlatform` DROP FOREIGN KEY `MeetPlatform_ibfk_1`;

-- DropForeignKey
ALTER TABLE `MeetPlatform` DROP FOREIGN KEY `MeetPlatform_ibfk_2`;

-- DropForeignKey
ALTER TABLE `MeetTag` DROP FOREIGN KEY `MeetTag_ibfk_1`;

-- DropForeignKey
ALTER TABLE `MeetTag` DROP FOREIGN KEY `MeetTag_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_ibfk_2`;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `CategoryProfile`;

-- DropTable
DROP TABLE `Follow`;

-- DropTable
DROP TABLE `Meet`;

-- DropTable
DROP TABLE `MeetPlatform`;

-- DropTable
DROP TABLE `MeetTag`;

-- DropTable
DROP TABLE `Platform`;

-- DropTable
DROP TABLE `Profile`;

-- DropTable
DROP TABLE `Subscription`;

-- DropTable
DROP TABLE `Tag`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoryProfile` (
    `categoryId` INTEGER NOT NULL,
    `profileId` INTEGER NOT NULL,

    INDEX `fk_CategoryProfile_Category1_idx`(`categoryId`),
    INDEX `fk_CategoryProfile_Profile1_idx`(`profileId`),
    PRIMARY KEY (`categoryId`, `profileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `follow` (
    `profileId` INTEGER NOT NULL,
    `followProfileId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_ProfileProfile_Profile1_idx`(`profileId`),
    INDEX `fk_ProfileProfile_Profile2_idx`(`followProfileId`),
    PRIMARY KEY (`profileId`, `followProfileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meet` (
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

    UNIQUE INDEX `meet.id_unique`(`id`),
    INDEX `fk_Meet_Category1_idx`(`categoryId`),
    INDEX `fk_Meet_Profile1_idx`(`profileId`),
    PRIMARY KEY (`id`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meetPlatform` (
    `meetId` INTEGER NOT NULL,
    `platformId` INTEGER NOT NULL,

    INDEX `fk_MeetPlatform_Meet1_idx`(`meetId`),
    INDEX `fk_MeetPlatform_Platform1_idx`(`platformId`),
    PRIMARY KEY (`meetId`, `platformId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meetTag` (
    `meetId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    INDEX `fk_MeetTag_Meet1_idx`(`meetId`),
    INDEX `fk_MeetTag_Tag1_idx`(`tagId`),
    PRIMARY KEY (`meetId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `platform` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `platformLink` VARCHAR(128) NOT NULL,
    `icon` VARCHAR(128),

    UNIQUE INDEX `platform.id_unique`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `secondName` VARCHAR(64),
    `description` VARCHAR(512),
    `profileImage` VARCHAR(128),
    `createdAt` DATETIME(0) DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0),
    `userId` VARCHAR(36) NOT NULL,

    INDEX `fk_Profile_User1_idx`(`userId`),
    PRIMARY KEY (`id`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscription` (
    `profileId` INTEGER NOT NULL,
    `meetId` INTEGER NOT NULL,

    INDEX `fk_ProfileMeet_Meet1_idx`(`meetId`),
    INDEX `fk_ProfileMeet_Profile1_idx`(`profileId`),
    PRIMARY KEY (`profileId`, `meetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `icon` VARCHAR(512),
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0),

    UNIQUE INDEX `tag.id_unique`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(36) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0),

    UNIQUE INDEX `user.id_unique`(`id`),
    UNIQUE INDEX `user.email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
