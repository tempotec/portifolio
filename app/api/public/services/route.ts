import { NextResponse } from "next/server";

import { listPublishedServices } from "@/lib/editorial";
import { siteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    kicker: siteContent.services.kicker,
    title: siteContent.services.title,
    cards: await listPublishedServices(),
  });
}
