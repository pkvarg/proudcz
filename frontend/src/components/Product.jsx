import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { addDecimals } from '../functions'

const Product = ({ product }) => {
  return (
    <div className='my-3 p-3'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={`${product.image}`}
          variant='top'
          className='product-img-card-width'
        />
      </Link>
      <Card.Body className='product-home-info'>
        <Link to={`/product/${product._id}`} className='no-underline'>
          <Card.Title as='div' className='product-home-name'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <div className='product-home-price'>
          {product.discount ? (
            <h5 className='discounted-price'>
              <span className='discounted-price-span'>
                Zľava {product.discount}%
              </span>
              {addDecimals(product.discountedPrice)}€
            </h5>
          ) : (
            <h4>{addDecimals(product.price).replace('.', ',')}€</h4>
          )}
        </div>
      </Card.Body>
    </div>
  )
}

export default Product
