import ApiError from '~/shared/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'
import Joi from 'joi'
import { userRepository } from '../../repositories/user.repositories'
import { JwtProvider } from '~/shared/providers/token/JwtProvider'
import { env } from '~/config/env/environment'

export const login = async (reqData) => {
    try {
        const existEmail = await userRepository.findAccountByEmail(
            reqData.email
        )

        if (!existEmail) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'auth.login.inconrrect')
        }
        if (!existEmail.isActive) {
            throw new ApiError(StatusCodes.FORBIDDEN, 'auth.login.inactive')
        }
        if (existEmail._destroy === true) {
            throw new ApiError(StatusCodes.LOCKED, 'auth.login.blocked')
        }
        if (!bcrypt.compareSync(reqData.password, existEmail.password)) {
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'auth.login.inconrrect'
            )
        }
        const userInfo = {
            _id: existEmail._id,
            email: existEmail.email,
            role: existEmail.role,
            fullName: existEmail.fullName
        }
        const accessToken = await JwtProvider.generateToken(
            userInfo,
            env.ACCESS_TOKEN_SECRET_SIGNATURE,
            env.ACCESS_TOKEN_LIFE
        )
        const refreshToken = await JwtProvider.generateToken(
            userInfo,
            env.REFRESH_TOKEN_SECRET_SIGNATURE,
            env.REFRESH_TOKEN_LIFE
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
