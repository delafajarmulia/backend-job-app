import express from 'express'
import { createCategory, deleteDetailCategory, getAllCategory, getDetailCategory, updateDetailCategory } from '../controller/categoryController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/', authMiddleware, createCategory)
router.get('/', getAllCategory)
router.get('/:id', getDetailCategory)
router.put('/:id', authMiddleware, updateDetailCategory)
router.delete('/:id', authMiddleware, deleteDetailCategory)

export default router