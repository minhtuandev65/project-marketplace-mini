import Joi from 'joi'
import { REGISTER_SELLER_STATUS, SELLER_TYPE } from '~/shared/utils/constants'
import {
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE,
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE,
    PHONE_RULE,
    PHONE_RULE_MESSAGE
} from '~/shared/validations/validators'
import { IDENTITY_INFO_SCHEMA } from './seller.identity.schema'
import { env } from '~/config/env/environment'
export const SELLERS_COLLECTION_SCHEMA = Joi.object({
    user_id: Joi.string().required().pattern(OBJECT_ID_RULE).message({
        'any.required': 'schema.sellers.register_seller.user_id.required',
        'string.pattern.base': OBJECT_ID_RULE_MESSAGE
    }),

    email: Joi.string().required().pattern(EMAIL_RULE).messages({
        'any.required': 'schema.users.email.required',
        'string.pattern.base': EMAIL_RULE_MESSAGE
    }),
    shop_name: Joi.string().required().max(100).messages({
        'any.required': 'schema.sellers.shop_name.required'
    }),
    seller_type: Joi.number()
        .valid(...Object.values(SELLER_TYPE))
        .required()
        .messages({
            'any.required': 'schema.sellers.seller_type.required'
        })
        .default(SELLER_TYPE.INDIVIDUAL),

    identity_info: IDENTITY_INFO_SCHEMA.required().messages({
        'any.required': 'schema.sellers.identity_info.required'
    }),

    phone_number: Joi.string().required().pattern(PHONE_RULE).messages({
        'any.required': 'schema.sellers.register_seller.phone_number.required',
        'string.pattern.base': PHONE_RULE_MESSAGE
    }),

    logo_shop_key: Joi.string().default(env.DEFAULT_LOGO_SHOP),
    verification_status: Joi.number()
        .valid(...Object.values(REGISTER_SELLER_STATUS))
        .default(REGISTER_SELLER_STATUS.PENDING),

    createdAt: Joi.date().default(() => new Date()),

    updatedAt: Joi.date().allow(null).default(null),

    _destroy: Joi.boolean().default(false)
})
