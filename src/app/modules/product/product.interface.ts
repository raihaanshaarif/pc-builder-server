/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export type IProduct = {
  name: string
  category: string
  image: string
  stocks: 'In Stock' | 'Out of stock'
  price: number
  description: string
  keyFeatures: string
  individualRating: number
  averageRating: number
  reviews: Array<{
    text: string
  }>
}

export type IProductFilters = {
  searchTerm?: string
}

export type ProductModel = Model<IProduct, Record<string, unknown>>
