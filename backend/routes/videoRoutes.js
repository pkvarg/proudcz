import express from 'express'
const router = express.Router()
import {
  createVideo,
  getVideoById,
  getVideo,
  deleteVideo,
  updateVideo,
} from '../controllers/videoController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getVideo).post(protect, admin, createVideo)

router
  .route('/:id')
  .get(getVideoById)
  .delete(protect, admin, deleteVideo)
  .put(protect, admin, updateVideo)

export default router
