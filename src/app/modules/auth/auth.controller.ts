/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'

import httpStatus from 'http-status'

import config from '../../../config'
import { IRefreshTokenResponse } from './auth.interface'

import { IUser } from '../user/user.interface'
import sendResponse from '../../../shared/sendResponse'
import { AuthService } from './auth.service'

// const userSignup = catchAsync(
//   async (req: Request, res: Response): Promise<void> => {
//     const { ...userData } = req.body
//     const result = await AuthService.userSignup(userData)

//     const { password, ...rest } = result

//     sendResponse<Omit<IUser, 'password'>>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User created successfully',
//       data: rest,
//     })
//   },
// )

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.userLogin(req.body)
  const { accessToken: token, refreshToken, user } = result
  // console.log(accessToken);
  const { email, _id, name } = result.user

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: { token, user: { email, _id, name } },
  })
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const result = await AuthService.refreshToken(refreshToken)

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'New access token generated successfully !',
    data: result,
  })
})

export const AuthController = {
  userLogin,
  refreshToken,
}
