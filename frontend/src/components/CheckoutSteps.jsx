import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='jusitfy-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Přihlášení</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Přihlášení</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Doručení</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Doručení</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Platba</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Platba</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Objednat</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Objednat</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
