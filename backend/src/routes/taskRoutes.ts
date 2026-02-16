import express from "express";
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../controller/taskController.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();


router.post("/", authenticate, createTask);

router.get("/", authenticate, getTasks);

router.put("/:id", authenticate, updateTask);

router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteTask);

export default router;