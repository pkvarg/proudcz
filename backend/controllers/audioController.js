import asyncHandler from 'express-async-handler'
import Audio from '../models/audioModel.js'

// @desc Fetch all audios
// @desc GET /api/audio
// @access Public

const getAudio = asyncHandler(async (req, res) => {
  const pageSize = 1000
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Audio.countDocuments({ ...keyword })
  const audios = await Audio.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ audios, page, pages: Math.ceil(count / pageSize) })
})

// @desc Fetch single audio
// @desc GET /api/audio/:id
// @access Public

const getAudioById = asyncHandler(async (req, res) => {
  const audio = await Audio.findById(req.params.id)
  if (audio) {
    res.json(audio)
  } else {
    res.status(404)
    throw new Error('Audio not found')
  }
})

// @desc Delete an audio
// @desc DELETE /api/audio/:id
// @access Private/Admin

const deleteAudio = asyncHandler(async (req, res) => {
  const audio = await Audio.findById(req.params.id)
  if (audio) {
    await audio.remove()
    res.json({ message: 'Audio removed' })
  } else {
    res.status(404)
    throw new Error('Audio not found')
  }
})

// @desc Create an Audio
// @desc POST /api/audio
// @access Private/Admin

const createAudio = asyncHandler(async (req, res) => {
  const audio = new Audio({
    user: req.user._id,
    audioTitle: '',
    mp3file: '',
    category: '',
    subcategory: '',
  })

  const createdAudio = await audio.save()
  res.status(201).json(createdAudio)
})

// @desc    Update an audio
// @route   PUT /api/audio/:id
// @access  Private/Admin
const updateAudio = asyncHandler(async (req, res) => {
  const { audioTitle, mp3file, category, subcategory } = req.body
  const user = req.user._id

  const audio = await Audio.findById(req.params.id)

  if (audio) {
    audio.user = user
    audio.audioTitle = audioTitle
    audio.mp3file = mp3file
    audio.category = category
    audio.subcategory = subcategory

    const updatedAudio = await audio.save()
    res.json(updatedAudio)
  } else {
    res.status(404)
    throw new Error('Audio not found')
  }
})

export { createAudio, getAudio, getAudioById, deleteAudio, updateAudio }
