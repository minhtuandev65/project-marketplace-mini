import { StatusCodes } from 'http-status-codes'
import ApiError from '~/shared/utils/ApiError'
import { servicesAuth } from '../../services'
import { REFRESHTOKEN_SCHEMA } from '../../validators/user.refreshToken.schema'
import Joi from 'joi'

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies
        const payload = await REFRESHTOKEN_SCHEMA.validateAsync(
            { refreshToken },
            { abortEarly: false, stripUnknown: true }
        )
        await servicesAuth.logout(payload.refreshToken)

        res.clearCookie('refreshToken')

        res.status(StatusCodes.NO_CONTENT).json({
            status: 'success',
            message: req.t('auth.logout.successfully'),
            loggedOut: true
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
            message: t('auth.logout.failed')
        })
    }
}
