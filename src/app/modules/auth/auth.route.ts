import express from 'express'

import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'

const router = express.Router()

// router.post(
//   '/signup',
//   validateRequest(AuthValidation.userSignupZodSchema),
//   AuthController.userSignup,
// )

router.post(
  '/login',
  validateRequest(AuthValidation.userLoginZodSchema),
  AuthController.userLogin,
)

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken,
)

export const AuthRoutes = router
