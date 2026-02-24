import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { userRepository } from '../../repositories/user.repositories'
import ApiError from '~/shared/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { REGISTER_SCHEMA } from '../../validators/user.register.schema'
import { USER_COLLECTION_SCHEMA } from '../../validators/user.collection.schema'
import { WEBSITE_DOMAIN } from '~/shared/utils/constants'
import { ResendProvider } from '~/shared/providers/email/ResendProvider'
import { templates } from '~/shared/templates'

export const verifyEmail = async (reqData) => {
    try {
        const { email, token } = reqData
        const existsEmail = await userRepository.existsEmail(email)

        if (!existsEmail) {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                'auth.verify_email.email_not_found'
            )
        }
        if (existsEmail.isActive) {
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'auth.verify_email.already_verified'
            )
        }
        if (existsEmail.verifyToken !== token) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                'auth.verify_email.invalid_token'
            )
        }
        const 
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                error.details.map((d) => d.message)
            )
        }

        throw error
    }
}
