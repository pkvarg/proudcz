import express from 'express'
import {
  getSubscribers,
  getUnsubscribers,
} from '../controllers/subscribersController.js'

const router = express.Router()

router.get('/subscribed', getSubscribers)

router.get('/unsubscribed', getUnsubscribers)

export default router
