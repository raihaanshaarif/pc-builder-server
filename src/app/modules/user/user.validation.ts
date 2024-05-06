import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required!',
    }),
    name: z.string({
      required_error: 'Name is required!',
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

    name: z
      .string({
        required_error: 'Name is required!',
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
