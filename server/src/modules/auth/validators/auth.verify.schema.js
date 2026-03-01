import Joi from 'joi'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE } from '~/shared/validations/validators'
export const VERIFY_EMAIL_SCHEMA = Joi.object({
    email: Joi.string().required().pattern(EMAIL_RULE).messages({
        'any.required': 'schema.users.email.required',
        'string.pattern.base': EMAIL_RULE_MESSAGE
    }),
    token: Joi.string().required()
})
