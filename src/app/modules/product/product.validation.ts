import { z } from 'zod'

// Enum for stock status
const stockStatus = z.enum(['In Stock', 'Out of stock'])

// Zod schema for reviews
const ReviewSchema = z.object({
  comments: z.array(z.string()),
})

// Zod schema for reviews, allowing updates to comments as an array of strings
const ReviewUpdateSchema = z.object({
  comments: z.array(z.string()).optional(),
})

// Main Product schema using Zod
const createProductZodSchema = z.object({
  name: z.string(),
  category: z.string(),
  image: z.string(),
  stocks: stockStatus,
  price: z.number(),
  description: z.string().optional(),
  keyFeatures: z.string().optional(),
  individualRating: z.number().optional(),
  averageRating: z.number().optional(),
  reviews: ReviewSchema.optional(),
  createdAt: z.date().optional(), // If timestamps are needed
  updatedAt: z.date().optional(), // If timestamps are needed
})

// Update schema for products using Zod
const UpdateProductZodSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  image: z.string().optional(),
  stocks: stockStatus.optional(),
  price: z.number().optional(),
  description: z.string().optional(),
  keyFeatures: z.string().optional(),
  individualRating: z.number().optional(),
  averageRating: z.number().optional(),
  reviews: ReviewUpdateSchema.optional(),
})
export const ProductValidation = {
  createProductZodSchema,
  UpdateProductZodSchema,
}
