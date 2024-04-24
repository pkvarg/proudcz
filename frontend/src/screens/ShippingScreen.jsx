import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [name, setName] = useState(shippingAddress.name)

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  // Billing Address
  const [billingName, setBillingName] = useState(shippingAddress.billingName)

  const [billingAddress, setBillingAddress] = useState(
    shippingAddress.billingAddress
  )
  const [billingCity, setBillingCity] = useState(shippingAddress.billingCity)
  const [billingPostalCode, setBillingPostalCode] = useState(
    shippingAddress.billingPostalCode
  )
  const [billingCountry, setBillingCountry] = useState(
    shippingAddress.billingCountry
  )

  const [billingICO, setBillingICO] = useState(shippingAddress.billingICO)

  const [billingDIC, setBillingDIC] = useState(shippingAddress.billingDIC)
  const [note, setNote] = useState('')

  const dispatch = useDispatch('')
  const navigate = useNavigate('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        name,
        address,
        city,
        postalCode,
        country,
        billingName,
        billingAddress,
        billingCity,
        billingPostalCode,
        billingCountry,
        billingICO,
        billingDIC,
        note,
      })
    )
    navigate('/payment')
  }

  const [checked, setChecked] = useState(false)
  const handleChange = () => {
    setChecked(!checked)
  }
  const [checkedICO, setCheckedICO] = useState(false)
  const handleChangeICO = () => {
    setCheckedICO(!checkedICO)
  }

  return (
    <>
      <Link to='/cart' className='btn btn-back my-3'>
        Zpět
      </Link>

      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Doručení</h1>
        <h2>Doručovací adresa:</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>
              Jméno a příjmení<sup>*</sup>
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Jméno a příjmení'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='address'>
            <Form.Label>
              Adresa<sup>*</sup>
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Adresa'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='city'>
            <Form.Label>
              Mesto<sup>*</sup>
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Město'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='postalCode'>
            <Form.Label>
              PSČ<sup>*</sup>
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='PSČ'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='country'>
            <Form.Label>
              Štát<sup>*</sup>
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Stát'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='note'>
            <Form.Label>Poznámka</Form.Label>
            <Form.Control
              type='text'
              placeholder='Poznámka'
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-5 billing-flex'>
            <Form.Check
              type='checkbox'
              // aria-label='radio 1'
              name='billingCheck'
              onChange={handleChange}
            />
            <h2 className='billing-address-title-check'>
              Fakturační adresa se liší od doručovací
            </h2>
          </Form.Group>
          {checked ? (
            <div>
              <Form.Group controlId='billingName'>
                <Form.Label>Jméno a příjmení / Firma</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Jméno a příjmení / Firma'
                  value={billingName}
                  onChange={(e) => setBillingName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='billingAddress'>
                <Form.Label>Fakturační adresa</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Fakturačná adresa'
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='billingCity'>
                <Form.Label>Město</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Město'
                  value={billingCity}
                  onChange={(e) => setBillingCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='billingPostalCode'>
                <Form.Label>PSČ</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='PSČ'
                  value={billingPostalCode}
                  onChange={(e) => setBillingPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='billingCountry'>
                <Form.Label>Stát</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Stát'
                  value={billingCountry}
                  onChange={(e) => setBillingCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='billing-flex'>
                <Form.Check
                  type='checkbox'
                  name='billingCheck'
                  onChange={handleChangeICO}
                />
                <h2 className='my-5 billing-icodic-title-check'>IČO a DIČ</h2>
              </Form.Group>
              {checkedICO ? (
                <div>
                  <Form.Group controlId='billingICO'>
                    <Form.Label>IČO</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='IČO'
                      value={billingICO}
                      onChange={(e) => setBillingICO(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='billingDIC'>
                    <Form.Label>DIČ</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='DIČ'
                      value={billingDIC}
                      onChange={(e) => setBillingDIC(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}

          <Button type='submit' className='my-3 btn-blue rounded'>
            Pokračovat
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ShippingScreen
