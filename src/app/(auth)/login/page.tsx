"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
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
          Welcome Back 👋
        </h1>
        <p className="text-stone-500 mt-2">
          Sign in to your LumeoKids account
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
        />

        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          required
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-end">
          <Link
            href="#"
            className="text-sm text-stone-400 hover:text-coral-500 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" loading={loading} className="w-full">
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-stone-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-coral-500 hover:text-coral-600 font-semibold transition-colors"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
