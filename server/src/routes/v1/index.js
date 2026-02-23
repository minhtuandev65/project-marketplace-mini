import express from 'express'
import { auth } from './auth/auth.routes'
import { projects } from './projects/projects.routes'

const Router = express.Router()

Router.get('/health', (req, res) => {
    res.json({
        message: 'Ready to use.'
    })
})

Router.use('/api/auth', auth)
Router.use('/api/projects', projects)
export const APIs_v1 = Router
