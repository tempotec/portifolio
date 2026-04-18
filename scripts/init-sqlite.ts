import "dotenv/config";

import fs from "fs";
import path from "path";

import Database from "better-sqlite3";

const databaseUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const databasePath = databaseUrl.replace(/^file:/, "");
const resolvedDbPath = path.resolve(process.cwd(), databasePath);
const migrationsRoot = path.resolve(process.cwd(), "prisma/migrations");
const migrationTableName = "__codex_migrations";

if (!fs.existsSync(path.dirname(resolvedDbPath))) {
  fs.mkdirSync(path.dirname(resolvedDbPath), { recursive: true });
}

const db = new Database(resolvedDbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS ${migrationTableName} (
    name TEXT PRIMARY KEY,
    appliedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const migrations = fs
  .readdirSync(migrationsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort()
  .map((name) => ({
    name,
    path: path.join(migrationsRoot, name, "migration.sql"),
  }))
  .filter((migration) => fs.existsSync(migration.path));

const appliedMigrations = new Set(
  (db.prepare(`SELECT name FROM ${migrationTableName}`).all() as Array<{ name: string }>).map((row) => row.name),
);

if (appliedMigrations.size === 0) {
  const knownTables = ["User", "Session", "HeroSection", "Service", "Project", "MediaAsset"];
  const tableCount = db
    .prepare(
      `SELECT COUNT(*) as count FROM sqlite_master WHERE type = 'table' AND name IN (${knownTables
        .map(() => "?")
        .join(", ")})`,
    )
    .get(...knownTables) as { count: number };

  if (tableCount.count === knownTables.length) {
    db.prepare(`INSERT OR IGNORE INTO ${migrationTableName} (name) VALUES (?)`).run("0001_init_sqlite");
    appliedMigrations.add("0001_init_sqlite");
  }
}

for (const migration of migrations) {
  if (appliedMigrations.has(migration.name)) {
    continue;
  }

  const migrationSql = fs.readFileSync(migration.path, "utf8");
  db.exec(migrationSql);
  db.prepare(`INSERT INTO ${migrationTableName} (name) VALUES (?)`).run(migration.name);
}

db.close();

console.log(`SQLite initialized at ${resolvedDbPath}`);
