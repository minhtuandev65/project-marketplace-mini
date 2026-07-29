import express from 'express'
import { sellerControllers } from '~/modules/sellers/controllers'
import isAuthorized, { hasRole } from '~/shared/middlewares/token/token'
import { ROLE } from '~/shared/utils/constants'
import { adminSellerRoutes } from './admin.sellers.routes'
import { validateRequest } from '~/shared/middlewares/validateRequest/validateRequest'
import { SELLERS_COLLECTION_SCHEMA } from '../validators/seller.collection.schema'

const Router = express.Router()

Router.route('/').post(
    isAuthorized,
    hasRole(ROLE.BUYER),
    validateRequest({ body: SELLERS_COLLECTION_SCHEMA }),
    sellerControllers.registerSeller
)
Router.use('/admin', adminSellerRoutes)
export const sellerRoutes = Router
