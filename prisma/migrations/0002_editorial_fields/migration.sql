ALTER TABLE `HeroSection` ADD COLUMN `signalsJson` TEXT NOT NULL DEFAULT '[]';
ALTER TABLE `Service` ADD COLUMN `slug` TEXT NOT NULL DEFAULT '';

CREATE UNIQUE INDEX IF NOT EXISTS `Service_slug_key` ON `Service`(`slug`);
