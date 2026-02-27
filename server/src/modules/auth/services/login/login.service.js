import ApiError from '~/shared/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'
import Joi from 'joi'
import { userRepository } from '../../repositories/user.repositories'
import { JwtProvider } from '~/shared/providers/token/JwtProvider'
import { env } from '~/config/env/environment'
import { refreshTokenRepository } from '../../repositories/refreshToken.repositories'

export const login = async (reqData, dataRefreshToken) => {
    try {
        const user = await userRepository.findUserForLogin(reqData.email)
        const userId = String(user?._id)
        if (!user) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'auth.login.incorrect')
        }

        const isMatch = await bcrypt.compare(reqData.password, user.password)

        if (!isMatch || !user.isActive) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'auth.login.incorrect')
        }

        const userInfo = {
            userId,
            email: user.email,
            role: user.role,
            fullName: user.fullName
        }
        const jti = crypto.randomUUID()
        const accessToken = await JwtProvider.generateToken(
            userInfo,
            env.ACCESS_TOKEN_SECRET_SIGNATURE,
            env.ACCESS_TOKEN_LIFE
        )
        const refreshToken = await JwtProvider.generateToken(
            { userId, jti },
            env.REFRESH_TOKEN_SECRET_SIGNATURE,
            env.REFRESH_TOKEN_LIFE
        )

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
        const refreshTokenInfo = {
            ...dataRefreshToken,
            token: hashedRefreshToken,
            jti
        }

        await refreshTokenRepository.insertRefreshToken(
            refreshTokenInfo,
            userId
        )

        return {
            ...userInfo,
            accessToken,
            refreshToken
        }
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
