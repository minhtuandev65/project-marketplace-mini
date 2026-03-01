import { NAME_RULE } from "~/shared/validations/validators";
import Joi from 'joi'

export const UPDATE_PROFILE_SCHEMA = Joi.object({
    firstName: Joi.string().trim().strict().pattern(NAME_RULE),
    lastName: Joi.string().trim().strict().pattern(NAME_RULE),
    fullName: Joi.string().trim().strict().pattern(NAME_RULE),
    avatar: Joi.string().uri()
}).min(1)
