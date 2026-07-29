import express from 'express'
import { authRoutes } from '~/modules/auth/routes/auth.routes'
import { elasticRoutes } from '~/modules/elasticsearch/routes/elastic.routes'
import { sellerRoutes } from '~/modules/sellers/routes/sellers.routes'
import { settingRoutes } from '~/modules/settings/routes/setting.routes'

const Router = express.Router()

Router.get('/health', (req, res) => {
    res.json({
        message: req.t('system.health.ready')
    })
})

Router.use('/api/auth', authRoutes)
Router.use('/api/settings', settingRoutes)
Router.use('/api/seller', sellerRoutes)
Router.use('/api/search', elasticRoutes)
export const APIs_v1 = Router
