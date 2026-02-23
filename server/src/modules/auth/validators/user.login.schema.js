import { EMAIL_RULE } from '~/shared/validations/validators'
import Joi from 'joi'

export const LOGIN_SCHEMA = Joi.object({
    email: Joi.string().required().pattern(EMAIL_RULE),
    password: Joi.string().required()
})
