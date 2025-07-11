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
CREATE TABLE `School` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `photo` LONGBLOB NOT NULL,

    UNIQUE INDEX `School_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `class` VARCHAR(191) NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `school_id` INTEGER NOT NULL,

    INDEX `Classes_school_id_idx`(`school_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Holidays` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `school_id` INTEGER NULL,
    `class_ids` JSON NOT NULL,
    `fn` CHAR(1) NULL,
    `an` CHAR(1) NOT NULL,

    INDEX `Holidays_school_id_idx`(`school_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `gender` ENUM('M', 'F', 'O') NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `school_id` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Staff_username_key`(`username`),
    UNIQUE INDEX `Staff_email_key`(`email`),
    UNIQUE INDEX `Staff_mobile_key`(`mobile`),
    INDEX `Staff_username_idx`(`username`),
    INDEX `Staff_school_id_idx`(`school_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaffAttendance` (
    `username` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `fn_status` VARCHAR(191) NOT NULL DEFAULT 'Absent',
    `an_status` VARCHAR(191) NOT NULL DEFAULT 'Absent',
    `school_id` INTEGER NULL,

    INDEX `StaffAttendance_school_id_idx`(`school_id`),
    UNIQUE INDEX `StaffAttendance_username_date_key`(`username`, `date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `gender` ENUM('M', 'F', 'O') NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `class_id` INTEGER NOT NULL,
    `school_id` INTEGER NOT NULL,
    `photo` LONGBLOB NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Student_username_key`(`username`),
    UNIQUE INDEX `Student_email_key`(`email`),
    UNIQUE INDEX `Student_mobile_key`(`mobile`),
    INDEX `Student_username_idx`(`username`),
    INDEX `Student_school_id_idx`(`school_id`),
    INDEX `Student_class_id_idx`(`class_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentAttendance` (
    `username` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `fn_status` VARCHAR(191) NOT NULL DEFAULT 'Absent',
    `an_status` VARCHAR(191) NOT NULL DEFAULT 'Absent',
    `school_id` INTEGER NOT NULL,
    `class_id` INTEGER NOT NULL,

    INDEX `StudentAttendance_school_id_idx`(`school_id`),
    INDEX `StudentAttendance_class_id_idx`(`class_id`),
    UNIQUE INDEX `StudentAttendance_username_date_key`(`username`, `date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClassTimetable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `schoolId` INTEGER NULL,
    `classesId` INTEGER NULL,
    `dayOfWeek` ENUM('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat') NOT NULL,
    `periodNumber` INTEGER NOT NULL,
    `subject` VARCHAR(191) NOT NULL,

    INDEX `ClassTimetable_schoolId_idx`(`schoolId`),
    INDEX `ClassTimetable_classesId_idx`(`classesId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `feedback` VARCHAR(191) NOT NULL,
    `school_id` INTEGER NOT NULL,
    `class_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `designation` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `photo` LONGBLOB NULL,
    `username` VARCHAR(191) NOT NULL,
    `school_id` INTEGER NOT NULL,

    UNIQUE INDEX `Admin_mobile_key`(`mobile`),
    UNIQUE INDEX `Admin_username_key`(`username`),
    INDEX `Admin_school_id_idx`(`school_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_HolidayClasses` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_HolidayClasses_AB_unique`(`A`, `B`),
    INDEX `_HolidayClasses_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Attendance_user` ADD CONSTRAINT `Attendance_user_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classes` ADD CONSTRAINT `Classes_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Holidays` ADD CONSTRAINT `Holidays_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_username_fkey` FOREIGN KEY (`username`) REFERENCES `Attendance_user`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffAttendance` ADD CONSTRAINT `StaffAttendance_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffAttendance` ADD CONSTRAINT `StaffAttendance_username_fkey` FOREIGN KEY (`username`) REFERENCES `Staff`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_username_fkey` FOREIGN KEY (`username`) REFERENCES `Attendance_user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HolidayClasses` ADD CONSTRAINT `_HolidayClasses_A_fkey` FOREIGN KEY (`A`) REFERENCES `Classes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HolidayClasses` ADD CONSTRAINT `_HolidayClasses_B_fkey` FOREIGN KEY (`B`) REFERENCES `Holidays`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
