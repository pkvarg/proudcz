import React, { useEffect, useLayoutEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { listAllProducts } from '../actions/productActions'
import * as Icon from 'react-bootstrap-icons'

const LibraryExcerpt = () => {
  const params = useParams()
  const productId = params.id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector((state) => state.productList)
  const { products } = productList

  useLayoutEffect(() => {
    window.scrollTo(0, 250)
  })

  useEffect(() => {
    dispatch(listAllProducts())
  }, [dispatch])

  return (
    <>
      <Link className='btn btn-back my-3' onClick={() => navigate(-1)}>
        Zpět
      </Link>

      <div className='my-3'>
        {products.map(
          (product) =>
            product._id === productId && (
              <Col key={product._id}>
                <>
                  <h1>{product.name}</h1>
                  <Link to={`/product/${product._id}`}>
                    <Image
                      src={product.excerpt.image}
                      alt={product.name}
                      className='prod-img-excerpt-excerpt'
                    ></Image>
                  </Link>
                  <p className='prod-excerpt-excerpt'>
                    {product.excerpt.excerpt}
                  </p>
                </>
              </Col>
            )
        )}
        <button
          className='scroll-up'
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }}
        >
          <Icon.ArrowUp />
        </button>
      </div>
    </>
  )
}

export default LibraryExcerpt
