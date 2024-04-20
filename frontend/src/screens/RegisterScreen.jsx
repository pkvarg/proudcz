import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import GoogleSignIn from '../components/GoogleSignIn'

const RegisterScreen = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister
  const location = useLocation()
  // const { search } = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Hesla nesouhlasí')
    } else {
      dispatch(register(name, email, password))
      setMessage(
        `Registrační link Vám byl odeslán na ${email}. Potvrďte prosím svoji registraci kliknutím na přijatý link.`
      )
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      window.scrollTo(0, 200)
    }
  }

  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Zpět
      </Link>

      <FormContainer>
        <h1>Zaregistrujte se</h1>
        {message && <Message variant='danger'>{message}</Message>}

        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Jméno a příjmení</Form.Label>
            <Form.Control
              type='name'
              placeholder='Jméno a příjmení'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type='email'
              placeholder='E-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Heslo</Form.Label>
            <Form.Control
              type='password'
              placeholder='Heslo'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Potvrďte heslo</Form.Label>
            <Form.Control
              type='password'
              placeholder='Potvrďte heslo'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type='submit'
            variant='primary'
            className='my-5 btn-blue rounded'
          >
            Registrovat
          </Button>
        </Form>

        <h2 className='my-3'>Registrace účtem Google</h2>
        <GoogleSignIn />

        <Row className='py-3 sign-in-forgot'>
          <Col>
            Už máte u nás účet?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Přihlašte se
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default RegisterScreen
