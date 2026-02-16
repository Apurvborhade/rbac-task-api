import express from 'express';
import { getMe, loginUser, registerUser } from '../controller/authController.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/me', authenticate, getMe)

export default router;