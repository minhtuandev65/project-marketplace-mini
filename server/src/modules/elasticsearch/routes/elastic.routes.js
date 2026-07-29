import express from 'express'
import { elasticControllers } from '~/modules/elasticsearch/controller'

const Router = express.Router()

Router.route('/').get(elasticControllers.searchProducts)

export const elasticRoutes = Router
