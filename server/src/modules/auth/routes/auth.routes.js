import express from 'express'
import { authControllers } from '~/modules/auth/controllers'
import isAuthorized from '~/shared/middlewares/token/token'
import { validateRequest } from '~/shared/middlewares/validateRequest/validateRequest'
import { REGISTER_SCHEMA } from '../validators/auth.register.schema'
import { LOGIN_SCHEMA } from '../validators/auth.login.schema'
import { VERIFY_EMAIL_SCHEMA } from '../validators/auth.verify.schema'
import { REFRESHTOKEN_SCHEMA } from '../validators/auth.refreshToken.schema'
import { FORGOT_PASSWORD_SCHEMA } from '../validators/auth.forgotPassword.schema'
import { RESET_PASSWORD_SCHEMA } from '../validators/auth.resetPassword.schema'

const Router = express.Router()

Router.route('/register').post(
    validateRequest({ body: REGISTER_SCHEMA }),
    authControllers.register
)

Router.route('/login').post(
    validateRequest({ body: LOGIN_SCHEMA }),
    authControllers.login
)

Router.route('/verify-email').post(
    validateRequest({ body: VERIFY_EMAIL_SCHEMA }),
    authControllers.verifyEmail
)

Router.route('/refresh-token').post(
    validateRequest({ cookies: REFRESHTOKEN_SCHEMA }),
    authControllers.refreshToken
)

Router.route('/logout').post(
    isAuthorized,
    validateRequest({ cookies: REFRESHTOKEN_SCHEMA }),
    authControllers.logout
)

Router.route('/forgot-password').post(
    validateRequest({ body: FORGOT_PASSWORD_SCHEMA }),
    authControllers.forgotPassword
)

Router.route('/reset-password').post(
    validateRequest({ body: RESET_PASSWORD_SCHEMA }),
    authControllers.resetPassword
)
export const authRoutes = Router
