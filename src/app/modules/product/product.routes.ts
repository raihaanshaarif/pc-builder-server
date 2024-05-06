import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ProductValidation } from './product.validation'
import { ProductController } from './product.controller'

const router = express.Router()

router.post(
  '/create-product',
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct,
)
router.get('/:id', ProductController.getSingleProduct)
router.patch(
  '/:id',
  validateRequest(ProductValidation.UpdateProductZodSchema),
  ProductController.updateProduct,
)
router.delete('/:id', ProductController.deleteProduct)
router.get('/', ProductController.getAllProducts)
// router.post('/comment/:id', ProductController.createComment)
// router.get('/comment/:id', ProductController.getComment)

export const BookRoutes = router
