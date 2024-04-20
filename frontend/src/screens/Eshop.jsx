import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader'
import { listAllProducts } from '../actions/productActions'
import Product from '../components/Product'

const Eshop = () => {
  const params = useParams()
  const category = params.category
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  useEffect(() => {
    dispatch(listAllProducts())
  }, [dispatch])

  return (
    <>
      <div className=''>
        <h1 className='new-publications'>Eshop</h1>
        {/* <h4 className='eshop-category'>
          {category.replace('-', ' ').replace('-', ' ').replace('-', ' ')}
        </h4> */}
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {/* <Row className='eshop-row-mobile'>
            {category !== 'abecedný-zoznam-kníh'
              ? products.map(
                  (product) =>
                    product.category === category && (
                      <>
                        <Col
                          className='
            align-items-stretch d-flex no-mobile
            '
                          key={product._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={product} />
                        </Col>

                        <Col
                          className='
                      align-items-stretch mobile-only
                      '
                          key={product._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={product} />
                        </Col>
                      </>
                    )
                )
              : products.map((product) => (
                  <Link
                    className='eshop-link'
                    to={`/product/${product._id}`}
                    key={product._id}
                  >
                    <p className='eshop-mobile-link' key={product._id}>
                      {product.name}
                    </p>
                  </Link>
                ))}
          </Row> */}
          <Row className='eshop-abc'>
            <h4 className='eshop-abc-frame'>
              {category.replace('-', ' ').replace('-', ' ').replace('-', ' ')}
            </h4>
            {category !== 'abecedný-zoznam-kníh'
              ? products.map(
                  (product) =>
                    product.category === category && (
                      <>
                        <Col
                          className='
            align-items-stretch d-flex no-mobile
            '
                          key={product._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={product} />
                        </Col>

                        <Col
                          className='
                      align-items-stretch mobile-only
                      '
                          key={product._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={product} />
                        </Col>
                      </>
                    )
                )
              : products.map((product) => (
                  <Link
                    className='eshop-abc-product'
                    to={`/product/${product._id}`}
                    key={product._id}
                  >
                    <p className='eshop-mobile-link' key={product._id}>
                      {product.name}
                    </p>
                  </Link>
                ))}
          </Row>
        </>
      )}
    </>
  )
}

export default Eshop
