import crypto from 'crypto'

export default async function createRegisterToken(email, url) {
  const token = crypto.randomBytes(32).toString('hex')
  const registerToken = crypto.createHash('sha256').update(token).digest('hex')

  // const date = new Date()
  // const expiryDate = new Date(date.getTime() + 15 * 60000)
  // const registerTokenExpires = expiryDate.toISOString().replace('Z', '+00:00')
  const encodedEmail = encodeURIComponent(email)

  const registerURL = `${url}/registerLink/${encodedEmail}/${registerToken}`

  const data = {
    registerToken,
    registerURL,
  }

  return data
}
