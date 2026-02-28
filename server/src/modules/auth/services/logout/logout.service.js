import ApiError from '~/shared/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { refreshTokenRepository } from '../../repositories/refreshToken.repositories'
import { JwtProvider } from '~/shared/providers/token/JwtProvider'
import { env } from '~/config/env/environment'

export const logout = async (refreshTokenFromCookie) => {
    try {
        const refreshTokenDecoded = await JwtProvider.verifyToken(
            refreshTokenFromCookie,
            env.REFRESH_TOKEN_SECRET_SIGNATURE
        )

        const { userId, jti } = refreshTokenDecoded

        if (!userId || !jti) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                'auth.logout.invalid_token'
            )
        }

        const deleted = await refreshTokenRepository.logout(userId, jti)

        return deleted.deletedCount > 0
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
