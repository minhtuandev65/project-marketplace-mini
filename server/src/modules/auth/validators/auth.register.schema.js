import {
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE,
    NAME_RULE,
    NAME_RULE_MESSAGE,
    PASSWORD_RULE,
    PASSWORD_RULE_MESSAGE
} from '~/shared/validations/validators'
import Joi from 'joi'

export const REGISTER_SCHEMA = Joi.object({
    email: Joi.string().required().pattern(EMAIL_RULE).messages({
        'any.required': 'schema.users.email.required',
        'string.pattern.base': EMAIL_RULE_MESSAGE
    }),
    password: Joi.string().required().pattern(PASSWORD_RULE).messages({
        'any.required': 'schema.users.password.required',
        'string.pattern.base': PASSWORD_RULE_MESSAGE
    }),
    fullName: Joi.string().trim().strict().pattern(NAME_RULE).messages({
        'string.pattern.base': NAME_RULE_MESSAGE
    })
})
