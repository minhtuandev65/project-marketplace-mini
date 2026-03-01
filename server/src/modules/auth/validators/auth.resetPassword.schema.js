import Joi from 'joi'
import {
    PASSWORD_RULE,
    PASSWORD_RULE_MESSAGE
} from '~/shared/validations/validators'
export const RESET_PASSWORD_SCHEMA = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required().pattern(PASSWORD_RULE).messages({
        'any.required': 'schema.users.password.required',
        'string.pattern.base': PASSWORD_RULE_MESSAGE
    })
})
