"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function HomeworkPage() {
  const params = useParams();
  const id = params.id as string;
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const response = await fetch("/api/homework/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `homework-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate homework:", err);
      alert("Failed to generate homework. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Link
        href={`/dashboard/children/${id}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-stone-400 hover:text-coral-500 transition-colors mb-6"
      >
        ← Back to Profile
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-stone-800 mb-2">
          📚 Homework Generator
        </h1>
        <p className="text-stone-500">
          Generate Child Development right brain practice sheets
        </p>
      </div>

      <div className="card p-6 mb-8">
        <div className="text-center">
          <div className="text-6xl mb-4">📖</div>
          <h2 className="text-xl font-bold text-stone-700 mb-2">
            Child Development Level 1 Practice Sheets
          </h2>
          <p className="text-sm text-stone-500 mb-6">
            42-page workbook with exercises covering:
          </p>
          <div className="grid grid-cols-2 gap-3 text-left mb-6">
            {[
              "🧠 Intuitive Memory",
              "🔢 Maths Ability",
              "👁️ Sensory Reasoning",
              "💡 Critical Thinking",
              "📝 Language Stimulation",
              "🎨 Image Patterns",
            ].map((domain) => (
              <div key={domain} className="pill-lavender px-3 py-2 text-xs">
                {domain}
              </div>
            ))}
          </div>
          <p className="text-xs text-stone-400 mb-6">
            Each generation produces unique content with AI-generated illustrations
          </p>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-bold rounded-full bg-gradient-to-r from-lavender-400 to-lavender-500 text-white shadow-clay hover:from-lavender-500 hover:to-lavender-600 disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all"
          >
            {generating ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Generating PDF...
              </>
            ) : (
              "📥 Generate & Download PDF"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
