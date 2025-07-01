/*
  Warnings:

  - You are about to drop the column `classId` on the `classtimetable` table. All the data in the column will be lost.
  - You are about to alter the column `schoolId` on the `classtimetable` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `staff_attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student_attendance` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobile]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobile]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_id` to the `ClassTimetable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_id` to the `ClassTimetable` table without a default value. This is not possible if the table is not empty.
  - Made the column `photo` on table `school` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `classtimetable` DROP COLUMN `classId`,
    ADD COLUMN `class_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `classesId` INTEGER NULL,
    ADD COLUMN `school_id` VARCHAR(191) NOT NULL,
    MODIFY `schoolId` INTEGER NULL;

-- AlterTable
ALTER TABLE `school` MODIFY `photo` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `staff` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `gender` ENUM('M', 'F', 'O') NULL;

-- AlterTable
ALTER TABLE `student` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `gender` ENUM('M', 'F', 'O') NULL;

-- DropTable
DROP TABLE `staff_attendance`;

-- DropTable
DROP TABLE `student_attendance`;

-- CreateTable
CREATE TABLE `Attendance_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `school_id` INTEGER NOT NULL,

    UNIQUE INDEX `Attendance_user_username_key`(`username`),
    INDEX `Attendance_user_school_id_idx`(`school_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Holidays` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `school_id` INTEGER NULL,
    `fn` CHAR(1) NULL,
    `an` CHAR(1) NOT NULL,

    INDEX `Holidays_school_id_idx`(`school_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaffAttendance` (
    `username` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `fn_status` VARCHAR(191) NOT NULL DEFAULT 'null',
    `an_status` VARCHAR(191) NOT NULL DEFAULT 'null',
    `school_id` INTEGER NULL,

    INDEX `StaffAttendance_school_id_idx`(`school_id`),
    UNIQUE INDEX `StaffAttendance_username_date_key`(`username`, `date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentAttendance` (
    `username` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `fn_status` VARCHAR(191) NOT NULL DEFAULT 'null',
    `an_status` VARCHAR(191) NOT NULL DEFAULT 'null',
    `school_id` INTEGER NOT NULL,
    `class_id` INTEGER NOT NULL,

    INDEX `StudentAttendance_school_id_idx`(`school_id`),
    INDEX `StudentAttendance_class_id_idx`(`class_id`),
    UNIQUE INDEX `StudentAttendance_username_date_key`(`username`, `date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_HolidayClasses` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_HolidayClasses_AB_unique`(`A`, `B`),
    INDEX `_HolidayClasses_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `School_name_key` ON `School`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Staff_email_key` ON `Staff`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Staff_mobile_key` ON `Staff`(`mobile`);

-- CreateIndex
CREATE INDEX `Staff_username_idx` ON `Staff`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_email_key` ON `Student`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_mobile_key` ON `Student`(`mobile`);

-- CreateIndex
CREATE INDEX `Student_username_idx` ON `Student`(`username`);

-- AddForeignKey
ALTER TABLE `Attendance_user` ADD CONSTRAINT `Attendance_user_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Holidays` ADD CONSTRAINT `Holidays_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_username_fkey` FOREIGN KEY (`username`) REFERENCES `Attendance_user`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffAttendance` ADD CONSTRAINT `StaffAttendance_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffAttendance` ADD CONSTRAINT `StaffAttendance_username_fkey` FOREIGN KEY (`username`) REFERENCES `Staff`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_username_fkey` FOREIGN KEY (`username`) REFERENCES `Attendance_user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAttendance` ADD CONSTRAINT `StudentAttendance_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAttendance` ADD CONSTRAINT `StudentAttendance_username_fkey` FOREIGN KEY (`username`) REFERENCES `Student`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAttendance` ADD CONSTRAINT `StudentAttendance_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassTimetable` ADD CONSTRAINT `ClassTimetable_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassTimetable` ADD CONSTRAINT `ClassTimetable_classesId_fkey` FOREIGN KEY (`classesId`) REFERENCES `Classes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HolidayClasses` ADD CONSTRAINT `_HolidayClasses_A_fkey` FOREIGN KEY (`A`) REFERENCES `Classes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HolidayClasses` ADD CONSTRAINT `_HolidayClasses_B_fkey` FOREIGN KEY (`B`) REFERENCES `Holidays`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `classes` RENAME INDEX `Classes_school_id_fkey` TO `Classes_school_id_idx`;

-- RenameIndex
ALTER TABLE `staff` RENAME INDEX `Staff_school_id_fkey` TO `Staff_school_id_idx`;

-- RenameIndex
ALTER TABLE `student` RENAME INDEX `Student_class_id_fkey` TO `Student_class_id_idx`;

-- RenameIndex
ALTER TABLE `student` RENAME INDEX `Student_school_id_fkey` TO `Student_school_id_idx`;
