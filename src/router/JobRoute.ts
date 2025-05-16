import express from 'express'
import { createJob, deleteJob, getAllJobs, getAllJobsByOwner, getDetailJobs, getDetailJobByOwner, updateJob } from '../controller/jobController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/', authMiddleware, createJob)
router.put('/:jobId', authMiddleware, updateJob)
router.get('/user', authMiddleware, getAllJobsByOwner)
router.get('/user/:jobId', authMiddleware, getDetailJobByOwner)
router.get('/', getAllJobs)
router.get('/:jobId', getDetailJobs)
router.delete('/:jobId', authMiddleware, deleteJob)

export default router