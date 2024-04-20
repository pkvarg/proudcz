import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { addDecimals } from '../functions'
import * as Icon from 'react-bootstrap-icons'

const CartScreen = () => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const productId = params.id
  const qty = new URLSearchParams(location.search).get('qty')
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    navigate('/cart')
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  const continueShopping = () => {
    navigate('/')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Nákupní košík</h1>
        {cartItems.length === 0 ? (
          <Message>
            Váš košík je prázdný{' '}
            <Link to='/' className='cart-empty-back-link'>
              Zpět
            </Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className='cart-prod-left no-mobile'>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3} className='cart-prod-off'>
                    <Link
                      to={`/product/${item.product}`}
                      className='no-underline '
                    >
                      {item.name}
                    </Link>
                  </Col>

                  <Col md={2}>
                    {' '}
                    {addDecimals(item.price).replace('.', ',')} €
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <Icon.Trash3 size={20} />
                    </Button>
                  </Col>
                </Row>
                <Row className='cart-prod-left mobile-only'>
                  <Col md={2} className='cart-mob-img'>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} className='cart-prod-off'>
                    <Link
                      to={`/product/${item.product}`}
                      className='no-underline '
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <div className='cart-mob-three-row'>
                    <Col md={2}>
                      {' '}
                      {addDecimals(item.price).replace('.', ',')} €
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </div>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Položiek (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
              </h2>
              <div className='cart-box-right'>
                Produkty:{' '}
                <div className='ml-auto'>
                  {cartItems
                    .reduce(
                      (acc, item) => acc + Number(item.qty * item.price),
                      0
                    )
                    .toFixed(2)
                    .replace('.', ',')}{' '}
                  €
                </div>
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  <div className='cart-box-right'>
                    Poštovné:{' '}
                    <div className='ml-auto'>
                      {cartItems
                        .reduce(
                          (acc, item) => acc + Number(item.qty * item.price),
                          0
                        )
                        .toFixed(2)
                        .replace('.', ',') > 100
                        ? 0
                        : addDecimals(3.5).replace('.', ',')}{' '}
                      €
                    </div>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <div className='cart-box-right'>
                    Celkem:{' '}
                    <div className='ml-auto'>
                      {addDecimals(
                        Number(
                          cartItems.reduce(
                            (acc, item) => acc + Number(item.qty * item.price),
                            0
                          )
                        ) +
                          Number(
                            cartItems.reduce(
                              (acc, item) =>
                                acc + Number(item.qty * item.price),
                              0
                            ) > 100
                              ? 0
                              : 3.5
                          )
                      ).replace('.', ',')}{' '}
                      €
                    </div>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
            {cartItems.length > 0 && (
              <ListGroup.Item>
                <Button
                  type='button'
                  className='w-100 btn-red'
                  disabled={cartItems.lenght === 0}
                  onClick={checkoutHandler}
                >
                  Přejít k pokladně
                </Button>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button
                onClick={continueShopping}
                className='w-100 btn-blue'
                type='button'
              >
                Pokračovat v nákupu
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
