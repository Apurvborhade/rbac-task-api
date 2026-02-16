
import { Request, Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware.js";
import { prisma } from "../utils/prisma.js";


export const createTask = async (req: AuthRequest, res: Response) => {
  const { title } = req.body;

  const task = await prisma.task.create({
    data: {
      title,
      userId: req.user!.id,
    },
  });

  res.status(201).json(task);
};


export const getTasks = async (req: AuthRequest, res: Response) => {
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

  res.json(tasks);
};


export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
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

  res.json(updatedTask);
};

// DELETE (Admin only)
export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  await prisma.task.delete({ where: { id } });

  res.json({ message: "Task deleted" });
};