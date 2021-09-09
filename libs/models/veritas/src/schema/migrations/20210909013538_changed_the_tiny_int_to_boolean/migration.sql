-- AlterTable
ALTER TABLE `Meet` MODIFY `recurrent` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `enabled` BOOLEAN DEFAULT true,
    MODIFY `hasEnded` BOOLEAN NOT NULL DEFAULT false;
