/*
  Warnings:

  - Added the required column `class_ids` to the `Holidays` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `holidays` ADD COLUMN `class_ids` JSON NOT NULL;
