import { NextResponse } from "next/server";

import { getPublishedContactPage } from "@/lib/editorial";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getPublishedContactPage());
}
