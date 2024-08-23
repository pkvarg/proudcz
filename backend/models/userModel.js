import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    isRegistered: {
      type: Boolean,
      required: true,
      default: false,
    },
    registerToken: {
      type: String,
      required: false,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAssistant: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    isUnsubscribed: {
      type: Boolean,
      default: false,
    },
    // favorites: [favoritesSchema],

    googleId: {
      type: String,
    },
    passwordChangedAt: Date,

    passwordResetToken: String,
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
