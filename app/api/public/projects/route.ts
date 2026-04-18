import { NextResponse } from "next/server";

import { listPublishedProjects } from "@/lib/editorial";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await listPublishedProjects());
}
