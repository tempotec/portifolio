import "server-only";

import type { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

import { getSessionByToken, SESSION_COOKIE_NAME } from "./session";
import { verifyPassword } from "./password";

export async function authenticate(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  if (!verifyPassword(password, user.passwordHash)) {
    return null;
  }

  return user;
}

export async function getCurrentUserFromToken(token: string | undefined | null) {
  if (!token) {
    return null;
  }

  const session = await getSessionByToken(token);
  return session?.user ?? null;
}

export async function getCurrentUserFromRequest(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  return getCurrentUserFromToken(token);
}

export async function requireAdminFromRequest(request: NextRequest) {
  const user = await getCurrentUserFromRequest(request);

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return user;
}
