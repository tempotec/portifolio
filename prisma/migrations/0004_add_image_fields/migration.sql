-- Create Resume table with image fields
CREATE TABLE IF NOT EXISTS `Resume` (
  `id` TEXT NOT NULL PRIMARY KEY,
  `singletonKey` TEXT NOT NULL UNIQUE DEFAULT 'resume',
  `fullName` TEXT NOT NULL,
  `email` TEXT NOT NULL,
  `phone` TEXT,
  `location` TEXT,
  `profileImageUrl` TEXT,
  `profileImageAlt` TEXT NOT NULL DEFAULT 'Foto de perfil',
  `professionalSummary` TEXT NOT NULL,
  `nationalId` TEXT,
  `linkedinUrl` TEXT,
  `portfolioUrl` TEXT,
  `githubUrl` TEXT,
  `status` TEXT NOT NULL DEFAULT 'DRAFT',
  `publishedAt` DATETIME,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS `Resume_singletonKey_key` ON `Resume`(`singletonKey`);

-- Create Experience table with image fields
CREATE TABLE IF NOT EXISTS `Experience` (
  `id` TEXT NOT NULL PRIMARY KEY,
  `resumeId` TEXT NOT NULL,
  `company` TEXT NOT NULL,
  `position` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `startDate` TEXT NOT NULL,
  `endDate` TEXT,
  `isCurrent` BOOLEAN NOT NULL DEFAULT 0,
  `skillsJson` TEXT NOT NULL DEFAULT '[]',
  `imageUrl` TEXT,
  `imageAlt` TEXT,
  `sortOrder` INTEGER NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `Experience_resumeId_fkey` FOREIGN KEY (`resumeId`) REFERENCES `Resume` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS `Experience_resumeId_idx` ON `Experience`(`resumeId`);

-- Create Education table with image fields
CREATE TABLE IF NOT EXISTS `Education` (
  `id` TEXT NOT NULL PRIMARY KEY,
  `resumeId` TEXT NOT NULL,
  `institution` TEXT NOT NULL,
  `course` TEXT NOT NULL,
  `degree` TEXT,
  `area` TEXT,
  `startDate` TEXT NOT NULL,
  `endDate` TEXT,
  `isCurrent` BOOLEAN NOT NULL DEFAULT 0,
  `description` TEXT,
  `imageUrl` TEXT,
  `imageAlt` TEXT,
  `sortOrder` INTEGER NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `Education_resumeId_fkey` FOREIGN KEY (`resumeId`) REFERENCES `Resume` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS `Education_resumeId_idx` ON `Education`(`resumeId`);

-- Create Certification table with image fields
CREATE TABLE IF NOT EXISTS `Certification` (
  `id` TEXT NOT NULL PRIMARY KEY,
  `resumeId` TEXT NOT NULL,
  `title` TEXT NOT NULL,
  `issuer` TEXT NOT NULL,
  `credentialUrl` TEXT,
  `issueDate` TEXT NOT NULL,
  `expiryDate` TEXT,
  `imageUrl` TEXT,
  `imageAlt` TEXT,
  `sortOrder` INTEGER NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `Certification_resumeId_fkey` FOREIGN KEY (`resumeId`) REFERENCES `Resume` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS `Certification_resumeId_idx` ON `Certification`(`resumeId`);

-- Create Language table
CREATE TABLE IF NOT EXISTS `Language` (
  `id` TEXT NOT NULL PRIMARY KEY,
  `resumeId` TEXT NOT NULL,
  `name` TEXT NOT NULL,
  `proficiency` TEXT NOT NULL DEFAULT 'Intermediário',
  `sortOrder` INTEGER NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `Language_resumeId_fkey` FOREIGN KEY (`resumeId`) REFERENCES `Resume` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS `Language_resumeId_idx` ON `Language`(`resumeId`);
