import express from 'express'
const router = express.Router()
import {
  getProductById,
  getProducts,
  getAllProducts,
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
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router
  .route('/:id/reviews')
  .post(protect, createProductReview)
  .put(protect, admin, deleteProductReview)
router
  .route('/:id/reviews/acknowledge')
  .put(protect, admin, acknowledgeProductReview)

router.get('/top', getTopProducts)
router.get('/all', getAllProducts)

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

router.route('/:id/anybody').put(protect, updateProductAnybody)
router.route('/:id/remove/favorites').put(protect, removeFromFavorites)

router.route('/discount').post(protect, admin, createDiscountAllProducts)

export default router
