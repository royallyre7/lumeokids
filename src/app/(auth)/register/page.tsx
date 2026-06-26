"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-600 mt-2">Join LumeoKids for your child&apos;s growth</p>
      </div>

      {formError && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Full Name" name="name" type="text" errors={errors.name} />
        <Field label="Email" name="email" type="email" errors={errors.email} />
        <Field label="Password" name="password" type="password" errors={errors.password} />
        <Field
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          errors={errors.confirmPassword}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary-600 px-4 py-3 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  errors,
}: {
  label: string;
  name: string;
  type: string;
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors"
      />
      {errors && errors.length > 0 && (
        <p className="mt-1 text-sm text-red-600">{errors[0]}</p>
      )}
    </div>
  );
}
