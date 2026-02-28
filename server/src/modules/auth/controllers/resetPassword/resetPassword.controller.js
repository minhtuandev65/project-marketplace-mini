import { StatusCodes } from 'http-status-codes'
import { servicesAuth } from '../../services'
import ApiError from '~/shared/utils/ApiError'
import { RESET_PASSWORD_SCHEMA } from '../../validators/user.resetPassword.schema'
import Joi from 'joi'

export const resetPassword = async (req, res) => {
    try {
        const payload = await RESET_PASSWORD_SCHEMA.validateAsync(req.body, {
            abortEarly: false,
            stripUnknown: true
        })

        await servicesAuth.resetPassword(payload)

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: req.t('auth.reset_password.successfully')
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
            message: t('auth.reset_password.failed')
        })
    }
}
