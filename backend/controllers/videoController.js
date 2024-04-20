import asyncHandler from 'express-async-handler'
import Video from '../models/videoModel.js'

// @desc Fetch all video
// @desc GET /api/video
// @access Public

const getVideo = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Video.countDocuments({ ...keyword })
  const videos = await Video.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ videos, page, pages: Math.ceil(count / pageSize) })
})

// @desc Fetch single video
// @desc GET /api/video/:id
// @access Public

const getVideoById = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id)
  if (video) {
    res.json(video)
  } else {
    res.status(404)
    throw new Error('Video not found')
  }
})

// @desc Delete an video
// @desc DELETE /api/video/:id
// @access Private/Admin

const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id)
  if (video) {
    await video.remove()
    res.json({ message: 'Video removed' })
  } else {
    res.status(404)
    throw new Error('Video not found')
  }
})

// @desc Create a Video
// @desc POST /api/video
// @access Private/Admin

const createVideo = asyncHandler(async (req, res) => {
  const video = new Video({
    user: req.user._id,
    videoTitle: '',
    code: '',
  })

  const createdVideo = await video.save()
  res.status(201).json(createdVideo)
})

// @desc    Update a video
// @route   PUT /api/video/:id
// @access  Private/Admin
const updateVideo = asyncHandler(async (req, res) => {
  const { videoTitle, code } = req.body
  const user = req.user._id

  const video = await Video.findById(req.params.id)

  if (video) {
    video.user = user
    video.videoTitle = videoTitle
    video.code = code

    const updatedVideo = await video.save()
    res.json(updatedVideo)
  } else {
    res.status(404)
    throw new Error('Video not found')
  }
})

export { createVideo, getVideo, getVideoById, deleteVideo, updateVideo }
