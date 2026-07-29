import Joi from 'joi'

export const CREATE_SHOP_SCHEMA = Joi.object({
    shop_name: Joi.string().required().messages({
            'any.required': 'schema.shop.name.required'
    }),  
     user_id: Joi.string().required().pattern(OBJECT_ID_RULE).message({
            'any.required': 'schema.shop.ownerId.required',
            'string.pattern.base': OBJECT_ID_RULE_MESSAGE
        }),
    description: Joi.string().max(500),
    address: Joi.string().required(),
    status: Joi.
})
           