import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { env } from '~/config/env/environment'
import { JwtProvider } from '~/shared/providers/token/JwtProvider'
import ApiError from '~/shared/utils/ApiError'

export const refreshToken = async (clientRefreshToken) => {
    try {
        // Bước 01: Thực hiện giải mã token xem nó có hợp lệ hay là không
        const refreshTokenDecoded = await JwtProvider.verifyToken(
            clientRefreshToken,
            env.REFRESH_TOKEN_SECRET_SIGNATURE
        )
        // Đoạn này vì chúng ta chỉ lưu những thông tin unique và cố định của user trong token rồi, vì vậy có thể lấy luôn từ decoded ra, tiết kiệm query vào DB để lấy data mới.

        const userInfo = {
            _id: refreshTokenDecoded._id,
            email: refreshTokenDecoded.email,
            role: refreshTokenDecoded.role
        }

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
