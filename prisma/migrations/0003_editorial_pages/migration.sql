CREATE TABLE IF NOT EXISTS `AboutSection` (
  `id` TEXT NOT NULL PRIMARY KEY,
  `singletonKey` TEXT NOT NULL DEFAULT 'about',
  `kicker` TEXT NOT NULL,
  `title` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `highlightsJson` TEXT NOT NULL DEFAULT '[]',
  `metricsJson` TEXT NOT NULL DEFAULT '[]',
  `status` TEXT NOT NULL DEFAULT 'DRAFT',
  `publishedAt` DATETIME NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS `AboutSection_singletonKey_key` ON `AboutSection`(`singletonKey`);

CREATE TABLE IF NOT EXISTS `SkillCategory` (
  `id` TEXT NOT NULL PRIMARY KEY,
  `slug` TEXT NOT NULL,
  `title` TEXT NOT NULL,
  `sortOrder` INTEGER NOT NULL DEFAULT 0,
  `status` TEXT NOT NULL DEFAULT 'DRAFT',
  `publishedAt` DATETIME NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS `SkillCategory_slug_key` ON `SkillCategory`(`slug`);

CREATE TABLE IF NOT EXISTS `SkillItem` (
  `id` TEXT NOT NULL PRIMARY KEY,
  `categoryId` TEXT NOT NULL,
  `title` TEXT NOT NULL,
  `level` TEXT NULL,
  `sortOrder` INTEGER NOT NULL DEFAULT 0,
  `status` TEXT NOT NULL DEFAULT 'DRAFT',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `SkillItem_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `SkillCategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS `SkillItem_categoryId_idx` ON `SkillItem`(`categoryId`);

CREATE TABLE IF NOT EXISTS `ContactPage` (
  `id` TEXT NOT NULL PRIMARY KEY,
  `singletonKey` TEXT NOT NULL DEFAULT 'contact',
  `kicker` TEXT NOT NULL,
  `title` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `infoJson` TEXT NOT NULL DEFAULT '[]',
  `socialJson` TEXT NOT NULL DEFAULT '[]',
  `status` TEXT NOT NULL DEFAULT 'DRAFT',
  `publishedAt` DATETIME NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS `ContactPage_singletonKey_key` ON `ContactPage`(`singletonKey`);
