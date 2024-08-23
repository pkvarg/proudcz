import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = () => {
  const params = useParams()
  const userId = params.id
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAssistant, setIsAssistant] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  console.log('userEditDetails', userDetails)

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
        setIsAssistant(user.isAssistant)
        setIsRegistered(user.isRegistered)
        setIsSubscribed(user.isSubscribed)
      }
    }
  }, [dispatch, navigate, userId, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
        isAssistant,
        isRegistered,
        isSubscribed,
      })
    )
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-back my-3'>
        Zpět
      </Link>
      <FormContainer>
        <h1>Upravit uživatele</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Meno</Form.Label>
              <Form.Control
                type='name'
                placeholder='Meno'
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

            <Form.Group controlId='isadmin'>
              <Form.Check
                className='my-3'
                type='checkbox'
                label='Admin?'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='isassistant'>
              <Form.Check
                className='my-2'
                type='checkbox'
                label='Asistent? (zaškrtnutím sa přístup omezí na Audio, Video a Bannery)'
                checked={isAssistant}
                onChange={(e) => setIsAssistant(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='isregistered'>
              <Form.Check
                className='my-2'
                type='checkbox'
                label='Dokončená registrace?'
                checked={isRegistered}
                onChange={(e) => setIsRegistered(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='isSubscribed'>
              <Form.Check
                className='my-2'
                type='checkbox'
                label='Odběratel novinek?'
                checked={isSubscribed}
                onChange={(e) => setIsSubscribed(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button
              className='my-5 btn-blue rounded'
              type='submit'
              variant='primary'
            >
              Upravit
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
