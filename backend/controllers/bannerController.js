import asyncHandler from 'express-async-handler'
import Banner from '../models/bannerModel.js'

// @desc Fetch all banners
// @desc GET /api/banner
// @access Public

const getBanner = asyncHandler(async (req, res) => {
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

  const count = await Banner.countDocuments({ ...keyword })
  const banners = await Banner.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ banners, page, pages: Math.ceil(count / pageSize) })
})

// @desc Fetch single banner
// @desc GET /api/banner/:id
// @access Public

const getBannerById = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id)
  if (banner) {
    res.json(banner)
  } else {
    res.status(404)
    throw new Error('Banner not found')
  }
})

// @desc Delete a banner
// @desc DELETE /api/banner/:id
// @access Private/Admin

const deleteBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id)
  if (banner) {
    await banner.remove()
    res.json({ message: 'Banner removed' })
  } else {
    res.status(404)
    throw new Error('Banner not found')
  }
})

// @desc Create a Banner
// @desc POST /api/banner
// @access Private/Admin

const createBanner = asyncHandler(async (req, res) => {
  const banner = new Banner({
    user: req.user._id,
    bannerTitle: '',
    image: '',
    category: '',
  })

  const createdBanner = await banner.save()
  res.status(201).json(createdBanner)
})

// @desc    Update a banner
// @route   PUT /api/banner/:id
// @access  Private/Admin
const updateBanner = asyncHandler(async (req, res) => {
  const { bannerTitle, image, category } = req.body
  const user = req.user._id

  const banner = await Banner.findById(req.params.id)

  if (banner) {
    banner.user = user
    banner.bannerTitle = bannerTitle
    banner.image = image
    banner.category = category

    const updatedBanner = await banner.save()
    res.json(updatedBanner)
  } else {
    res.status(404)
    throw new Error('Banner not found')
  }
})

export { createBanner, getBanner, getBannerById, deleteBanner, updateBanner }
