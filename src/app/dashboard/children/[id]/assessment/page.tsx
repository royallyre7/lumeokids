"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProgressRing from "@/components/ui/ProgressRing";
import { SECTIONS, INTEREST_CLUSTERS } from "@/lib/archetypes";
import { logError, logApiError } from "@/lib/error-logger";

const TOTAL_STEPS = 11; // 10 sections + 1 interest inventory

export default function AssessmentPage() {
  const router = useRouter();
  const params = useParams();
  const childId = params.id as string;
  const [step, setStep] = useState(0); // 0–9 = sections A-J, 10 = interests
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Store scores: sectionKey -> array of question scores
  const [scores, setScores] = useState<Record<string, number[]>>(() => {
    const initial: Record<string, number[]> = {};
    SECTIONS.forEach((s) => {
      initial[s.key] = new Array(s.questions.length).fill(0);
    });
    return initial;
  });

  // Store selected interests
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(
    new Set()
  );

  const currentSection = SECTIONS[step];
  const isLastSection = step === SECTIONS.length - 1;
  const isInterestStep = step === SECTIONS.length;
  const isLastStep = step === TOTAL_STEPS - 1;

  function setQuestionScore(sectionKey: string, qIndex: number, value: number) {
    setScores((prev) => {
      const updated = { ...prev };
      updated[sectionKey] = [...prev[sectionKey]];
      updated[sectionKey][qIndex] = value;
      return updated;
    });
  }

  function toggleInterest(item: string) {
    setSelectedInterests((prev) => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  }

  function handleNext() {
    if (!isLastStep) {
      setStep((s) => s + 1);
    }
  }

  function handlePrev() {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  }

  async function handleSubmit() {
    setLoading(true);
    setFormError("");

    // Build sectionScores payload
    const sectionScores: Record<string, { total: number; questions: number[] }> = {};
    SECTIONS.forEach((section) => {
      const questions = scores[section.key];
      const total = questions.reduce((sum, s) => sum + s, 0);
      sectionScores[section.key] = { total, questions };
    });

    const body = {
      childId,
      sectionScores,
      interests: Array.from(selectedInterests),
    };

    try {
      const res = await fetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setFormError(data.error || "Failed to save assessment");
        // Log the error
        await logApiError("/api/assessments", res.status, data);
        setLoading(false);
        return;
      }

      router.push(`/dashboard/children/${childId}/assessment/results`);
      router.refresh();
    } catch (err) {
      setFormError("Network error. Please try again.");
      // Log the network error
      await logError("Network error submitting assessment", {
        level: "error",
        source: "client",
        metadata: { childId, error: err instanceof Error ? err.message : "Unknown error" },
      });
      setLoading(false);
    }
  }

  // Progress
  const progressPct = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <Link
        href={`/dashboard/children/${childId}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-stone-400 hover:text-coral-500 transition-colors mb-4"
      >
        ← Back to Child Profile
      </Link>

      <Card>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-extrabold text-stone-800 mb-1">
            🧠 Child Strengths Assessment
          </h1>
          <p className="text-sm text-stone-500">
            Rate each statement based on your child&apos;s behavior over the last 3–6 months.
          </p>
        </div>

        {/* Progress bar — Playful Bubbles */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="pill-coral">
              {isInterestStep
                ? "📋 Section K — Interests"
                : `${currentSection.emoji} Section ${currentSection.key} — ${currentSection.label}`}
            </span>
            <span className="font-bold">
              Step {step + 1} of {TOTAL_STEPS} · {progressPct}%
            </span>
          </div>
          <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-coral-400 via-lavender-400 to-sky-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Section quick-nav (horizontal scroll) — Playful Bubbles */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-2">
          {SECTIONS.map((s, i) => {
            const sectionTotal = scores[s.key].reduce((a, b) => a + b, 0);
            const isComplete = sectionTotal > 0;
            const isCurrent = i === step;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setStep(i)}
                className={`flex-shrink-0 w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-200 ${
                  isCurrent
                    ? "bg-gradient-to-br from-coral-500 to-lavender-500 text-white shadow-bubble scale-110"
                    : isComplete
                      ? "bg-mint-100 text-mint-600 hover:bg-mint-200"
                      : "bg-stone-100 text-stone-400 hover:bg-stone-200"
                }`}
                title={s.label}
              >
                {isComplete && !isCurrent ? "✓" : s.key}
              </button>
            );
          })}
          <span className={`flex-shrink-0 w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-200 ${
            isInterestStep
              ? "bg-gradient-to-br from-coral-500 to-lavender-500 text-white shadow-bubble scale-110"
              : "bg-stone-100 text-stone-400"
          }`}>
            K
          </span>
        </div>

        {/* Form Error */}
        {formError && (
          <div
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm flex items-center gap-2"
            role="alert"
          >
            <span aria-hidden="true">⚠️</span> {formError}
          </div>
        )}

        {/* Rating Scale Legend */}
        <div className="mb-6 p-3 bg-gradient-to-r from-coral-50 to-lavender-50 rounded-xl text-xs text-stone-500 flex flex-wrap gap-x-4 gap-y-1">
          <span><strong>0</strong> = N/A</span>
          <span><strong>1</strong> = Almost Never</span>
          <span><strong>2</strong> = Rarely</span>
          <span><strong>3</strong> = Sometimes</span>
          <span><strong>4</strong> = Often</span>
          <span><strong>5</strong> = Almost Always</span>
        </div>

        {/* SECTION QUESTIONS (A–J) — all in DOM */}
        {SECTIONS.map((section, si) => (
          <div
            key={section.key}
            className={si === step ? "animate-fade-in" : "hidden"}
          >
            <h2 className="text-lg font-bold text-stone-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">{section.emoji}</span>
              {section.label}
            </h2>

            <div className="space-y-4">
              {section.questions.map((question, qi) => (
                <div
                  key={qi}
                  className="bg-stone-50 rounded-2xl p-4 border border-stone-100 hover:border-coral-200 transition-colors"
                >
                  <p className="text-sm font-medium text-stone-700 mb-3">
                    {qi + 1}. {question}
                  </p>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() =>
                          setQuestionScore(section.key, qi, val)
                        }
                        className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                          scores[section.key]?.[qi] === val
                            ? "bg-gradient-to-br from-coral-500 to-lavender-500 text-white shadow-bubble scale-105"
                            : "bg-white border border-stone-200 text-stone-500 hover:border-coral-300 hover:bg-coral-50"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Section Total */}
            <div className="mt-6 p-4 bg-gradient-to-r from-coral-50 via-lavender-50 to-sky-50 rounded-2xl text-center">
              <p className="text-sm text-stone-500">
                Section Total:{" "}
                <span className="text-xl font-extrabold text-gradient">
                  {scores[section.key]?.reduce((a, b) => a + b, 0) || 0}
                </span>{" "}
                / {section.maxScore}
              </p>
            </div>
          </div>
        ))}

        {/* INTEREST INVENTORY (Section K) */}
        <div className={isInterestStep ? "animate-fade-in" : "hidden"}>
          <h2 className="text-lg font-bold text-stone-700 mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            Interest Inventory
          </h2>
          <p className="text-sm text-stone-500 mb-6">
            Check all activities and topics your child shows interest in.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {INTEREST_CLUSTERS.map((cluster) => (
              <div
                key={cluster.key}
                className="bg-stone-50 rounded-2xl p-4 border border-stone-100 hover:border-lavender-200 transition-colors"
              >
                <h3 className="font-bold text-stone-700 mb-3 text-sm">
                  {cluster.emoji} {cluster.label}
                </h3>
                <div className="space-y-2">
                  {cluster.items.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedInterests.has(item)}
                        onChange={() => toggleInterest(item)}
                        className="w-4 h-4 rounded border-stone-300 text-coral-500 focus:ring-coral-400"
                      />
                      <span className="text-sm text-stone-600 group-hover:text-stone-800 transition-colors">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-sm text-stone-400">
            {selectedInterests.size} interest{selectedInterests.size !== 1 ? "s" : ""} selected
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={handlePrev}>
              ← Back
            </Button>
          ) : (
            <div />
          )}

          {isLastStep ? (
            <Button
              type="button"
              variant="primary"
              loading={loading}
              onClick={handleSubmit}
            >
              See Results 🎉
            </Button>
          ) : (
            <Button type="button" variant="primary" onClick={handleNext}>
              Continue →
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
