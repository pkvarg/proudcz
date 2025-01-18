import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Email from '../utils/email.js'

// @desc Fetch all NO LIMIT products
// @desc GET /api/products/all
// @access Public

const getAllProducts = asyncHandler(async (req, res) => {
  // const localAddSearchNameToAllProducts = asyncHandler(async () => {
  //   const products = await Product.find({}).collation({ locale: 'cs' }).sort({ name: 1 })

  //   for (const prod of products) {
  //     const prodDB = await Product.findById(prod._id) // Fetch the product by ID
  //     // const searchName = prod.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  //     // console.log('sname', prod.name, searchName)

  //     // Optionally save the updated product back to the database
  //     // prodDB.searchName = searchName
  //     // await prodDB.save()
  //   }
  //   console.log('local...', products.length)
  // })
  // localAddSearchNameToAllProducts()

  const products = await Product.find({}).collation({ locale: 'cs' }).sort({ name: 1 })
  res.json({ products })
})

// @desc Fetch all products
// @desc GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize
  const page = Number(req.query.pageNumber) || 1
  console.log('keyword', req.query.keyword)
  const keyword = req.query.keyword
    ? {
        $or: [
          { searchName: { $regex: req.query.keyword, $options: 'i' } },
          { name: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .collation({ locale: 'cs' })
    .sort({ name: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc POST /api/products
// @access Admin
const createDiscountAllProducts = asyncHandler(async (req, res) => {
  const discount = req.body.discount
  const products = await Product.find({})
  if (products) {
    products.map(async (product, i) => {
      const singleProduct = await Product.findById(products[i]._id)
      singleProduct.discount = discount
      const price = singleProduct.price
      const newPrice = price - (price * discount) / 100
      const roundedPriceToFiveCents = Math.ceil(newPrice * 20) / 20
      singleProduct.discountedPrice = roundedPriceToFiveCents
      await singleProduct.save()
    })

    res.status(200).json({
      message: 'Discounts set for all products',
    })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Fetch single product
// @desc GET /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Delete a product
// @desc DELETE /api/products/:id
// @access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Create a product
// @desc POST /api/products
// @access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: '',
    price: 0,
    discount: 0,
    discountedPrice: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    author: '',
    category: '',
    countInStock: 0,
    numReviews: 0,
    description: '',
    excerpt: '',
    catalog: '',
    weight: '',
    related: '',
    related2: '',
    related3: '',
    tags: '',
    language: '',
    binding: '',
    pages: '',
    isbn: '',
    year: '',
    searchName: '',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    discount,
    discountedPrice,
    description,
    excerpt,
    image,
    author,
    category,
    countInStock,
    catalog,
    weight,
    related,
    related2,
    related3,
    tags,
    language,
    binding,
    pages,
    isbn,
    year,
    searchName,
  } = req.body

  const prod = await Product.findById(req.params.id)
  const favoriteOf = req.body.favoriteOf
  if (favoriteOf) {
    prod.favoriteOf.push(favoriteOf)

    await prod.save()
  } else if (prod) {
    prod.name = name
    prod.price = price
    prod.discount = discount
    prod.discountedPrice = discountedPrice
    prod.description = description
    prod.excerpt = excerpt
    prod.image = image
    prod.author = author
    prod.category = category
    prod.countInStock = countInStock
    prod.catalog = catalog
    prod.weight = weight
    prod.related = related
    prod.related2 = related2
    prod.related3 = related3
    prod.tags = tags
    prod.language = language
    prod.binding = binding
    prod.pages = pages
    prod.isbn = isbn
    prod.year = year
    prod.searchName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    const savedProd = await prod.save()

    res.json(savedProd)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Update a product when adding favorite of to a product
// @route   PUT /api/products/:id/anybody
// @access  Private/Admin
const updateProductAnybody = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    discount,
    discountedPrice,
    description,
    excerpt,
    image,
    author,
    category,
    countInStock,
    catalog,
    weight,
    related,
    related2,
    related3,
    tags,
    language,
    binding,
    pages,
    isbn,
    year,
    searchName,
  } = req.body

  const prod = await Product.findById(req.params.id)
  const favoriteOf = req.body.favoriteOf
  if (favoriteOf) {
    prod.favoriteOf.push(favoriteOf)

    await prod.save()
  } else if (prod) {
    prod.name = name
    prod.price = price
    prod.discount = discount
    prod.discountedPrice = discountedPrice
    prod.description = description
    prod.excerpt = excerpt
    prod.image = image
    prod.author = author
    prod.category = category
    prod.countInStock = countInStock
    prod.catalog = catalog
    prod.weight = weight
    prod.related = related
    prod.related2 = related2
    prod.related3 = related3
    prod.tags = tags
    prod.language = language
    prod.binding = binding
    prod.pages = pages
    prod.isbn = isbn
    prod.year = year
    prod.searchName = searchName

    const savedProd = await prod.save()

    res.json(savedProd)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Remove from favorites
// @route   PUT /api/products/:id/remove/favorites
// @access  Private
const removeFromFavorites = asyncHandler(async (req, res) => {
  const userId = req.body.userId

  const prod = await Product.findById(req.params.id)
  if (prod) {
    for (let i = 0; i < prod.favoriteOf.length; i++) {
      if (prod.favoriteOf[i]._id == userId) {
        prod.favoriteOf.splice(i, 1)
      }
    }

    const updatedProduct = await prod.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Review not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Recenzia už existuje')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
    await product.save()
    await new Email(review).sendReviewNotification()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Acknowledge review
// @route   PUT /api/products/:id/reviews/acknowledge
// @access  Private
const acknowledgeProductReview = asyncHandler(async (req, res) => {
  const { comment } = req.body

  const prod = await Product.findById(req.params.id)
  if (prod) {
    for (let i = 0; i < prod.reviews.length; i++) {
      if (prod.reviews[i].comment === comment) {
        prod.reviews[i].isAcknowledged = true
      }
    }
    const updatedProduct = await prod.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Review not found')
  }
})

// @desc    Delete review
// @route   PUT /api/products/:id/reviews
// @access  Private
const deleteProductReview = asyncHandler(async (req, res) => {
  const { product, comment } = req.body

  const prod = await Product.findById(req.params.id)
  if (prod) {
    for (let i = 0; i < prod.reviews.length; i++) {
      if (prod.reviews[i].comment === comment) {
        prod.reviews.splice(i, 1)
      }
    }

    const updatedProduct = await prod.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Review not found')
  }
})

// @desc    Get Top rated products
// @route   GET /api/products/top
// @access  Public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
})

export {
  getProducts,
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  updateProductAnybody,
  removeFromFavorites,
  createProductReview,
  acknowledgeProductReview,
  deleteProductReview,
  getTopProducts,
  createDiscountAllProducts,
}
