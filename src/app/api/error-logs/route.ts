import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST — Store an error log
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { level, message, source, url, userId, stack, metadata } = body;

    if (!message) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    const errorLog = await prisma.errorLog.create({
      data: {
        level: level || "error",
        message,
        source: source || "client",
        url: url || "",
        userId: userId || null,
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

// GET — Retrieve error logs (admin/debug use)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const level = searchParams.get("level") || undefined;

    const where = level ? { level } : {};

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
