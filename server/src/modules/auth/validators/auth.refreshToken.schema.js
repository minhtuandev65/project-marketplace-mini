import Joi from 'joi'

export const REFRESHTOKEN_SCHEMA = Joi.object({
    refreshToken: Joi.string().required()
})
