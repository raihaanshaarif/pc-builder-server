import express from 'express'
import { UserRouter } from '../modules/user/user.router'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
