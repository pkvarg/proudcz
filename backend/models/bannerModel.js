import mongoose from 'mongoose'

const bannerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    bannerTitle: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Banner = mongoose.model('Banner', bannerSchema)

export default Banner
