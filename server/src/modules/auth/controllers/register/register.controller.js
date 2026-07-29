import { StatusCodes } from 'http-status-codes'
import { authServices } from '../../services'
import ApiError from '~/shared/utils/ApiError'
import Joi from 'joi'

export const register = async (req, res) => {
    try {
        const validatedBody = req.validated?.body || {}

        await authServices.register(validatedBody)

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: req.t('auth.register.successfully')
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
            message: t('auth.register.failed')
        })
    }
}
