"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [adminMessage, setAdminMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        const userData = res.data.data;
        setUser(userData);

        // If admin, call admin route
        if (userData.role === "ADMIN") {
          const adminRes = await api.get("/admin/admin-only");
          setAdminMessage(adminRes.data.message);
        }
      } catch {
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-10 w-full max-w-lg shadow-xl space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-neutral-500 text-sm mt-2">
            Authenticated user overview
          </p>
        </div>

        {/* User Info */}
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-neutral-500">Email</p>
            <p className="text-lg">{user.email}</p>
          </div>

          <div>
            <p className="text-neutral-500">Role</p>
            <span
              className={`
                inline-block px-3 py-1 rounded-full text-xs font-medium
                ${user.role === "ADMIN"
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-white"}
              `}
            >
              {user.role}
            </span>
          </div>

          <div>
            <p className="text-neutral-500">User ID</p>
            <p className="text-xs text-neutral-400 break-all">
              {user.id}
            </p>
          </div>
        </div>

        {/* Admin Section */}
        {/* Admin Section */}
        <div className="border border-neutral-800 rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">Admin Panel</h2>

          {user.role === "ADMIN" ? (
            adminMessage ? (
              <p className="text-sm text-neutral-400">
                {adminMessage}
              </p>
            ) : (
              <p className="text-sm text-neutral-600">
                Loading admin data...
              </p>
            )
          ) : (
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400">
                🔒 This section is protected.
              </p>
              <p className="text-xs text-neutral-600 mt-2">
                Admin privileges required to access this resource.
              </p>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={async () => {
            await api.post("/auth/logout");
            router.push("/login");
          }}
          className="
            w-full
            bg-white
            text-black
            rounded-xl
            py-3
            font-semibold
            hover:opacity-90
            active:scale-[0.98]
            transition
          "
        >
          Logout
        </button>

      </div>
    </div>
  );
}