"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function NewChildPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setFormError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());

    const res = await fetch("/api/children", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.details) {
        setErrors(data.details);
      } else {
        setFormError(data.error || "Failed to create profile");
      }
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="max-w-lg mx-auto animate-slide-up">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm font-medium text-stone-400 hover:text-coral-500 transition-colors mb-6"
      >
        ← Back to Dashboard
      </Link>

      <Card>
        {/* Step Indicator — Playful Bubbles */}
        <div className="flex items-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
              step === 1
                ? "bg-gradient-to-r from-coral-500 to-coral-600 text-white shadow-bubble"
                : "bg-stone-100 text-stone-400 hover:bg-stone-200"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-extrabold ${
                step === 1
                  ? "bg-white/30 text-white"
                  : "bg-stone-300 text-white"
              }`}
            >
              1
            </span>
            Basics
          </button>
          <div className={`w-8 h-1 rounded-full transition-colors ${step === 2 ? "bg-coral-300" : "bg-stone-200"}`} />
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
              step === 2
                ? "bg-gradient-to-r from-coral-500 to-coral-600 text-white shadow-bubble"
                : "bg-stone-100 text-stone-400 hover:bg-stone-200"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-extrabold ${
                step === 2
                  ? "bg-white/30 text-white"
                  : "bg-stone-300 text-white"
              }`}
            >
              2
            </span>
            Details
          </button>
        </div>

        <h1 className="text-xl font-extrabold text-stone-800 mb-2">
          Create Child Profile ✨
        </h1>
        <p className="text-sm text-stone-500 mb-6">
          {step === 1
            ? "Let's start with the basics about your child."
            : "Add some details to personalize the learning experience."}
        </p>

        {formError && (
          <div
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm flex items-center gap-2"
            role="alert"
          >
            <span aria-hidden="true">⚠️</span> {formError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* STEP 1: Basics — always in DOM, hidden when on step 2 */}
          <div className={step === 1 ? "space-y-5 animate-fade-in" : "hidden"}>
            <Input
              label="Child's Name *"
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your child's full name"
              error={errors.name?.[0]}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />

            <Input
              label="Date of Birth *"
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              required
              error={errors.dateOfBirth?.[0]}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />

            <div>
              <label htmlFor="learningLevel" className="input-label">
                Learning Level
              </label>
              <select
                id="learningLevel"
                name="learningLevel"
                defaultValue="BEGINNER"
                className="input-field appearance-none bg-no-repeat bg-[right_1rem_center]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundSize: "1.25rem",
                }}
              >
                <option value="BEGINNER">🌱 Beginner</option>
                <option value="INTERMEDIATE">🌿 Intermediate</option>
                <option value="ADVANCED">🌳 Advanced</option>
              </select>
            </div>
          </div>

          {/* STEP 2: Details — always in DOM, hidden when on step 1 */}
          <div className={step === 2 ? "space-y-5 animate-fade-in" : "hidden"}>
            <Input
              label="Interests"
              id="interests"
              name="interests"
              type="text"
              placeholder="e.g., drawing, puzzles, animals"
              error={errors.interests?.[0]}
              hint="Separate multiple interests with commas"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <Input
              label="Strengths"
              id="strengths"
              name="strengths"
              type="text"
              placeholder="e.g., good memory, curious, creative"
              error={errors.strengths?.[0]}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <Input
              label="Weaknesses"
              id="weaknesses"
              name="weaknesses"
              type="text"
              placeholder="e.g., short attention span, shy"
              error={errors.weaknesses?.[0]}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
          </div>

          {/* Navigation buttons */}
          <div className="mt-6">
            {step === 1 ? (
              <Button
                type="button"
                variant="primary"
                className="w-full"
                onClick={() => setStep(2)}
              >
                Continue to Details →
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </Button>
                <Button type="submit" loading={loading} className="flex-1">
                  Create Profile 🎉
                </Button>
              </div>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
