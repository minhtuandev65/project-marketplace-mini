import express from 'express'
import { controllersAuth } from '~/modules/auth/controllers'

const Router = express.Router()

Router.route('/register').post(controllersAuth.register)

Router.route('/login').post(controllersAuth.login)

/* Router.route('/logout').post() */

export const auth = Router
