import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelpers'

import ApiError from '../../../errors/apiError'
import httpStatus from 'http-status'
import { IProduct, IProductFilters } from './product.interface'
import { Product } from './product.model'
import { productSearchableFields } from './product.constant'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'

const createProduct = async (productData: IProduct): Promise<IProduct> => {
  console.log(productData)
  const result = await Product.create(productData)
  return result
}

const getAllProducts = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, ...filtersData } = filters
  const normalizedSearchTerm = searchTerm?.trim()
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (normalizedSearchTerm) {
    const searchConditions = productSearchableFields.map(field => ({
      [field]: { $regex: normalizedSearchTerm, $options: 'i' },
    }))
    andConditions.push({ $or: searchConditions })
  }

  // Apply case-insensitive regex to all filterable fields
  const filterConditions = Object.entries(filtersData).map(
    ([field, value]) => ({
      [field]: { $regex: new RegExp(`^${value}$`, 'i') }, // Encapsulate value in regex, apply case-insensitive flag
    }),
  )

  if (filterConditions.length > 0) {
    andConditions.push({ $and: filterConditions })
  }

  const sortConditions = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Product.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Product.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id)
  return result
}

const updateProduct = async (
  id: string,
  payload: Partial<IProduct>,
): Promise<IProduct | null> => {
  const isExist = await Product.findOne({ _id: id })

  console.log('id', id, 'Payload', payload)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }
  const { ...productData } = payload
  const updatedProductData = { ...productData }

  // dynamically handling

  const result = await Product.findOneAndUpdate(
    { _id: id },
    updatedProductData,
    {
      new: true,
    },
  )

  return result
}
const deleteProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findByIdAndDelete(id)
  return result
}

// const createComment = async (bookId: string, commentData: string) => {
//   console.log('test', commentData)
//   const result = await Book.findOneAndUpdate(
//     { _id: bookId },
//     { $push: { comments: commentData } },
//   )
//   console.log(result)
//   return result
// }

// const getComment = async (id: string): Promise<IBook | null> => {
//   const result = await Book.findOne(
//     { _id: id },
//     'comments -_id', // Includes comments, excludes _id
//   ).exec() // Ensuring to execute and return a promise

//   console.log(result)
//   return result
// }

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
