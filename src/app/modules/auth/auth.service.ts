import httpStatus from 'http-status'

import { IUser } from '../user/user.interface'
import { IRefreshTokenResponse } from './auth.interface'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../../errors/apiError'
import { User } from '../user/user.model'

// const userSignup = async (user: IUser): Promise<IUser> => {
//   const newUser = await User.create(user)
//   if (!newUser) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
//   }
//   return newUser.toObject()
// }

const userLogin = async (payload: Pick<IUser, 'email' | 'password'>) => {
  const { email: userEmail, password } = payload
  // console.log(email);

  // user exists:
  const user = await User.isUserExist(userEmail)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // password matching:
  if (
    !user.password ||
    !(await User.isPasswordMatched(password, user.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  // create access token & refresh token
  const { _id, role, email } = user
  // console.log(user);
  const accessToken = jwtHelpers.createToken(
    { _id, role, email },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string,
  )
  const refreshToken = jwtHelpers.createToken(
    { _id, role, email },
    config.jwt.refreshSecret as Secret,
    config.jwt.refreshExpiresIn as string,
  )

  return {
    accessToken,
    refreshToken,
    user,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify refresh token
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refreshSecret as Secret,
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  console.log(verifiedToken)

  const { _id } = verifiedToken

  // if user exist in database
  const user = await User.findById(_id)

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      _id: user._id,
      role: user.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string,
  )

  return {
    user,
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  userLogin,
  refreshToken,
}
