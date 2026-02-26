import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { env } from '~/config/env/environment'
import { JwtProvider } from '~/shared/providers/token/JwtProvider'
import ApiError from '~/shared/utils/ApiError'
import { userRepository } from '../../repositories/user.repositories'
import bcrypt from 'bcryptjs'

export const refreshToken = async (refreshTokenFromCookie) => {
    try {
        // Bước 01: Thực hiện giải mã token xem nó có hợp lệ hay là không
        const refreshTokenDecoded = await JwtProvider.verifyToken(
            refreshTokenFromCookie,
            env.REFRESH_TOKEN_SECRET_SIGNATURE
        )
        // Bước 02: Kiểm tra xem token có tồn tại trong database hay không
        const user = await userRepository.findById(refreshTokenDecoded._id)
        if (!user || !user.refreshToken) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                'auth.refresh_token.invalid_token'
            )
        }
        // Bước 03: So sánh token trong cookie với token trong database xem có khớp hay không
        const isValid = await bcrypt.compare(
            refreshTokenFromCookie,
            user.refreshToken
        )

        if (!isValid)
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                'auth.refresh_token.invalid_token'
            )
        const userInfo = {
            _id: String(user._id),
            email: user.email,
            role: user.role
        }
        // Bước 04: Nếu hợp lệ thì tạo ra 1 cặp accessToken mới và refreshToken mới
        const refreshToken = await JwtProvider.generateToken(
            { _id: String(user._id) },
            env.REFRESH_TOKEN_SECRET_SIGNATURE,
            env.REFRESH_TOKEN_LIFE
        )
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)

        await userRepository.updateRefreshToken(
            String(user._id),
            hashedRefreshToken
        )
        // Buoc 02, Tao ra accessToken moi
        const accessToken = await JwtProvider.generateToken(
            userInfo,
            env.ACCESS_TOKEN_SECRET_SIGNATURE,
            env.ACCESS_TOKEN_LIFE
        )
        return {
            accessToken
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
