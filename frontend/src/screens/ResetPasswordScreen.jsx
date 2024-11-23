import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { resetPasswordAction } from '../actions/userActions'
import axios from 'axios'

const ResetPasswordScreen = () => {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageSuccess, setMessageSuccess] = useState(null)
  const [showReset, setShowReset] = useState(false)
  const [name, setName] = useState('')
  const [userToken, setUserToken] = useState('')

  const dispatch = useDispatch()

  const resetPassword = useSelector((state) => state.resetPassword)
  const { loading, error } = resetPassword
  const params = useParams()
  const token = params.token
  const email = params.email
  const id = params.id

  useEffect(() => {
    const checkResetToken = async () => {
      const { data } = await axios.get(
        `/api/auth/check-reset-token/${email}/${id}/${token}`,
        {}
      )
      console.log(data)
      if (data.message) {
        setMessage(data.message)
      } else {
        setShowReset(true)
        setName(data.name)
        setUserToken(data.userToken)
      }
    }
    checkResetToken()
  }, [email, id, token])

  const user = {
    name,
    id,
    email,
    password,
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Hesla se neshodují')
    } else {
      dispatch(resetPasswordAction(user, userToken))
      setMessageSuccess('Heslo bylo úspešně změněno')
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }

  return (
    <FormContainer>
      <h1>Změna hesla</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {messageSuccess && <Message variant='success'>{messageSuccess}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {showReset && (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='password'>
            <Form.Label>Nové heslo</Form.Label>
            <Form.Control
              type='password'
              placeholder='Zadajte heslo'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Potvrďte nové heslo</Form.Label>
            <Form.Control
              type='password'
              placeholder='Potvrďte nové heslo'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='my-3 btn-blue'>
            Změnit heslo
          </Button>
        </Form>
      )}
    </FormContainer>
  )
}

export default ResetPasswordScreen
