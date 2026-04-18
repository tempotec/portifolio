import { NextResponse, type NextRequest } from "next/server";

import { requireAdminFromRequest } from "@/lib/auth";
import { getAdminDashboardSummary } from "@/lib/editorial";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const user = await requireAdminFromRequest(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = await getAdminDashboardSummary();

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    ...summary,
  });
}
