import express from 'express'
import { controllersProjects } from '~/modules/projects/controllers'
import isAuthorized, { hasRole } from '~/shared/middlewares/token/token'
import { ROLE } from '~/shared/utils/constants'

const Router = express.Router()

Router.route('/').post(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controllersProjects.create
)
Router.route('/').get(controllersProjects.list)
Router.route('/:slug').get(controllersProjects.detail)
Router.route('/:slug').put(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controllersProjects.update
)
Router.route('/:slug').delete(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controllersProjects.remove
)
export const projects = Router
