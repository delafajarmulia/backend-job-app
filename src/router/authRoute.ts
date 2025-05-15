import express from 'express';
import { getUser, loginUser, registerUser } from '../controller/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/get-user', authMiddleware, getUser)

export default router;