import express from 'express'
import { settingControllers } from '~/modules/settings/controllers'

const Router = express.Router()

Router.route('/language').post(settingControllers.changeLanguage)

export const settingRoutes = Router
