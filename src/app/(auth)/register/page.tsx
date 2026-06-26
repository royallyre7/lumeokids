"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setFormError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.details) {
        setErrors(data.details);
      } else {
        setFormError(data.error || "Registration failed");
      }
      setLoading(false);
      return;
    }

    // Auto-login after successful registration
    const signInResult = await signIn("credentials", {
      email: body.email as string,
      password: body.password as string,
      redirect: false,
    });

    if (signInResult?.error) {
      setFormError("Account created but login failed. Please try signing in.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extrabold text-stone-800">
          Create Account 🎉
        </h1>
        <p className="text-stone-500 mt-2">
          Join LumeoKids and start your child&apos;s learning journey
        </p>
      </div>

      {formError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm flex items-center gap-2">
          <span>⚠️</span> {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your full name"
          error={errors.name?.[0]}
        />

        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          error={errors.email?.[0]}
        />

        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          required
          placeholder="At least 6 characters"
          error={errors.password?.[0]}
        />

        <Input
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.[0]}
        />

        <Button type="submit" loading={loading} className="w-full">
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-stone-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-coral-500 hover:text-coral-600 font-semibold transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
