import { StatusCodes } from 'http-status-codes'
import ApiError from '~/shared/utils/ApiError'
import Joi from 'joi'
import { sellerServices } from '../../services'
import { SELLERS_DETAIL_SELLER_COLLECTION_SCHEMA } from '../../validators/seller.detailSeller.schema'

export const detailSeller = async (req, res) => {
    try {
        const { userId } = req.payload

        const validatedPayload =
            await SELLERS_DETAIL_SELLER_COLLECTION_SCHEMA.validateAsync(
                {
                    user_id: userId
                },
                { abortEarly: false, stripUnknown: true }
            )
        const result = await sellerServices.registerSeller(validatedPayload)

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: req.t('sellers.detail_seller.successfully'),
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
            message: t('sellers.detail_seller.failed')
        })
    }
}
