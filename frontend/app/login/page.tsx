"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";
import AuthCard from "../components/AuthCard";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginRes = await api.post("/auth/login", { email, password });

      if (loginRes.data.success) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.log(err)
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Enter your credentials to access your account."
      footerText="Don't have an account?"
      footerLinkText="Create Account"
      footerHref="/register"
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        {error && (
          <p className="text-sm text-red-400 text-center">{error}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="
            w-full
            rounded-xl
            bg-black
            border border-neutral-800
            px-4 py-4
            text-white
            placeholder-neutral-600
            focus:outline-none
            focus:border-white
            transition
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="
            w-full
            rounded-xl
            bg-black
            border border-neutral-800
            px-4 py-4
            text-white
            placeholder-neutral-600
            focus:outline-none
            focus:border-white
            transition
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Remember Me */}
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <input
            type="checkbox"
            className="w-4 h-4 accent-white"
          />
          <span>Remember me</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            rounded-xl
            bg-white
            text-black
            py-4
            font-semibold
            tracking-wide
            hover:opacity-90
            active:scale-[0.98]
            transition
            disabled:opacity-60
          "
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

      </form>
    </AuthCard>
  );
}