import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "portfolio-editorial",
    timestamp: new Date().toISOString(),
  });
}
