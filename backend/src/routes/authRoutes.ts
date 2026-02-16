import express from 'express';
import { getMe, loginUser, registerUser,logoutUser } from '../controller/authController.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/me', authenticate, getMe)

router.post('/logout',logoutUser)
export default router;