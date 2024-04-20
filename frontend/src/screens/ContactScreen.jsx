import React, { useState, useLayoutEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { sendContactFormAction } from '../actions/contactActions'

const ContactScreen = () => {
  const x = import.meta.env.VITE_PASSWORD_GROUP_ONE
  const y = import.meta.env.VITE_PASSWORD_GROUP_TWO

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordGroupOne, setPasswordGroupOne] = useState(x)
  const [passwordGroupTwo, setPasswordGroupTwo] = useState(y)

  const [message, setMessage] = useState(null)
  const [messageSuccess, setMessageSuccess] = useState(null)

  const dispatch = useDispatch()

  const forgotPassword = useSelector((state) => state.forgotPassword)
  const { loading, error } = forgotPassword

  useLayoutEffect(() => {
    window.scrollTo(0, 200)
  })

  const contactForm = {
    name,
    email,
    subject,
    emailMessage,
  }
  const submitHandler = (e) => {
    e.preventDefault()
    if (passwordGroupOne !== x || passwordGroupTwo !== y) {
      setMessage('Neodesláno! Kontaktujte nás telefonicky nebo emailem, prosím')
      setName('')
      setEmail('')
      setSubject('')
      setEmailMessage('')
    } else {
      dispatch(sendContactFormAction(contactForm))
      setMessageSuccess('Zpráva úspěšně odeslána')
      setName('')
      setEmail('')
      setSubject('')
      setEmailMessage('')
    }
  }

  return (
    <>
      <FormContainer>
        <h1>Napište nám zprávu</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {messageSuccess && (
          <Message variant='success'>{messageSuccess}</Message>
        )}

        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>
              Jméno a příjmení<sup>*</sup>
            </Form.Label>
            <Form.Control
              required
              type='name'
              placeholder='Jméno a příjmení'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>
              E-mail<sup>*</sup>
            </Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='E-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='subject'>
            <Form.Label>Předmět</Form.Label>
            <Form.Control
              type='subject'
              placeholder='Předmět'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='message'>
            <Form.Label>
              Zpráva<sup>*</sup>
            </Form.Label>
            <Form.Control
              required
              as='textarea'
              rows={10}
              type='textarea'
              placeholder='Vaše zpráva'
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
            />
          </Form.Group>
          {/* passwords  */}
          <Form.Group controlId='password-one'>
            <Form.Control
              className='password-group'
              placeholder=''
              type='text'
              defaultValue={passwordGroupOne}
              onChange={(e) => setPasswordGroupOne(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password-two'>
            <Form.Control
              className='password-group'
              placeholder=''
              type='text'
              defaultValue={passwordGroupTwo}
              onChange={(e) => setPasswordGroupTwo(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='my-3 billing-flex'>
            <Form.Check type='checkbox' name='gdprCheck' required />
            <p className='agree-gdpr'>
              Souhlasím se zpracovaním osobních údajů
            </p>
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
            className='my-3 btn-blue rounded'
          >
            Odeslat{' '}
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ContactScreen
