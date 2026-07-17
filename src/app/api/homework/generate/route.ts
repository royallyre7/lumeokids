import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/server-auth";
import prisma from "@/lib/prisma";
import { generateHomeworkPDF } from "@/lib/homework/generator";

export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { childId } = body;

    if (!childId) {
      return NextResponse.json({ error: "childId is required" }, { status: 400 });
    }

    // Verify child belongs to user
    const child = await prisma.child.findUnique({ where: { id: childId } });
    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }
    if (child.parentId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Generate PDF
    const pdfBuffer = await generateHomeworkPDF(child.name);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="homework-${child.name}-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("POST /api/homework/generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate homework" },
      { status: 500 }
    );
  }
}
