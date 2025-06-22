import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { images } from '../bannerImages/images'

const ProductCarousel = () => {
  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error } = productTopRated

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    // Uploaded Images from DB
    <Carousel pause="hover" className="carousel-custom">
      {images.map((image) => (
        <Carousel.Item key={image._id}>
          <Image src={image.image} alt={image.bannerTitle} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
