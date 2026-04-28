import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { authenticate } from "@/lib/auth";
import { createSession, getSessionCookieOptions } from "@/lib/session";
import { SESSION_COOKIE_NAME } from "@/lib/auth-constants";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

async function parseLoginBody(request: NextRequest) {
  const rawBody = await request.text().catch(() => "");

  if (!rawBody) {
    return null;
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    const params = new URLSearchParams(rawBody);
    const email = params.get("email");
    const password = params.get("password");

    if (!email || !password) {
      return null;
    }

    return { email, password };
  }
}

export async function POST(request: NextRequest) {
  const body = await parseLoginBody(request);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const user = await authenticate(parsed.data.email, parsed.data.password);

  if (!user) {
    return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
  }

  const session = await createSession(user.id);
  const response = NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  response.cookies.set(SESSION_COOKIE_NAME, session.rawToken, getSessionCookieOptions(session.expiresAt));
  return response;
}
