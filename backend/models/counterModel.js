import mongoose from 'mongoose'

const counterSchema = mongoose.Schema(
  {
    visitorsCount: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
)

const Counter = mongoose.model('Counter', counterSchema)

export default Counter
