import mongoose from 'mongoose'

const videoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    videoTitle: {
      type: String,
    },
    code: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Video = mongoose.model('Video', videoSchema)

export default Video
