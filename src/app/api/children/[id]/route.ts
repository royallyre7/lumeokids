import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/server-auth";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const child = await prisma.child.findUnique({
      where: { id: params.id },
    });

    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    // Parent can only see their own children
    if (child.parentId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ child });
  } catch (error) {
    console.error("GET /api/children/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
