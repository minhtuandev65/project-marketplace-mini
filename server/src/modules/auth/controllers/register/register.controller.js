import { StatusCodes } from 'http-status-codes'
import { servicesAuth } from '../../services'
import ApiError from '~/shared/utils/ApiError'

export const register = async (req, res) => {
    try {
        const result = await servicesAuth.register(req.body)

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: req.t('auth.register.successfully')
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
            message: t('auth.register.failed')
        })
    }
}
