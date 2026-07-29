import Joi from 'joi'

export const CREATE_SHOP_SCHEMA = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().max(500),
    address: Joi.string().required()
})
