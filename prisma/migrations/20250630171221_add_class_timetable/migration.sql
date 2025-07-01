-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gender` ENUM('M', 'F', 'O') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `photo` LONGBLOB NULL,
    `class_id` INTEGER NOT NULL,
    `school_id` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Student_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `gender` ENUM('M', 'F', 'O') NOT NULL,
    `school_id` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Staff_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student_attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `fn_status` VARCHAR(191) NULL,
    `an_status` VARCHAR(191) NULL,
    `school_id` INTEGER NOT NULL,
    `class_id` INTEGER NOT NULL,

    UNIQUE INDEX `Student_attendance_username_date_key`(`username`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff_attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `fn_status` VARCHAR(191) NULL,
    `an_status` VARCHAR(191) NULL,
    `school_id` INTEGER NOT NULL,

    UNIQUE INDEX `Staff_attendance_username_date_key`(`username`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClassTimetable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `schoolId` VARCHAR(191) NOT NULL,
    `classId` VARCHAR(191) NOT NULL,
    `dayOfWeek` VARCHAR(191) NOT NULL,
    `periodNumber` INTEGER NOT NULL,
    `subject` VARCHAR(191) NOT NULL,

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
CREATE TABLE `School` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `photo` LONGBLOB NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `class` VARCHAR(191) NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `school_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classes` ADD CONSTRAINT `Classes_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
