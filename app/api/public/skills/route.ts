import { NextResponse } from "next/server";

import { getPublishedSkillCategories } from "@/lib/editorial";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    kicker: "Skills",
    title: "Tecnologias e conhecimentos que utilizo no desenvolvimento de soluções",
    categories: await getPublishedSkillCategories(),
  });
}
