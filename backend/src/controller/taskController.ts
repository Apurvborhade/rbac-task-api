
import { Request, Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware.js";
import { prisma } from "../utils/prisma.js";
import { redis } from "../utils/redis.js";

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title } = req.body;

  const task = await prisma.task.create({
    data: {
      title,
      userId: req.user!.id,
    },
  });
  await redis.del(`tasks:user:${req.user!.id}`);
  await redis.del("tasks:admin");

  res.status(201).json(task);
};


export const getTasks = async (req: AuthRequest, res: Response) => {
  const cacheKey =
    req.user!.role === "ADMIN"
      ? "tasks:admin"
      : `tasks:user:${req.user!.id}`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  let tasks;

  if (req.user!.role === "ADMIN") {
    tasks = await prisma.task.findMany({
      include: { user: { select: { email: true } } },
    });
  } else {
    tasks = await prisma.task.findMany({
      where: { userId: req.user!.id },
    });
  }
  // Store in cache (expire in 60 seconds)
  await redis.set(cacheKey, JSON.stringify(tasks), "EX", 60);

  res.json(tasks);
};


export const updateTask = async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;
  const { title, completed } = req.body;

  const task = await prisma.task.findUnique({ where: { id } });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }


  if (
    task.userId !== req.user!.id &&
    req.user!.role !== "ADMIN"
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data: { title, completed },
  });

  await redis.del(`tasks:user:${task.userId}`);
  await redis.del("tasks:admin")
  res.json(updatedTask);
};

// DELETE (Admin only)
export const deleteTask = async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;

  await prisma.task.delete({ where: { id } });

  res.json({ message: "Task deleted" });
};