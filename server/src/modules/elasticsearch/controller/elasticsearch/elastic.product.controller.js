import { StatusCodes } from 'http-status-codes'
import ApiError from '~/shared/utils/ApiError'
import Joi from 'joi'
import { SEARCH_PRODUCT_SCHEMA } from '../../validators/elastic.products.schema'
import { elasticServices } from '../../services'

export const searchProducts = async (req, res) => {
    try {
        const validatedPayload = await SEARCH_PRODUCT_SCHEMA.validateAsync(
            req.query,
            {
                abortEarly: false,
                stripUnknown: true
            }
        )
        const { keyword, page, limit, ...filters } = validatedPayload
        const result = await elasticServices.searchProducts(
            keyword,
            filters,
            page,
            limit
        )
        res.status(StatusCodes.OK).json({
            status: 'success',
            message: req.t('search.products.successfully'),
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
            message: t('search.products.failed')
        })
    }
}
