import { StatusCodes } from 'http-status-codes'
import ApiError from '~/shared/utils/ApiError'
import Joi from 'joi'
import { sellerServices } from '../../services'

export const registerSeller = async (req, res) => {
    try {
        const { email, userId } = req.payload
        const validatedBody = req.validated?.body || {}
        const reqData = {
            email,
            userId,
            ...validatedBody
        }
        const result = await sellerServices.registerSeller(reqData)

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: req.t('sellers.register_seller.successfully'),
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
            message: t('sellers.register_seller.failed')
        })
    }
}
