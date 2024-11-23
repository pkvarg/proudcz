import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { createDiscount } from '../actions/productActions'

const CreateDiscount = () => {
  const [discount, setDiscount] = useState('')
  const [messageSuccess, setMessageSuccess] = useState(null)

  const dispatch = useDispatch()

  const submitHandler = () => {
    dispatch(
      createDiscount({
        discount: discount,
      })
    )
    if (discount > 0) {
      setMessageSuccess(`Akcia vytvorená`)
    } else {
      setMessageSuccess(`Akcia zrušená`)
    }
  }

  console.log(discount)
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-back my-3'>
        Zpět
      </Link>
      <FormContainer>
        <h1>Nová akce na všechny produkty</h1>
        {messageSuccess && (
          <Message variant='success'>{messageSuccess}</Message>
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='discount-value'>
            <Form.Label>
              Výška akce bez %. Akci možno zrušit zadáním 0.
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='sleva'
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            className='my-5 btn-blue rounded'
            type='submit'
            variant='primary'
          >
            Vytvořit
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default CreateDiscount
