import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'

import sendResponse from '../../../shared/sendResponse'

import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IProduct } from './product.interface'
import { productFilterableFields } from './product.constant'
import { ProductService } from './product.service'

const createProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const productData = req.body
    const result = await ProductService.createProduct(productData)

    sendResponse<IProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  },
)

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await ProductService.getAllProducts(filters, paginationOptions)

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await ProductService.getSingleProduct(id)

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully !',
    data: result,
  })
})

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await ProductService.updateProduct(id, payload)

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully !',
    data: result,
  })
})
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await ProductService.deleteProduct(id)

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully !',
    data: result,
  })
})

// const createComment: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const commentData: string = req.body.comments
//     const bookId = req.params.id
//     console.log('from controller', commentData, bookId)

//     const result = await BookService.createComment(bookId, commentData)

//     sendResponse<IBook>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Comment added successfully!',
//       data: result,
//     })
//   },
// )
// const getComment = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id

//   const result = await BookService.getComment(id)

//   sendResponse<IBook>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Comment retrieved successfully !',
//     data: result,
//   })
// })

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
