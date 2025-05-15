import express from 'express'
import { createJob, deleteJob, getAllJobs, getDetailJobs, updateJob } from '../controller/jobController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/', authMiddleware, createJob)
router.put('/:jobId', authMiddleware, updateJob)
router.get('/', getAllJobs)
router.get('/:jobId', getDetailJobs)
router.delete('/:jobId', authMiddleware, deleteJob)

export default router