import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

import { requireAdminFromRequest } from "@/lib/auth";
import { upsertResume } from "@/lib/editorial";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const user = await requireAdminFromRequest(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();

    const resume = await upsertResume(payload);

    revalidatePath("/admin/curriculum");
    revalidatePath("/admin");

    return NextResponse.json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error("Error saving resume:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to save resume",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const user = await requireAdminFromRequest(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { getResume } = await import("@/lib/editorial");
    const resume = await getResume();

    return NextResponse.json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch resume",
      },
      { status: 500 }
    );
  }
}
