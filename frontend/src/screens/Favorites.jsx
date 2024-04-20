import React, { useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import { listProducts, removeFromFavorites } from '../actions/productActions'
import { useNavigate } from 'react-router-dom'
import Product from '../components/Product'
// import PaginateLibrary from '../components/Paginate'

const Favorites = () => {
  const params = useParams()
  const pageNumber = params.pageNumber || 1
  const pageSize = 80
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productList = useSelector((state) => state.productList)
  const { products } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listProducts('', pageNumber, pageSize))
  }, [dispatch, userInfo, navigate, pageNumber])

  let favoriteProducts = []

  // unique Set

  let favoriteProductsSet = new Set()
  if (userInfo) {
    products.map((prod) => {
      return prod.favoriteOf.map(
        (fav) => fav._id === userInfo._id && favoriteProductsSet.add(prod)
      )
    })

    // back to Array
    favoriteProducts = Array.from(favoriteProductsSet)
  }

  // Remove from Favs !!!

  const removeFromFavoritesHandler = (productId) => {
    dispatch(removeFromFavorites(productId, userInfo._id))
    document.location.href = `/favorites`
  }

  return (
    <>
      <h1>Moje oblíbené produkty</h1>
      <Row>
        <>
          {favoriteProducts.length > 0 ? (
            favoriteProducts.map((product) => (
              <>
                <Col
                  className='
              align-items-stretch d-flex 
              '
                  key={product._id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <div className='prod-and-button'>
                    <Button
                      onClick={() => removeFromFavoritesHandler(product._id)}
                      className='remove-from-favorites-button'
                    >
                      X
                    </Button>
                  </div>
                  <Product product={product} />
                </Col>
              </>
            ))
          ) : (
            <h4>Nemáte žádné oblíbené produkty</h4>
          )}
          {!userInfo && (
            <Link to='/login' className='my-3 favorites-login'>
              <h5>Přihlásit se</h5>
            </Link>
          )}
        </>
      </Row>

      {/* <PaginateLibrary
        pages={pages}
        page={page}
        keyword={'library'}
      ></PaginateLibrary> */}
    </>
  )
}

export default Favorites
