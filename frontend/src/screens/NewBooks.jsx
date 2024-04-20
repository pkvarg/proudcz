import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'
import { listAllProducts } from '../actions/productActions'

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
        <div className='prods-by-year-container'>
          {byYear.map((product) => (
            <div className='prods-by-year'>
              {product.year === year && (
                <>
                  <Link to={`/product/${product._id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      className='prod-img-year-width'
                    ></Image>
                  </Link>
                  <h1 className='prods-name'>{product.name}</h1>
                  <h4 className='prods-desc'>Jazyk: {product.language}</h4>
                  <h4 className='prods-desc'>{product.binding}</h4>
                  <h4 className='prods-desc'>{product.pages} stran</h4>
                  <h4 className='prods-desc'>{product.isbn}</h4>
                  {product.language === 'SK' ? (
                    <Image
                      src='/images/flag_sk40px_0.png'
                      alt={product.name}
                      fluid
                    ></Image>
                  ) : (
                    <Image
                      src='/images/flag_cz40px_2_27.png'
                      alt={product.name}
                      fluid
                    ></Image>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default NewBooks
