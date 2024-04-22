import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import GoogleSignIn from '../components/GoogleSignIn'

const LoginScreen = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const goToProfile = location.pathname.includes('profile')

  useEffect(() => {
    if (userInfo && goToProfile) {
      navigate('/profile')
    } else if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect, goToProfile])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const [user, setUser] = useState({})

  const handleSignOut = (event) => {
    setUser({})
    localStorage.removeItem('userInfo')
  }

  return (
    <FormContainer>
      <h1>Přihlásení</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Váš e-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Heslo</Form.Label>
          <Form.Control
            type='password'
            placeholder='Vaše heslo'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type='submit'
          variant='primary'
          className='my-5 btn-blue rounded'
        >
          Přihlásit se
        </Button>

        <Row className='py-3 sign-in-forgot'>
          <Col>
            <Link
              to={
                redirect
                  ? `/forgot-password?redirect=${redirect}`
                  : '/forgot-password'
              }
            >
              Zapomněli jste heslo?
            </Link>
          </Col>
        </Row>
        <h2 className='my-3'>Přihlásit se účtem Google</h2>
        <GoogleSignIn />
      </Form>

      <Row className='my-5 sign-in-forgot'>
        <Col>
          Nový zákazník?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Zaregistrujte se
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
