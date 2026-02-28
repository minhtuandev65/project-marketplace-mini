import { userRepository } from '../../repositories/user.repositories'
import ApiError from '~/shared/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { refreshTokenRepository } from '../../repositories/refreshToken.repositories'

export const resetPassword = async (reqData) => {
    try {
        const { password, token } = reqData

        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex')
        const hashPassword = await bcrypt.hash(password, 10)

        const data = {
            token: hashedToken,
            newPassword: hashPassword
        }
        const account = await userRepository.updatePassword(data)

        if (!account) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                'auth.reset_password.invalid_token'
            )
        }
        await refreshTokenRepository.deleteAllRefreshTokensByUserId(account._id)
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
