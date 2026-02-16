"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";


export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.data);
      } catch {
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="border border-neutral-800 p-8 w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold text-center">Dashboard</h1>

        <div className="space-y-2 text-sm">
          <p><span className="text-neutral-400">Email:</span> {user.email}</p>
          <p><span className="text-neutral-400">Role:</span> {user.role}</p>
        </div>

        <button
          onClick={async () => {
            await api.post("/auth/logout");
            router.push("/login");
          }}
          className="w-full border border-white py-2 hover:bg-white hover:text-black transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}