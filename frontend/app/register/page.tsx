"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";
import AuthCard from "../components/AuthCard";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        email,
        password,
        role,
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Enter your details to create a new account."
      footerText="Already have an account?"
      footerLinkText="Sign In"
      footerHref="/login"
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
            w-full rounded-xl bg-black border border-neutral-800
            px-4 py-4 text-white placeholder-neutral-600
            focus:outline-none focus:border-white transition
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
            w-full rounded-xl bg-black border border-neutral-800
            px-4 py-4 text-white placeholder-neutral-600
            focus:outline-none focus:border-white transition
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Role Select */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="
            w-full rounded-xl bg-black border border-neutral-800
            px-4 py-4 text-white
            focus:outline-none focus:border-white transition pr-3
          "
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full rounded-xl bg-white text-black
            py-4 font-semibold tracking-wide
            hover:opacity-90 active:scale-[0.98]
            transition disabled:opacity-60 
          "
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

      </form>
    </AuthCard>
  );
}