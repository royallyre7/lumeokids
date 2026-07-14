import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/server-auth";
import { getBrowser } from "@/lib/puppeteer";
import { buildResultsHTML } from "@/lib/pdf-template";
import { SECTIONS } from "@/lib/archetypes";
import type { SectionResult, ArchetypeMatch } from "@/lib/archetypes";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const child = await prisma.child.findUnique({ where: { id: params.id } });
    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }
    if (child.parentId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const assessment = await prisma.assessment.findFirst({
      where: { childId: params.id },
      orderBy: { createdAt: "desc" },
    });
    if (!assessment) {
      return NextResponse.json(
        { error: "No assessment found" },
        { status: 404 }
      );
    }

    const sectionScores = JSON.parse(assessment.sectionScores) as Record<
      string,
      SectionResult
    >;
    const archetypes = JSON.parse(assessment.archetypes) as ArchetypeMatch[];
    const interests = JSON.parse(assessment.interests) as string[];

    const totalScore = Object.values(sectionScores).reduce(
      (sum, s) => sum + s.total,
      0
    );
    const maxTotal = Object.values(sectionScores).reduce(
      (sum, s) => sum + s.maxScore,
      0
    );
    const overallPct = Math.round((totalScore / maxTotal) * 100);

    const html = buildResultsHTML({
      childName: child.name,
      assessmentDate: new Date(assessment.createdAt).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      ),
      overallScore: totalScore,
      maxScore: maxTotal,
      overallPct,
      sectionScores: SECTIONS.filter((s) => sectionScores[s.key]).map((s) => ({
        key: s.key,
        label: s.label,
        emoji: s.emoji,
        total: sectionScores[s.key].total,
        maxScore: sectionScores[s.key].maxScore,
        zone: sectionScores[s.key].zone,
      })),
      interests,
      archetypes: archetypes.map((a) => ({
        name: a.name,
        emoji: a.emoji,
        tagline: a.tagline,
        matchStrength: a.matchStrength,
        description: a.description,
        coreStrengths: a.coreStrengths,
        recommendedActivities: a.recommendedActivities,
        learningStyle: a.learningStyle,
        supportGuidance: a.supportGuidance,
      })),
    });

    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "15mm", right: "15mm", bottom: "15mm", left: "15mm" },
    });

    // Convert Uint8Array to Buffer for NextResponse compatibility
    const buffer = Buffer.from(pdfBuffer);

    await page.close();

    const safeName = child.name.replace(/\s+/g, "-").toLowerCase();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeName}-assessment-results.pdf"`,
      },
    });
  } catch (error) {
    console.error("POST /api/children/[id]/assessment/pdf error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
