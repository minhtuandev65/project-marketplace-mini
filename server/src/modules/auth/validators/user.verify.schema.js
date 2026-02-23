import Joi from 'joi'
export const VERIFY_EMAIL_SCHEMA = Joi.object({
    token: Joi.string().required()
})
