import { StatusCodes } from 'http-status-codes'
import { servicesAuth } from '../../services'
import ApiError from '~/shared/utils/ApiError'
import ms from 'ms'
import { env } from '~/config/env/environment'

export const refreshToken = async (req, res) => {
    try {
        const result = await servicesAuth.refreshToken(
            req.cookies?.refreshToken
        )

        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms(env.ACCESS_TOKEN_LIFE)
        })
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
