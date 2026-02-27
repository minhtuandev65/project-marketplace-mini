import Joi from 'joi'

export const LOGOUT_SCHEMA = Joi.object({
    refreshToken: Joi.string().required()
})
