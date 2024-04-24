import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  payOrderStripe,
  deliverOrder,
  cancellOrder,
} from '../actions/orderActions'

import {
  ORDER_PAY_RESET,
  ORDER_LIST_MY_RESET,
} from '../constants/orderConstants'
import axios from 'axios'

import { removeFromAll } from '../actions/cartActions'

const OrderStripeSuccess = () => {
  const cart = useSelector((state) => state.cart)
  const [paidByStripe, setPaidByStripe] = useState(false)

  const dispatch = useDispatch()
  const params = useParams()
  const orderId = params.id
  const initId = params.init

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [initPaymentId, setInitPaymentId] = useState('')

  const configBearer = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }

  useEffect(() => {
    const getInitPaymentId = async (orderId) => {
      try {
        const { data } = await axios.get(
          `
          /api/orders/${orderId}/init-payment`,

          configBearer
        )

        setInitPaymentId(data)
      } catch (error) {
        console.log(error)
      }
    }

    getInitPaymentId(orderId)
    dispatch(removeFromAll())
  }, [orderId])

  const navigate = useNavigate()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  if (!loading) {
    // Calculate Prices
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    )
  }

  let shippingPrice = 75
  

  //useEffect becomes shorter
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    if (!order || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    }

    if (initId === initPaymentId) {
      dispatch(payOrderStripe(order))
    }
  }, [dispatch, order, orderId, navigate, userInfo])

  const newOrderHandler = () => {
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: ORDER_LIST_MY_RESET })
    document.location.href = '/'
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

              <Message variant='success'>Zaplaceno Stripe</Message>
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
                        <Col className='place-order-calc' md={4}>
                          {item.qty} x {''}
                          {item.price} Kč = {item.qty * item.price} Kč
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
                    <div className='ml-auto'>{order.itemsPrice} Kč</div>
                  </div>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <div className='cart-box-right'>
                    Poštovné a balné:
                    <div className='ml-auto'> {order.shippingPrice} Kč</div>
                  </div>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <div className='cart-box-right'>
                    Celkem:
                    <div className='ml-auto'> {order.totalPrice} Kč</div>
                  </div>
                </Row>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item> */}

              <ListGroup.Item>
                <Button
                  className='w-100 btn-blue'
                  onClick={() => newOrderHandler()}
                >
                  Vytvořit novou objednávku
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderStripeSuccess
