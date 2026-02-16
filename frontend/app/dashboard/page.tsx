"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch user + tasks
  useEffect(() => {
    const init = async () => {
      try {
        const userRes = await api.get("/auth/me");
        setUser(userRes.data.data);

        const taskRes = await api.get("/tasks");
        setTasks(taskRes.data);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // Create Task
  const handleCreateTask = async () => {
    if (!newTask.trim()) return;

    const res = await api.post("/tasks", { title: newTask });
    setTasks([...tasks, res.data]);
    setNewTask("");
  };

  // Toggle Complete
  const toggleTask = async (task: any) => {
    const res = await api.put(`/tasks/${task.id}`, {
      completed: !task.completed,
    });

    setTasks(tasks.map(t => t.id === task.id ? res.data : t));
  };

  // Delete Task (Admin only)
  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-neutral-500 text-sm mt-1">
              Welcome, {user.email}
            </p>
          </div>

          <button
            onClick={async () => {
              await api.post("/auth/logout");
              router.push("/login");
            }}
            className="bg-white text-black px-5 py-2 rounded-xl font-medium hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>

        {/* User Info */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Account Details</h2>

          <div className="space-y-2 text-sm">
            <p>
              <span className="text-neutral-500">Email:</span> {user.email}
            </p>

            <p>
              <span className="text-neutral-500">Role:</span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === "ADMIN"
                    ? "bg-white text-black"
                    : "bg-neutral-800"
                  }`}
              >
                {user.role}
              </span>
            </p>
          </div>
        </div>

        {/* Task Section */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold">Tasks</h2>

          {/* Create Task */}
          <div className="flex gap-4">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task title..."
              className="
                flex-1
                bg-black
                border border-neutral-800
                rounded-xl
                px-4 py-3
                text-white
                placeholder-neutral-600
                focus:outline-none
                focus:border-white
                transition
              "
            />

            <button
              onClick={handleCreateTask}
              className="bg-white text-black px-5 rounded-xl font-medium hover:opacity-90 transition"
            >
              Add
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {tasks.length === 0 && (
              <p className="text-neutral-600 text-sm">No tasks yet.</p>
            )}

            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3"
              >
                <div>
                  <p
                    className={`${task.completed ? "line-through text-neutral-500" : ""
                      }`}
                  >
                    {task.title}
                  </p>

                  {user.role === "ADMIN" && task.user?.email && (
                    <p className="text-xs text-neutral-500 mt-1">
                      Owner: {task.user.email}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 items-center">

                  {/* Toggle */}
                  <button
                    onClick={() => toggleTask(task)}
                    className="text-sm border border-neutral-700 px-3 py-1 rounded-lg hover:border-white transition"
                  >
                    {task.completed ? "Undo" : "Done"}
                  </button>

                  {/* Delete */}
                  {user.role === "ADMIN" ? (
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-sm bg-white text-black px-3 py-1 rounded-lg hover:opacity-90 transition"
                    >
                      Delete
                    </button>
                  ) : (
                    <div className="flex flex-col items-center">
                      <button
                        disabled
                        className="
          text-sm
          border border-neutral-800
          text-neutral-600
          px-3 py-1
          rounded-lg
          cursor-not-allowed
        "
                      >
                        Delete
                      </button>
                      <span className="text-[10px] text-neutral-600 mt-1">
                        Admin only
                      </span>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Notice */}
        {user.role !== "ADMIN" && (
          <div className="border border-neutral-800 rounded-xl p-6 bg-neutral-950">
            <h2 className="text-lg font-semibold mb-2">Admin Panel</h2>
            <p className="text-neutral-500 text-sm">
              This section is restricted to ADMIN users only.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}