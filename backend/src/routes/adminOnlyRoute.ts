import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';


const router = express.Router();

router.get(
    "/admin-only",
    authenticate,
    authorize(["ADMIN"]),
    (req, res) => {
        res.json({ message: "Welcome Admin" });
    }
);

export default router;