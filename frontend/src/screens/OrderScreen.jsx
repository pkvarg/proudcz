import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
  // ListGroupItem,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  // deleteOrder,
  deliverOrder,
  cancellOrder,
  // createOrder,
} from '../actions/orderActions'

import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_CANCELL_RESET,
  ORDER_LIST_MY_RESET,
} from '../constants/orderConstants'
import { loadStripe } from '@stripe/stripe-js'
import { addDecimals } from '../functions'

const OrderScreen = () => {
  const stripeApiKey = import.meta.env.VITE_STRIPE_API_KEY

  const stripePromise = loadStripe(stripeApiKey)

  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  const params = useParams()
  const locationOrder = useLocation()

  const navigate = useNavigate()
  const [paidByStripe, setPaidByStripe] = useState(false)
  const orderId = params.id

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const orderCancell = useSelector((state) => state.orderCancell)
  const { success: successCancell } = orderCancell

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  //const userDetails = useSelector((state) => state.userDetails)
  // const {  user } = userDetails

  const orderDelete = useSelector((state) => state.orderDelete)
  const { success: successDelete } = orderDelete

  // const deleteOrderHandler = (id) => {
  //   if (window.confirm('Ste si istý?')) {
  //     dispatch(deleteOrder(id))
  //     navigate('/admin/orderlist')
  //   }
  // }

  if (!loading) {
    // Calculate Prices
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  let shippingPrice
  order?.totalPrice > 100 ? (shippingPrice = 0) : (shippingPrice = 3.5)

  //useEffect becomes shorter
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    if (!order || order._id !== orderId || successPay || paidByStripe) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    }
    if (
      !order ||
      successPay ||
      successDeliver ||
      successCancell ||
      order._id !== orderId
    ) {
      //     dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_CANCELL_RESET })

      dispatch(getOrderDetails(orderId))
    }
  }, [
    dispatch,
    order,
    orderId,
    successPay,
    successDelete,
    successDeliver,
    successCancell,
    navigate,
    userInfo,
  ])

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: order.totalPrice },
        },
      ],
    })
  }

  const successPaymentHandler = (data, actions) => {
    return actions.order.capture().then((details) => {
      dispatch(payOrder(orderId, details))
    })
  }

  // const successPaymentHandler = (paymentResult) => {
  //   console.log(paymentResult)
  //   dispatch(payOrder(orderId, paymentResult))
  // }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  const cancellHandler = () => {
    dispatch(cancellOrder(order))
  }

  const newOrderHandler = () => {
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: ORDER_LIST_MY_RESET })
    document.location.href = '/'
  }

  const ps = cart.cartItems.map((item) => ({
    name: item.name,
    qty: item.qty,
    price: item.price,
  }))

  // STRIPE PAYMENT

  const configBearer = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }

  const makePayment = async () => {
    console.log('clicked stripe')
    // create a unique init payment ID in db

    if (order._id) {
      try {
        const { data } = await axios.put(
          `/api/orders/${order._id}/init-payment`,
          {},
          configBearer
        )

        // setInitPaymentId(data.initPaymentId);

        // Proceed with Stripe checkout session creation only after initPaymentId is set
        const stripe = await stripePromise
        const requestBody = {
          userName: userInfo.name,
          email: userInfo.email,
          products: ps,
          url: locationOrder,
          initPaymentId: data.initPaymentId, // Use the retrieved initPaymentId
          shippingPrice,
        }

        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }

        const response = await axios.post(
          '/api/create-stripe-checkout-session',
          { requestBody },
          config
        )

        //console.log('resp', response.data.id)

        //window.location.href = response.data
        const session = await response.data
        await stripe.redirectToCheckout({
          sessionId: session.id,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Objednávka {order.orderNumber}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Doručovací adresa</h2>
              <p>
                <strong>Jméno: </strong> {order.name}
              </p>
              <p>
                <strong>E-mail: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Adresa: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {cart.shippingAddress.billingName && (
                <div>
                  <h4>Fakturační údaje</h4>
                  <p>
                    {cart.shippingAddress.billingName},{' '}
                    {cart.shippingAddress.billingAddress},{' '}
                    {cart.shippingAddress.billingPostalCode},{' '}
                    {cart.shippingAddress.billingCity},{' '}
                    {cart.shippingAddress.billingCountry}
                    {cart.shippingAddress.billingICO && (
                      <div>
                        IČO:
                        {cart.shippingAddress.billingICO}, DIČ:
                        {cart.shippingAddress.billingDIC}
                      </div>
                    )}
                  </p>
                </div>
              )}
              {cart.shippingAddress.note && (
                <h5>Poznámka: {cart.shippingAddress.note}</h5>
              )}

              <h2>Stav objednávky</h2>

              {order.isDelivered ? (
                <Message variant='success'>
                  Odesláno {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Neodesláno</Message>
              )}
              {order.isCancelled && (
                <Message variant='danger'>Zrušená!</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Platba</h2>
              <p>
                <strong>Způsob: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid && (
                <Message variant='success'>Zaplaceno {order.paidAt}</Message>
              )}
              {order.paymentMethod !== 'Stripe' && !order.isPaid && (
                <Message variant='danger'>
                  Nezaplaceno
                  {/* {userInfo.isAdmin && (
                    <Button
                      variant='danger'
                      className='w-100'
                      onClick={() => deleteOrderHandler(order._id)}
                    >
                      ADMIN: Zmazať objednávku
                    </Button>
                  )} */}
                </Message>
              )}

              {paidByStripe && (
                <Message variant='success'>Zaplaceno Stripe</Message>
              )}
              {order.paymentMethod === 'Stripe' &&
                !paidByStripe &&
                !order.isPaid && (
                  <Message variant='danger'>
                    Nezaplaceno
                    {/* {userInfo.isAdmin && (
                    <Button
                      variant='danger'
                      className='w-100'
                      onClick={() => deleteOrderHandler(order._id)}
                    >
                      ADMIN: Zmazať objednávku
                    </Button>
                  )} */}
                  </Message>
                )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Objednané produkty: </h2>
              {order.orderItems.length === 0 ? (
                <Message>Objednávka neobsahuje žádné produkty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className='items-center'>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            className='no-underline'
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                          {order.discounts[index].discount > 0 && (
                            <h5 className='place-order-discount'>
                              Sleva
                              {order.discounts[index].discount}%
                            </h5>
                          )}
                        </Col>
                        <Col md={4} className='place-order-calc'>
                          {item.qty} x {''}
                          {item.price.toFixed(2).replace('.', ',')} € ={' '}
                          {(item.qty * item.price).toFixed(2).replace('.', ',')}{' '}
                          €
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Souhrn objednávky</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className=''>
                  <div className='cart-box-right'>
                    Produkty:
                    <div className='ml-auto'>
                      {order.itemsPrice.replace('.', ',')} €
                    </div>
                  </div>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <div className='cart-box-right'>
                    Poštovné:
                    <div className='ml-auto'>
                      {' '}
                      {addDecimals(order.shippingPrice).replace('.', ',')} €
                    </div>
                  </div>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <div className='cart-box-right'>
                    Celkom:
                    <div className='ml-auto'>
                      {' '}
                      {addDecimals(order.totalPrice).replace('.', ',')} €
                    </div>
                  </div>
                </Row>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item> */}
              {!order.isPaid && order.paymentMethod === 'Stripe' && (
                <ListGroupItem>
                  <Button
                    className='btn w-100 btn-success'
                    onClick={() => makePayment()}
                  >
                    Platba Stripe
                  </Button>
                </ListGroupItem>
              )}

              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    typ='button'
                    className='btn w-100 btn-red'
                    onClick={deliverHandler}
                  >
                    Označit jako odeslané
                  </Button>
                </ListGroup.Item>
              )}
              {userInfo &&
                userInfo.isAdmin &&
                !order.isCancelled &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      typ='button'
                      className='btn w-100 btn-danger btn-red'
                      onClick={cancellHandler}
                    >
                      Zrušit objednávku
                    </Button>
                  </ListGroup.Item>
                )}
              <ListGroup.Item>
                <Button
                  className='w-100 btn-blue'
                  onClick={() => newOrderHandler()}
                >
                  Vytvořit novoú objednávku
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
