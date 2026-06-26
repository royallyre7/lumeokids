import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/server-auth";
import { childProfileSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const parsed = childProfileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, dateOfBirth, learningLevel, interests, strengths, weaknesses } =
      parsed.data;

    const child = await prisma.child.create({
      data: {
        name,
        dateOfBirth: new Date(dateOfBirth),
        learningLevel,
        interests: interests || "",
        strengths: strengths || "",
        weaknesses: weaknesses || "",
        parentId: userId,
      },
    });

    return NextResponse.json({ child }, { status: 201 });
  } catch (error) {
    console.error("POST /api/children error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const children = await prisma.child.findMany({
      where: { parentId: userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ children });
  } catch (error) {
    console.error("GET /api/children error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
