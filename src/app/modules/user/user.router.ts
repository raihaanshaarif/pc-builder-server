import express from 'express'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'
import validateRequest from '../../middlewares/validateRequest'

const userRouter = express.Router()

userRouter.post(
  '/create-user',
  // validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
)

userRouter.get('/:id', UserController.getSingleUser)
userRouter.get('/', UserController.getAllUsers)
userRouter.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser,
)
userRouter.delete('/:id', UserController.deleteUser)

export const UserRouter = userRouter
