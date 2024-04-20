import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login, getGoogleUserInfo } from '../actions/userActions'

import { auth, provider } from './../App'
import { signInWithPopup } from 'firebase/auth'
import { GoogleButton } from 'react-google-button'

const LoginScreen = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const [user, setUser] = useState({})

  const handleSignOut = (event) => {
    setUser({})
    localStorage.removeItem('userInfo')
  }

  // Google Firebase
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      let userObject = result.user
      setUser(userObject)
      const data = {
        name: userObject.displayName,
        email: userObject.email,
        googleId: userObject.uid,

        isAdmin: false,
      }

      dispatch(getGoogleUserInfo(data))
    })
  }

  const handleGoogleSignIn = () => {
    try {
      signInWithGoogle()
    } catch (error) {
      console.log(error)
    }
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
        <GoogleButton onClick={handleGoogleSignIn} />

        {/* {user && (
          <div className=''>
            <img src={user.picture} alt={user.picture}></img>
            <h3>{user.name}</h3>
          </div>
        )} */}

        {Object.keys(user).length !== 0 && (
          <Button
            className='my-1'
            variant='primary'
            onClick={(e) => handleSignOut(e)}
          >
            Google Sign Out
          </Button>
        )}
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
