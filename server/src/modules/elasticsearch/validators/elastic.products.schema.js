import Joi from 'joi'
import { RATING } from '~/shared/utils/constants'

export const SEARCH_PRODUCT_SCHEMA = Joi.object({
    keyword: Joi.string().allow('', null),

    category: Joi.string().optional(),

    minPrice: Joi.number().min(0).optional(),
    maxPrice: Joi.number().min(0).optional(),

    page: Joi.number().min(1).default(1),

    limit: Joi.number().min(1).max(50).default(10),
    rating: Joi.number().valid(...Object.values(RATING))
})
