import { NextFunction, Request, Response } from 'express'

import httpStatus from 'http-status'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../config'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../errors/apiError'

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.user);
    try {
      // get accessToken
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized user',
        )
      }
      // verify token
      let verifiedUser = null
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)

      req.user = verifiedUser // role  , _id
      // console.log(verifiedUser);

      // authorization
      if (
        requiredRoles.length < 1 ||
        !requiredRoles.includes(verifiedUser.role)
      ) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
      }

      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
