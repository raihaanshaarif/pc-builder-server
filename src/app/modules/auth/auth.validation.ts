import { z } from 'zod'
import { userRoles } from '../user/user.constant'
// import { userRoles } from '../user/user.constant';

// const userSignupZodSchema = z.object({
//   body: z.object({
//     email: z.string({
//       required_error: 'email Number is required',
//     }),
//     role: z.enum([...userRoles] as [string, ...string[]], {
//       required_error: 'Role is required',
//     }),
//     password: z.string({
//       required_error: 'Password Number is required',
//     }),
//   }),
// })

const userLoginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email Number is required',
    }),
    password: z.string({
      required_error: 'Password Number is required',
    }),
  }),
})

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})

export const AuthValidation = {
  userLoginZodSchema,
  refreshTokenZodSchema,
}
