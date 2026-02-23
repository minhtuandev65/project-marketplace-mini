import Joi from 'joi'
import { ROLE } from '~/shared/utils/constants'

export const USER_COLLECTION_SCHEMA = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    fullName: Joi.string().allow(null),

    role: Joi.string()
        .valid(...Object.values(ROLE))
        .default(ROLE.BUYER),

    isActive: Joi.boolean().default(false),
    verifyToken: Joi.string().allow(null),

    createdAt: Joi.date()
        .timestamp('javascript')
        .default(() => Date.now()),

    updatedAt: Joi.date().allow(null).default(null),

    latestActiveAt: Joi.date().allow(null).default(null),

    _destroy: Joi.boolean().default(false)
})
