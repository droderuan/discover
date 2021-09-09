/*
  Warnings:

  - The primary key for the `Meet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Meet.id_unique` ON `Meet`;

-- AlterTable
ALTER TABLE `Meet` DROP PRIMARY KEY,
    MODIFY `hasEnded` BOOLEAN DEFAULT false,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Profile` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Tag_name_key` ON `Tag`(`name`);
