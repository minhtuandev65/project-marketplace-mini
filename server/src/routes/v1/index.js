import express from 'express'
import { auth } from './auth/auth.routes'

const Router = express.Router()

Router.get('/health', (req, res) => {
    res.json({
        message: 'Ready to use.'
    })
})

Router.use('/api/auth', auth)
export const APIs_v1 = Router
