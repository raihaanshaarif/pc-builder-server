import { Schema, model } from 'mongoose'
import { IProduct, ProductModel } from './product.interface'
import { stocks } from './product.constant'

export const ProductSchema = new Schema<IProduct, ProductModel>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    stocks: {
      type: String,
      enum: stocks,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    keyFeatures: {
      type: String,
    },
    individualRating: {
      type: Number,
    },
    averageRating: {
      type: Number,
    },
    reviews: {
      comments: [{ type: String }],
    },
    featured: {
      type: String,
      default: 'false',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Product = model<IProduct, ProductModel>('Product', ProductSchema)
