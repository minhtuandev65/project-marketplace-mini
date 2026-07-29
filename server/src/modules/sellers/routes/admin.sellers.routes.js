import express from 'express'
import { sellerControllers } from '~/modules/sellers/controllers'
import isAuthorized, { hasRole } from '~/shared/middlewares/token/token'
import { ROLE } from '~/shared/utils/constants'

const Router = express.Router()

Router.route('/').post(
    isAuthorized,
    hasRole(ROLE.BUYER),
    sellerControllers.registerSeller
)

export const adminSellerRoutes = Router
