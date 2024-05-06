import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required!',
    }),

    email: z.string({
      required_error: 'email is required!',
    }),
    role: z
      .string({
        required_error: 'role number is required!',
      })
      .optional(),
  }),
})

const updateUserZodSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'password is required!',
      })
      .optional(),

    email: z
      .string({
        required_error: 'email is required!',
      })
      .optional(),
  }),
})

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
}
