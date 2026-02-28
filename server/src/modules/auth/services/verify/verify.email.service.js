import { userRepository } from '../../repositories/user.repositories'
import ApiError from '~/shared/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

export const verifyEmail = async (reqData) => {
    try {
        const { email } = reqData

        const result = await userRepository.updateVerified(reqData)

        if (result.modifiedCount === 0) {
            const accountVerified =
                await userRepository.findAccountVerified(email)
            if (accountVerified) {
                throw new ApiError(
                    StatusCodes.CONFLICT,
                    'auth.verify_email.already_verified'
                )
            } else {
                throw new ApiError(
                    StatusCodes.BAD_REQUEST,
                    'auth.verify_email.failed'
                )
            }
        }

        return true
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
