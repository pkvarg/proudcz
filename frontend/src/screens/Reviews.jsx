import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import PaginateLibrary from '../components/PaginateLibrary'

import {
  listProducts,
  acknowledgeProductReview,
  deleteProductReview,
} from '../actions/productActions'
import { useNavigate } from 'react-router-dom'

const Reviews = () => {
  const params = useParams()
  const pageNumber = params.pageNumber || 1
  const pageSize = 10
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productList = useSelector((state) => state.productList)
  const { products, page, pages } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const deleteHandler = (product, comment) => {
    if (window.confirm('Odstrániť recenziu? Ste si istý?')) {
      dispatch(deleteProductReview(product, comment))
      document.location.href = `/admin/reviews`
    }
  }

  const acknowledgeHandler = (productId, comment) => {
    dispatch(acknowledgeProductReview(productId, comment))
    document.location.href = `/admin/reviews`
    alert('Recenzia schválená')
  }

  useEffect(() => {
    dispatch(listProducts('', pageNumber, pageSize))
  }, [dispatch, userInfo, navigate, pageNumber])

  let hasReviews = []

  products.map((product) => {
    if (product.reviews.length > 0) return hasReviews.push(product)
    else return product
  })

  return (
    <>
      {hasReviews.map((product) => (
        <div key={product._id}>
          <h2 className='manage-single-review-title'>Titul: {product.name}</h2>
          {product.reviews.map((review) => (
            <div
              key={review._id}
              className={
                review.isAcknowledged
                  ? 'manage-single-review green'
                  : 'manage-single-review red'
              }
            >
              <div className='manage-single-review-comment'>
                <p>{review.comment}</p>
                <p>{review.name}</p>
                <p key='2'>{review.createdAt.substring(0, 10)}</p>
                <p key='3' className='manage-single-review-isAck'>
                  {review.isAcknowledged ? 'Schválená' : 'Neschválená'}
                </p>
              </div>
              <div className='manage-single-review-buttons'>
                <Link
                  to={`/product/${product._id}`}
                  className='manage-single-review-link'
                >
                  Na produkt
                </Link>
                <button
                  key='4'
                  className='btn-blue reviews'
                  onClick={() =>
                    acknowledgeHandler(product._id, review.comment)
                  }
                >
                  Schválit recenzi
                </button>
                <button
                  key='5'
                  className='btn-red reviews'
                  onClick={() => deleteHandler(product, review.comment)}
                >
                  Smazat
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default Reviews
