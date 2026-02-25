import { EMAIL_RULE, EMAIL_RULE_MESSAGE } from '~/shared/validations/validators'
import Joi from 'joi'

export const LOGIN_SCHEMA = Joi.object({
    email: Joi.string().required().pattern(EMAIL_RULE).messages({
        'any.required': 'schema.users.email.required',
        'string.pattern.base': EMAIL_RULE_MESSAGE
    }),
    password: Joi.string().required()
})
