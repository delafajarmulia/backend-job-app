import express from 'express';
import { createApplyJob } from '../controller/applyJobController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router()

router.post('/', authMiddleware, createApplyJob)

export default router