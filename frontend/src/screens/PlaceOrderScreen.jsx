import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { removeFromAll } from '../actions/cartActions'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)

  // Calculate Prices

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  // DEFINE SHIPPING PRICE and TAX HERE
  cart.shippingPrice = 75
  // cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      if (cart.paymentMethod === 'Hotovost') {
        dispatch(removeFromAll())
      }
      navigate(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [navigate, success])

  // send by email
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  //const orderToEmailName = userInfo.name
  const orderEmailToEmail = userInfo.email

  const [message, setMessage] = useState(null)

  /* prod quantities TO update countInStock */
  let prodsQtys = {}
  cart.cartItems.map((item, index) => {
    const productId = cart.cartItems[index].product
    const productQty = Number(cart.cartItems[index].qty)
    return (prodsQtys[index] = { product: productId, qty: productQty })
  })

  let prodsDiscounts = {}
  cart.cartItems.map((item, index) => {
    const productId = cart.cartItems[index].product
    const productDiscount = Number(cart.cartItems[index].discount)
    return (prodsDiscounts[index] = {
      product: productId,
      discount: productDiscount,
    })
  })

  const [clicked, setClicked] = useState(false)

  const placeOrderhandler = () => {
    if (gdrpOrderChecked && tradeRulesOrderChecked) {
      setClicked(true)
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
          user: userInfo.name,
          name: cart.shippingAddress.name,
          email: orderEmailToEmail,
          qtys: prodsQtys,
          discounts: prodsDiscounts,
        })
      )
    } else {
      setMessage('Potvrďte souhlas níže')
    }
  }

  const [gdrpOrderChecked, setGdprOrderChecked] = useState(false)
  const handleGdprOrder = () => {
    setGdprOrderChecked(!gdrpOrderChecked)
  }

  const [tradeRulesOrderChecked, setTradeRulesOrderChecked] = useState(false)
  const handleTradeRulesOrder = () => {
    setTradeRulesOrderChecked(!tradeRulesOrderChecked)
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Link className='btn btn-back my-3' to='/payment'>
        Zpět na Způsob platby
      </Link>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Doručení</h2>
              <p>
                <strong>Příjemce: </strong>
                {cart.shippingAddress.name}, {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
              {cart.shippingAddress.billingName && (
                <div>
                  <h4>Fakturační údaje</h4>
                  <p>
                    {cart.shippingAddress.billingName},{' '}
                    {cart.shippingAddress.billingAddress},{' '}
                    {cart.shippingAddress.billingPostalCode},{' '}
                    {cart.shippingAddress.billingCity},{' '}
                    {cart.shippingAddress.billingCountry}{' '}
                    {cart.shippingAddress.billingICO && (
                      <span>
                        IČO:
                        {cart.shippingAddress.billingICO}
                      </span>
                    )}
                  </p>
                </div>
              )}
              {cart.shippingAddress.note && (
                <h5>Poznámka: {cart.shippingAddress.note}</h5>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Platba</h2>
              <strong>Způsob platby: </strong>

              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Objednané produkty: </h2>
              {cart.cartItems.length === 0 ? (
                <Message>Váš košík je prázdný</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
                          {item.discount > 0 ? (
                            <h5 className='place-order-discount'>
                              Zľava {item.discount}%
                            </h5>
                          ) : (
                            ''
                          )}
                        </Col>
                        <Col md={4} className='place-order-calc'>
                          {item.qty} x {''}
                          {item.price} Kč ={''} {item.qty * item.price} Kč
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
                    <div className='ml-auto'>{cart.itemsPrice} Kč</div>
                  </div>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <div className='cart-box-right'>
                    Poštovné a balné:
                    <div className='ml-auto'> {cart.shippingPrice} Kč</div>
                  </div>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <div className='cart-box-right'>
                    Celkem:
                    <div className='ml-auto'> {cart.totalPrice} Kč</div>
                  </div>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                <Form.Group className='billing-flex'>
                  <Form.Check
                    type='checkbox'
                    name='gdprCheck'
                    required
                    onChange={handleGdprOrder}
                  />
                  <p className='agree-gdpr-order'>
                    <a href='/safety-privacy' target='_blank'>
                      Souhlasím se zpracovaním osobních údajů
                    </a>
                  </p>
                </Form.Group>
                <Form.Group className='billing-flex'>
                  <Form.Check
                    type='checkbox'
                    name='tradeRulesCheck'
                    required
                    onChange={handleTradeRulesOrder}
                  />
                  <p className='agree-traderules-order'>
                    <a href='/trade-rules' target='_blank'>
                      Souhlasím s obchodními podmínkami
                    </a>
                  </p>
                </Form.Group>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block w-100 btn-blue'
                  disabled={cart.items === 0 || clicked}
                  onClick={placeOrderhandler}
                >
                  Závazně objednat
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
