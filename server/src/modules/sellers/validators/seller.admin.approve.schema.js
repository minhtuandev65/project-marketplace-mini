import Joi from 'joi'
import { REGISTER_SELLER_STATUS } from '~/shared/utils/constants'
import {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE
} from '~/shared/validations/validators'

export const SELLER_ADMIN_APPROVE_COLLECTION_SCHEMA = Joi.object({
    user_id: Joi.string().required().pattern(OBJECT_ID_RULE).message({
        'any.required': 'schema.sellers.register_seller.user_id.required',
        'string.pattern.base': OBJECT_ID_RULE_MESSAGE
    })
})
