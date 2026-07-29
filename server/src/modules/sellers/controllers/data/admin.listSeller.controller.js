import { StatusCodes } from 'http-status-codes'
import ApiError from '~/shared/utils/ApiError'
import Joi from 'joi'
import { sellerServices } from '../../services'

export const adminListSeller = async (req, res) => {
    try {
        const result = await sellerServices.registerSeller()

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: req.t('sellers.list_sellers.successfully'),
            data: result
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
            message: t('sellers.list_sellers.failed')
        })
    }
}
