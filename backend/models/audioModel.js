import mongoose from 'mongoose'

const audioSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    audioTitle: {
      type: String,
    },
    mp3file: {
      type: String,
    },
    category: {
      type: String,
    },
    subcategory: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Audio = mongoose.model('Audio', audioSchema)

export default Audio
