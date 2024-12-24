import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, paymentMethod } = cart
  const navigate = useNavigate()

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [method, setMethod] = useState('')

  useEffect(() => setMethod(paymentMethod), [paymentMethod])

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    if (!method) {
      alert('Vyberte prosím způsob platby.')
      return
    }
    dispatch(savePaymentMethod(method))
    navigate('/placeorder')
  }

  return (
    <>
      <Link className="btn btn-back my-3" to="/shipping">
        Zpět na informace o doručení
      </Link>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <h1>Způsob platby</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Vyberte způsob platby</Form.Label>
            {shippingAddress.country === 'Česká republika' ? (
              <Col>
                <Form.Check
                  type="radio"
                  label="Platba kartou Stripe / Google Pay"
                  id="Stripe"
                  name="paymentMethod"
                  value="Stripe"
                  checked={method === 'Stripe'}
                  onChange={(e) => setMethod(e.target.value)}
                ></Form.Check>
                <Form.Check
                  type="radio"
                  label="Platba bankovním převodem předem"
                  id="Bank"
                  name="paymentMethod"
                  value="Platba bankovním převodem předem"
                  checked={method === 'Platba bankovním převodem předem'}
                  onChange={(e) => setMethod(e.target.value)}
                ></Form.Check>
                <Form.Check
                  type="radio"
                  label="Hotovost při převzetí"
                  id="Cash"
                  name="paymentMethod"
                  value="Hotovost"
                  checked={method === 'Hotovost'}
                  onChange={(e) => setMethod(e.target.value)}
                ></Form.Check>
              </Col>
            ) : (
              <Form.Check
                type="radio"
                label="Platba bankovním převodem předem"
                id="Bank"
                name="paymentMethod"
                value="Platba bankovním převodem předem"
                checked={method == 'Platba bankovním převodem předem'}
                onChange={(e) => setMethod(e.target.value)}
              ></Form.Check>
            )}
          </Form.Group>
          <Button type="submit" className="my-3 btn-blue rounded">
            Pokračovat
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
