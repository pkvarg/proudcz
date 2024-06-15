import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'
import { listAllProducts } from '../actions/productActions'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'

const NewBooks = () => {
  const params = useParams()
  const year = params.year
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProductDetails(year))
  }, [dispatch, year])

  const productList = useSelector((state) => state.productList)
  const { products } = productList
  useEffect(() => {
    dispatch(listAllProducts())
  }, [dispatch])

  let byYear = []

  products.map((product) => {
    if (product.year === year) return byYear.push(product)
    else return product
  })

  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Zpět
      </Link>
      <div>
        <h1>Knihy {year}</h1>
        <Row>
          {byYear.map((product) => (
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
          ))}
          {byYear.map((product) => (
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
          ))}
        </Row>
      </div>
    </>
  )
}

export default NewBooks
