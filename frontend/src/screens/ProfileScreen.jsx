import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageSuccess, setMessageSuccess] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  // const location = useLocation()
  // const { search } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 200)
  })

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
        // G
        dispatch(listMyOrders())
      }
    }
  }, [dispatch, navigate, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Heslá nesúhlasia')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
      setMessageSuccess('Heslo úspešne zmenené')
    }
  }

  return (
    <>
      {/* <Link
        className='btn btn-back my-3'
        onClick={() => navigate(-1)}
      >
        Zpět
      </Link> */}
      <Row>
        <Col md={3}>
          <h2>Můj profil</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {messageSuccess && (
            <Message variant='success'>{messageSuccess}</Message>
          )}

          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>Profil upravený</Message>}

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
              <Form.Label>Email</Form.Label>
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
            <Button type='submit' className='my-5 btn-blue rounded'>
              Upravit profil
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>Moje objednávky</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{error.orders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ČÍSLO</th>
                  <th>DATUM</th>
                  <th>CELKEM KČ</th>
                  <th>ZAPLACENO</th>
                  <th>ODESLÁNO</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderNumber}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Detaily
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProfileScreen
