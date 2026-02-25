import { StatusCodes } from 'http-status-codes'
import { servicesAuth } from '../../services'
import ApiError from '~/shared/utils/ApiError'
import { env } from '~/config/env/environment'
import ms from 'ms'

export const login = async (req, res) => {
    try {
        const result = await servicesAuth.login(req.body)
        const isProduction = env.BUILD_MODE === 'production'

        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: isProduction, // bỏ secure khi dev local http
            sameSite: isProduction ? 'None' : 'lax', // dev local không cần none
            maxAge: ms('2 days')
        })
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'lax',
            maxAge: ms('2 days')
        })
        res.status(StatusCodes.OK).json({
            status: 'success',
            message: req.t('auth.login.successfully'),
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
            message: t('auth.login.failed')
        })
    }
}
