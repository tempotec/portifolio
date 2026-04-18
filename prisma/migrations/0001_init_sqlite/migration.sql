PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'ADMIN',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

CREATE TABLE IF NOT EXISTS "Session" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "token" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "expiresAt" DATETIME NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Session_userId_fkey"
    FOREIGN KEY ("userId")
    REFERENCES "User" ("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "Session_token_key" ON "Session"("token");

CREATE TABLE IF NOT EXISTS "HeroSection" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "singletonKey" TEXT NOT NULL DEFAULT 'hero',
  "eyebrow" TEXT NOT NULL,
  "titleLead" TEXT NOT NULL,
  "titleAccent" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "stackJson" TEXT NOT NULL DEFAULT '[]',
  "ctaPrimaryText" TEXT NOT NULL,
  "ctaPrimaryHref" TEXT NOT NULL,
  "ctaSecondaryText" TEXT NOT NULL,
  "ctaSecondaryHref" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "publishedAt" DATETIME,
  "profileTitle" TEXT NOT NULL,
  "profileSubtitle" TEXT NOT NULL,
  "terminalLinesJson" TEXT NOT NULL DEFAULT '[]',
  "socialLinksJson" TEXT NOT NULL DEFAULT '[]',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS "HeroSection_singletonKey_key" ON "HeroSection"("singletonKey");

CREATE TABLE IF NOT EXISTS "Service" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "tagsJson" TEXT NOT NULL DEFAULT '[]',
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "publishedAt" DATETIME,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Project" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "eyebrow" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "summary" TEXT,
  "description" TEXT NOT NULL,
  "featured" BOOLEAN NOT NULL DEFAULT 0,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "stackJson" TEXT NOT NULL DEFAULT '[]',
  "tagsJson" TEXT NOT NULL DEFAULT '[]',
  "liveUrl" TEXT,
  "repoUrl" TEXT,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "publishedAt" DATETIME,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS "Project_slug_key" ON "Project"("slug");

CREATE TABLE IF NOT EXISTS "MediaAsset" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "url" TEXT NOT NULL,
  "alt" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "size" INTEGER,
  "width" INTEGER,
  "height" INTEGER,
  "folder" TEXT,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
