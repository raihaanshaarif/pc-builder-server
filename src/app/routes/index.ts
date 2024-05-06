import express from 'express'
import { UserRouter } from '../modules/user/user.router'
import { AuthRoutes } from '../modules/auth/auth.route'
import { ProductRoutes } from '../modules/product/product.routes'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
