import { StatusCodes } from 'http-status-codes'
import { servicesAuth } from '../../services'
import ApiError from '~/shared/utils/ApiError'
import { REFRESHTOKEN_SCHEMA } from '../../validators/user.refreshToken.schema'

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies

        const payload = await REFRESHTOKEN_SCHEMA.validateAsync(
            { refreshToken },
            { abortEarly: false }
        )

        const result = await servicesAuth.refreshToken(payload.refreshToken)

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: req.t('auth.refresh_token.successfully'),
            data: result
        })
    } catch (error) {
        const { t } = req

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
            message: t('auth.refresh_token.failed')
        })
    }
}
