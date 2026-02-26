import ApiError from '~/shared/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'
import Joi from 'joi'
import { userRepository } from '../../repositories/user.repositories'
import { JwtProvider } from '~/shared/providers/token/JwtProvider'
import { env } from '~/config/env/environment'
import { LOGIN_SCHEMA } from '../../validators/user.login.schema'

export const login = async (reqData) => {
    try {
        const payload = await LOGIN_SCHEMA.validateAsync(reqData, {
            abortEarly: false
        })
        const account = await userRepository.findAccountForLogin(payload.email)
        const _id = String(account?._id)
        if (!account) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'auth.login.incorrect')
        }

        const isMatch = await bcrypt.compare(payload.password, account.password)

        if (!isMatch || !account.isActive) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'auth.login.incorrect')
        }

        const userInfo = {
            _id,
            email: account.email,
            role: account.role,
            fullName: account.fullName
        }
        const accessToken = await JwtProvider.generateToken(
            userInfo,
            env.ACCESS_TOKEN_SECRET_SIGNATURE,
            env.ACCESS_TOKEN_LIFE
        )
        const refreshToken = await JwtProvider.generateToken(
            { _id },
            env.REFRESH_TOKEN_SECRET_SIGNATURE,
            env.REFRESH_TOKEN_LIFE
        )
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)

        await userRepository.updateRefreshToken(_id, hashedRefreshToken)
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
