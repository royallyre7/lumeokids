import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/server-auth";
import { assessmentSchema } from "@/lib/validators";
import { matchArchetypes, getZone, ZONE_COLORS, ZONE_LABELS, ZONE_DESCRIPTIONS, SECTIONS } from "@/lib/archetypes";
import type { SectionResult, ZoneLevel } from "@/lib/archetypes";

export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate assessment data
    const parsed = assessmentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { sectionScores, interests } = parsed.data;
    const childId = body.childId as string;

    if (!childId) {
      return NextResponse.json(
        { error: "childId is required" },
        { status: 400 }
      );
    }

    // Verify child belongs to user
    const child = await prisma.child.findUnique({
      where: { id: childId },
    });

    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    if (child.parentId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Compute zone classifications for each section
    const enhancedScores: Record<string, SectionResult> = {};
    for (const section of SECTIONS) {
      const raw = sectionScores[section.key];
      if (!raw) {
        enhancedScores[section.key] = {
          total: 0,
          maxScore: section.maxScore,
          zone: "Support" as ZoneLevel,
          zoneColor: "bg-coral-400",
          questions: [],
        };
        continue;
      }
      const zone = getZone(raw.total, section.maxScore);
      enhancedScores[section.key] = {
        total: raw.total,
        maxScore: section.maxScore,
        zone,
        zoneColor: ZONE_COLORS[zone],
        questions: raw.questions,
      };
    }

    // Compute archetype matches
    const archetypes = matchArchetypes(enhancedScores, interests);

    // Store assessment
    const assessment = await prisma.assessment.create({
      data: {
        childId,
        sectionScores: JSON.stringify(enhancedScores),
        interests: JSON.stringify(interests),
        archetypes: JSON.stringify(archetypes),
      },
    });

    return NextResponse.json(
      {
        assessment: {
          ...assessment,
          sectionScores: enhancedScores,
          interests,
          archetypes,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/assessments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const childId = searchParams.get("childId");

    if (!childId) {
      return NextResponse.json(
        { error: "childId query parameter is required" },
        { status: 400 }
      );
    }

    // Verify child belongs to user
    const child = await prisma.child.findUnique({
      where: { id: childId },
    });

    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    if (child.parentId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const assessment = await prisma.assessment.findFirst({
      where: { childId },
      orderBy: { createdAt: "desc" },
    });

    if (!assessment) {
      return NextResponse.json(
        { error: "No assessment found for this child" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      assessment: {
        ...assessment,
        sectionScores: JSON.parse(assessment.sectionScores),
        interests: JSON.parse(assessment.interests),
        archetypes: JSON.parse(assessment.archetypes),
      },
    });
  } catch (error) {
    console.error("GET /api/assessments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
