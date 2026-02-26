import { userRepository } from '../../repositories/user.repositories'
import ApiError from '~/shared/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

export const verifyEmail = async (reqData) => {
    try {
        const { email, token } = reqData
        const accountVerified = await userRepository.findAccountVerified(email)

        if (!accountVerified) {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                'auth.verify_email.email_not_found'
            )
        }
        if (accountVerified.isActive) {
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'auth.verify_email.already_verified'
            )
        }
        if (accountVerified.verifyToken !== token) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                'auth.verify_email.invalid_token'
            )
        }

        await userRepository.updateVerified(email)
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
