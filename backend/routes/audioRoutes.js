import express from 'express'
const router = express.Router()
import {
  createAudio,
  getAudioById,
  getAudio,
  deleteAudio,
  updateAudio,
} from '../controllers/audioController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getAudio).post(protect, admin, createAudio)

router
  .route('/:id')
  .get(getAudioById)
  .delete(protect, admin, deleteAudio)
  .put(protect, admin, updateAudio)

export default router
