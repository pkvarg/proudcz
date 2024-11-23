import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Email from '../utils/email.js'
import generateToken from '../utils/generateToken.js'
import crypto from 'crypto'

const forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email })
  const id = user._id

  const email = user.email
  const origURL = req.body.origURL

  if (!user) {
    res.status(404)
    throw new Error('There is no user with email address.')
  }

  // 2) Generate and save the reset token
  const token = crypto.randomBytes(32).toString('hex')
  const resetToken = crypto.createHash('sha256').update(token).digest('hex')

  user.passwordResetToken = resetToken

  await user.save({ validateBeforeSave: false })
  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://${origURL}/reset-password/${email}/${id}/${resetToken}`

    await new Email(user, resetURL).sendPasswordReset()

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    })
  } catch (err) {
    user.passwordResetToken = undefined

    await user.save({ validateBeforeSave: false })

    return next(
      Error('There was an error sending the email. Try again later!'),
      500
    )
  }
})

const checkResetToken = asyncHandler(async (req, res) => {
  console.log('here')
  const { email, id, token } = req.params
  const user = await User.findOne({
    email,
  })

  const userToken = generateToken(id)
  const name = user.name

  const checkToken = user.passwordResetToken === token

  if (checkToken) {
    res.json({ userToken, name })
  } else {
    res.json({ message: 'Neplatný link! Zkuste obnovu hesla znovu.' })
  }
})

export default { forgotPassword, checkResetToken }
