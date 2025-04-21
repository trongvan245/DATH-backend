-- CreateTable
CREATE TABLE `activity_log` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `timestamp` TIMESTAMP(0) NULL,
    `event_type` VARCHAR(50) NULL,
    `user_id` INTEGER NOT NULL,
    `device_id` INTEGER NOT NULL,

    INDEX `activity_log_device_id_idx`(`device_id`),
    INDEX `activity_log_user_id_idx`(`user_id`),
    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blacklist` (
    `token` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `device` (
    `device_id` INTEGER NOT NULL AUTO_INCREMENT,
    `device_name` VARCHAR(50) NULL,
    `room_id` INTEGER NOT NULL,
    `status` VARCHAR(50) NULL,
    `adafruit_key` VARCHAR(50) NULL,

    INDEX `device_room_id_idx`(`room_id`),
    PRIMARY KEY (`device_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room` (
    `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_name` VARCHAR(50) NULL,
    `user_id` INTEGER NOT NULL,
    `adafruit_key` VARCHAR(50) NULL,

    INDEX `room_user_id_idx`(`user_id`),
    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NULL,
    `password` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `activity_log` ADD CONSTRAINT `activity_log_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity_log` ADD CONSTRAINT `activity_log_device_id_fkey` FOREIGN KEY (`device_id`) REFERENCES `device`(`device_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `device` ADD CONSTRAINT `device_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `room_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
