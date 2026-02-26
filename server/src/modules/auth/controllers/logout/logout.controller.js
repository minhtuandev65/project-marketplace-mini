import { StatusCodes } from 'http-status-codes'
import ApiError from '~/shared/utils/ApiError'

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        res.clearCookie('refreshToken')

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: req.t('auth.logout.successfully'),
            loggedOut: true
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
            message: t('auth.logout.failed')
        })
    }
}
