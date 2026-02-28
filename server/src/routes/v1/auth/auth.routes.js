import express from 'express'
import { controllersAuth } from '~/modules/auth/controllers'
import isAuthorized from '~/shared/middlewares/token/token'

const Router = express.Router()

Router.route('/register').post(controllersAuth.register)

Router.route('/login').post(controllersAuth.login)

Router.route('/verify-email').post(controllersAuth.verifyEmail)

Router.route('/refresh-token').post(isAuthorized, controllersAuth.refreshToken)

Router.route('/logout').post(isAuthorized, controllersAuth.logout)

Router.route('/forgot-password').post(controllersAuth.forgotPassword)

Router.route('/reset-password').post(controllersAuth.resetPassword)
export const auth = Router
