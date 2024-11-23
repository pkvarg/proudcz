import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import axios from 'axios'

const CompleteRegistration = () => {
  const { email, token } = useParams()
  const decodedEmail = decodeURIComponent(email)
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const goToLogin = () => {
    navigate('/login')
  }

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get(`/api/users/${email}/${token}`)

        if (res.data === 'ok') {
          setMessage('Registrace byla úspěšně dokončena! Můžete se přihlásit.')
          setTimeout(goToLogin, 3000)
        } else {
          setError(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    checkToken()
  }, [email, token])
  return (
    <div>
      {message && <Message variant='success'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
    </div>
  )
}

export default CompleteRegistration
