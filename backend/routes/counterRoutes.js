import express from 'express'
import {
  getVisitors,
  increaseVisitors,
} from '../controllers/counterController.js'

const router = express.Router()

router.put('/increase', increaseVisitors)

router.get('/count', getVisitors)

export default router
