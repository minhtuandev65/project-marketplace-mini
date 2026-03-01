import Joi from 'joi'
import { ROLE } from '~/shared/utils/constants'
export const ADMIN_UPDATE_USER_SCHEMA = Joi.object({
    role: Joi.string().valid(...Object.values(ROLE)),
    isActive: Joi.boolean()
}).min(1)
