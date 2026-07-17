import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/server-auth";

const errorLogSchema = z.object({
  level: z.enum(["error", "warn", "info"]).default("error"),
  message: z.string().min(1, "message is required").max(1000),
  source: z.enum(["client", "api", "server"]).default("client"),
  url: z.string().max(2000).default(""),
  stack: z.string().max(5000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// POST — Store an error log (authenticated)
export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = errorLogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { level, message, source, url, stack, metadata } = parsed.data;

    const errorLog = await prisma.errorLog.create({
      data: {
        level,
        message,
        source,
        url,
        userId,
        stack: stack || null,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });

    return NextResponse.json({ id: errorLog.id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/error-logs error:", error);
    return NextResponse.json({ error: "Failed to store error log" }, { status: 500 });
  }
}

// GET — Retrieve error logs (authenticated, own logs only)
export async function GET(request: Request) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const level = searchParams.get("level") || undefined;

    const where = { userId, ...(level ? { level } : {}) };

    const logs = await prisma.errorLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: Math.min(limit, 200),
    });

    return NextResponse.json({ logs });
  } catch (error) {
    console.error("GET /api/error-logs error:", error);
    return NextResponse.json({ error: "Failed to fetch error logs" }, { status: 500 });
  }
}
