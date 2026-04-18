import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

const ITERATIONS = 210_000;
const KEY_LENGTH = 32;
const DIGEST = "sha256";
const PREFIX = "pbkdf2";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex");
  return `${PREFIX}$${ITERATIONS}$${salt}$${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [prefix, iterationsText, salt, hash] = storedHash.split("$");

  if (prefix !== PREFIX || !iterationsText || !salt || !hash) {
    return false;
  }

  const iterations = Number(iterationsText);
  if (!Number.isInteger(iterations) || iterations <= 0) {
    return false;
  }

  const expected = Buffer.from(hash, "hex");
  const derived = pbkdf2Sync(password, salt, iterations, expected.length, DIGEST);

  if (derived.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(derived, expected);
}
