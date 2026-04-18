import { NextResponse } from "next/server";

import { getPublicHomeContent } from "@/lib/editorial";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getPublicHomeContent());
}
