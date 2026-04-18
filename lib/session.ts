import "server-only";

import { createHash, randomBytes } from "crypto";

import { prisma } from "@/lib/prisma";

import { SESSION_COOKIE_NAME, SESSION_DURATION_SECONDS } from "./auth-constants";

export type SessionCookieOptions = {
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none";
  secure: boolean;
  path: string;
  expires: Date;
};

export function generateSessionToken() {
  return randomBytes(32).toString("hex");
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function getSessionCookieOptions(expiresAt: Date): SessionCookieOptions {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  };
}

export async function createSession(userId: string) {
  const rawToken = generateSessionToken();
  const token = hashSessionToken(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_SECONDS * 1000);

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return {
    rawToken,
    token,
    expiresAt,
  };
}

export async function getSessionByToken(rawToken: string) {
  const token = hashSessionToken(rawToken);
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt.getTime() <= Date.now()) {
    await prisma.session.delete({ where: { token } });
    return null;
  }

  return session;
}

export async function destroySession(rawToken: string) {
  const token = hashSessionToken(rawToken);
  await prisma.session.deleteMany({ where: { token } });
}

export { SESSION_COOKIE_NAME };
