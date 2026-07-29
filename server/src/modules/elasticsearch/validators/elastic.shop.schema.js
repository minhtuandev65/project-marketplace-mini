import Joi from 'joi'
import { SHOP_STATUS } from '~/shared/utils/constants'

export const SEARCH_SHOP_SCHEMA = Joi.object({
    nameShop: Joi.string(),
    descriptionShop: Joi.string(),
    status: Joi.number()
        .valid(...Object.values(SHOP_STATUS))
        .default(SHOP_STATUS.PENDING)
})
