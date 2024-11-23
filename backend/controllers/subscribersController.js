import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const getSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await User.find({
    isSubscribed: true,
  })
  res.json(subscribers)
})

const getUnsubscribers = asyncHandler(async (req, res) => {
  const unsubscribers = await User.find({
    isUnsubscribed: true,
  })
  res.json(unsubscribers)
})

export { getSubscribers, getUnsubscribers }
