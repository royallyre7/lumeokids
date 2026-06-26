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
        className="inline-flex items-center gap-1 text-sm font-medium text-stone-400 hover:text-stone-600 transition-colors mb-6"
      >
        ← Back to Dashboard
      </Link>

      <Card>
        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold transition-colors ${
              step === 1
                ? "bg-coral-100 text-coral-600"
                : "bg-stone-100 text-stone-400"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                step === 1
                  ? "bg-coral-500 text-white"
                  : "bg-stone-300 text-stone-500"
              }`}
            >
              1
            </span>
            Basics
          </button>
          <div className="w-8 h-0.5 bg-stone-200 rounded" />
          <button
            onClick={() => setStep(2)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold transition-colors ${
              step === 2
                ? "bg-coral-100 text-coral-600"
                : "bg-stone-100 text-stone-400"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                step === 2
                  ? "bg-coral-500 text-white"
                  : "bg-stone-300 text-stone-500"
              }`}
            >
              2
            </span>
            Details
          </button>
        </div>

        <h1 className="text-xl font-extrabold text-stone-800 mb-6">
          Create Child Profile
        </h1>

        {formError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm flex items-center gap-2">
            <span>⚠️</span> {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 && (
            <div className="animate-fade-in space-y-5">
              <Input
                label="Child's Name *"
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your child's full name"
                error={errors.name?.[0]}
              />

              <Input
                label="Date of Birth *"
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                error={errors.dateOfBirth?.[0]}
              />

              <div>
                <label
                  htmlFor="learningLevel"
                  className="input-label"
                >
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

              <Button
                type="button"
                variant="primary"
                className="w-full"
                onClick={() => setStep(2)}
              >
                Continue to Details →
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in space-y-5">
              <Input
                label="Interests"
                id="interests"
                name="interests"
                type="text"
                placeholder="e.g., drawing, puzzles, animals"
                error={errors.interests?.[0]}
              />

              <Input
                label="Strengths"
                id="strengths"
                name="strengths"
                type="text"
                placeholder="e.g., good memory, curious, creative"
                error={errors.strengths?.[0]}
              />

              <Input
                label="Weaknesses"
                id="weaknesses"
                name="weaknesses"
                type="text"
                placeholder="e.g., short attention span, shy"
                error={errors.weaknesses?.[0]}
              />

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                  className="flex-1"
                >
                  Create Profile 🎉
                </Button>
              </div>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}
