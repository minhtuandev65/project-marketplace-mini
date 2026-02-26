import express from 'express'
import { controllersSetting } from '~/modules/settings/controllers'

const Router = express.Router()

Router.route('/language').post(controllersSetting.changeLanguage)

export const settings = Router
