import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ChildDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id: string })?.id;

  const child = await prisma.child.findUnique({
    where: { id: params.id },
  });

  if (!child || child.parentId !== userId) {
    notFound();
  }

  function calculateAge(dateOfBirth: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - dateOfBirth.getTime();
    const years = Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor(
      (diffMs % (365.25 * 24 * 60 * 60 * 1000)) /
        (30.44 * 24 * 60 * 60 * 1000)
    );
    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ${months} month${months > 1 ? "s" : ""}`;
    }
    return `${months} month${months > 1 ? "s" : ""}`;
  }

  const levelLabel: Record<string, string> = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/dashboard"
        className="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-block"
      >
        ← Back to Dashboard
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {child.name}
        </h1>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoItem label="Age" value={calculateAge(child.dateOfBirth)} />
          <InfoItem
            label="Date of Birth"
            value={child.dateOfBirth.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
          <InfoItem
            label="Learning Level"
            value={levelLabel[child.learningLevel] || child.learningLevel}
          />
          <InfoItem
            label="Interests"
            value={child.interests || "Not specified"}
          />
          <InfoItem
            label="Strengths"
            value={child.strengths || "Not specified"}
          />
          <InfoItem
            label="Weaknesses"
            value={child.weaknesses || "Not specified"}
          />
        </dl>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-gray-900">{value}</dd>
    </div>
  );
}
