import { StatusCodes } from 'http-status-codes'
import { authServices } from '../../services'
import ApiError from '~/shared/utils/ApiError'
import { env } from '~/config/env/environment'
import ms from 'ms'
import { LOGIN_SCHEMA } from '../../validators/auth.login.schema'
import Joi from 'joi'

export const createShop = async (req, res) => {
    try {
        const payloadLogin = await LOGIN_SCHEMA.validateAsync(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        const result = await 'asdasd'
        res.status(StatusCodes.OK).json({
            status: 'success',
            message: req.t('auth.login.successfully'),
            data: 'asd'
        })
    } catch (error) {
        const { t } = req
        if (error instanceof Joi.ValidationError) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                error.details.map((d) => d.message)
            )
        }
        if (error instanceof ApiError) {
            const message = Array.isArray(error.message)
                ? error.message.map((key) => t(key))
                : t(error.message)

            return res.status(error.statusCode).json({
                status: 'error',
                message
            })
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: t('auth.login.failed')
        })
    }
}
