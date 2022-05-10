-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mapbox_id` INTEGER NULL DEFAULT 0,
    `url` VARCHAR(191) NULL,
    `blur_base64` VARCHAR(191) NULL,
    `fileName` VARCHAR(191) NULL,
    `caption` VARCHAR(255) NULL,
    `origin` VARCHAR(255) NOT NULL,
    `is_profile_image` BOOLEAN NOT NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT true,
    `user_id` VARCHAR(255) NOT NULL,
    `locationId` INTEGER NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mapbox_id` VARCHAR(255) NOT NULL,
    `place_name` VARCHAR(255) NOT NULL,
    `place_type` VARCHAR(255) NOT NULL,
    `coordinates` VARCHAR(255) NOT NULL,
    `text` VARCHAR(255) NOT NULL,
    `region_id` VARCHAR(255) NULL,
    `region_text` VARCHAR(255) NULL,
    `region_wikidata` VARCHAR(255) NULL,
    `region_short_code` VARCHAR(255) NULL,
    `country_id` VARCHAR(255) NULL,
    `country_text` VARCHAR(255) NULL,
    `country_wikidata` VARCHAR(255) NULL,
    `country_short_code` VARCHAR(255) NULL,
    `postcode_id` VARCHAR(255) NULL,
    `postcode_text` VARCHAR(255) NULL,
    `place_id` VARCHAR(255) NULL,
    `place_wikidata` VARCHAR(255) NULL,
    `place_text` VARCHAR(255) NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `text` VARCHAR(4000) NOT NULL,
    `rating` INTEGER NOT NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT true,
    `user_id` VARCHAR(255) NOT NULL,
    `author_id` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewResponse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(4000) NOT NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT true,
    `author_id` VARCHAR(255) NOT NULL,
    `review_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` INTEGER NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `sport_ref_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SportRef` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TagRef` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(4000) NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255) NOT NULL,
    `tag_ref_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `is_backlisted` BOOLEAN NOT NULL DEFAULT false,
    `is_guide` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NOT NULL,

    UNIQUE INDEX `user_username_unique`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewMeta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `average_rating` DOUBLE NOT NULL DEFAULT 0,
    `number_rating` INTEGER NOT NULL DEFAULT 0,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NOT NULL,

    UNIQUE INDEX `ReviewMeta_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `text` VARCHAR(4000) NOT NULL,
    `from_date` DATE NOT NULL,
    `to_date` DATE NULL,
    `is_current` BOOLEAN NOT NULL DEFAULT true,
    `is_published` BOOLEAN NOT NULL DEFAULT true,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ReviewResponse` ADD CONSTRAINT `ReviewResponse_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `Review`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ReviewResponse` ADD CONSTRAINT `ReviewResponse_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Sport` ADD CONSTRAINT `Sport_sport_ref_id_fkey` FOREIGN KEY (`sport_ref_id`) REFERENCES `SportRef`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Sport` ADD CONSTRAINT `Sport_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_tag_ref_id_fkey` FOREIGN KEY (`tag_ref_id`) REFERENCES `TagRef`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ReviewMeta` ADD CONSTRAINT `ReviewMeta_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Vita` ADD CONSTRAINT `Vita_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
